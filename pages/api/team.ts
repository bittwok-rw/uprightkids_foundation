import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/team";
interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "GET":
        return handleGetRequest(res);
      case "POST":
        return handlePostRequest(res, body);
      case "PUT":
        return handlePutRequest(res, query.id, body);
      case "DELETE":
        return handleDeleteRequest(res, query.id);
      default:
        return res.status(405).json({
          success: false,
          message: "Method Not Allowed",
        });
    }
  } catch (error: unknown) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function handleGetRequest(res: NextApiResponse<ApiResponse>) {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch team members");
  }

  const data = await response.json();
  return res.status(200).json({
    success: true,
    data: data.data || data,
  });
}

async function handlePostRequest(res: NextApiResponse<ApiResponse>, body: unknown) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create team member");
  }

  const newMember = await response.json();
  return res.status(201).json({
    success: true,
    data: newMember,
    message: "Team member created successfully",
  });
}

async function handlePutRequest(
  res: NextApiResponse<ApiResponse>,
  id: string | string[] | undefined,
  body: unknown
) {
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing team member ID",
    });
  }

  const memberId = Array.isArray(id) ? id[0] : id;
  const response = await fetch(`${API_BASE_URL}/${memberId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update team member");
  }

  const updatedMember = await response.json();
  return res.status(200).json({
    success: true,
    data: updatedMember,
    message: "Team member updated successfully",
  });
}

async function handleDeleteRequest(
  res: NextApiResponse<ApiResponse>,
  id: string | string[] | undefined
) {
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing team member ID",
    });
  }

  const memberId = Array.isArray(id) ? id[0] : id;
  const url = `${API_BASE_URL}/${memberId}`;

  try {
    const response = await fetch(url, { method: "DELETE" });

    // Log the raw response before parsing
    const text = await response.text();
    console.log("Delete Response:", text);

    if (!response.ok) {
      throw new Error(`Failed to delete team member: ${text}`);
    }

    return res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Delete Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}