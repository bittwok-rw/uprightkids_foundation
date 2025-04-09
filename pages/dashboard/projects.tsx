"use client"

import type React from "react"

import { useState, useEffect } from "react"
// Remove the unused useRouter import
import { FaEllipsisV, FaTrash, FaEdit, FaPlus } from "react-icons/fa"
import dynamic from "next/dynamic"
import Image from "next/image"

// Import React Quill dynamically (without SSR) since it requires browser environment
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css" // Import Quill styles

// Define the Project type
interface Project {
  _id: string
  title: string
  description: string
  imageUrl: string
  slug: string
}

export default function AddProjectPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  // Remove unused router

  // Add these state variables after the existing state declarations
  const [isEditing, setIsEditing] = useState(false)
  const [editingSlug, setEditingSlug] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  // Add this function to handle editing a project
  const handleEdit = async (project: Project) => {
    // Set form values
    setTitle(project.title)
    setDescription(project.description)
    setImageUrl(project.imageUrl)
    setSlug(project.slug)
    setEditingSlug(project.slug)
    setIsEditing(true)
    setIsFormVisible(true)
    setDropdownIndex(null) // Close the dropdown
  }

  // Modify the handleSubmit function to handle both adding and editing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isEditing) {
        // For updating, your API handler expects:
        // - A PUT request
        // - The slug in the request body
        // - The updated title, description, and imageUrl

        // Looking at your API handler, it's using formidable to parse form data
        // Let's try a direct JSON approach since that's what the backend expects

        const payload = {
          slug: editingSlug, // The original slug to identify the project
          title: title,
          description: description,
          imageUrl: imageUrl,
        }

        console.log("Updating project with payload:", payload)

        const response = await fetch(`/api/projects`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          let errorMessage
          try {
            const errorData = await response.json()
            errorMessage = errorData.message || "Failed to update project."
          } catch {
            errorMessage = `Server error: ${response.status} ${response.statusText || "Unknown error"}`
          }
          throw new Error(errorMessage)
        }

        // Show success toast
        const successToast = document.getElementById("success-toast")
        if (successToast) {
          successToast.textContent = "Project updated successfully!"
          successToast.classList.remove("hidden")
          setTimeout(() => successToast.classList.add("hidden"), 3000)
        }

        // Reset editing state
        setIsEditing(false)
        setEditingSlug("")
      } else {
        // Add new project (existing code)
        const payload = { title, description, imageUrl, slug }
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          let errorMessage
          try {
            const errorData = await response.json()
            errorMessage = errorData.message || "Failed to add project."
          } catch {
            errorMessage = `Server error: ${response.status} ${response.statusText || "Unknown error"}`
          }
          throw new Error(errorMessage)
        }

        // Show success toast
        const successToast = document.getElementById("success-toast")
        if (successToast) {
          successToast.textContent = "Project added successfully!"
          successToast.classList.remove("hidden")
          setTimeout(() => successToast.classList.add("hidden"), 3000)
        }
      }

      // Refresh projects list and reset form
      fetchProjects()
      setTitle("")
      setDescription("")
      setImageUrl("")
      setSlug("")
      setIsFormVisible(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`https://backenduprightkid.vercel.app/api/projects/${slug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Project deleted successfully:", data)

        // Show success toast notification
        const deleteToast = document.getElementById("delete-toast")
        if (deleteToast) {
          deleteToast.classList.remove("hidden")
          setTimeout(() => deleteToast.classList.add("hidden"), 3000)
        }

        // Re-fetch projects after deletion
        await fetchProjects()
      } else {
        const errorData = await response.json()
        console.error("Failed to delete the project:", errorData.message)
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  // Rich text editor modules config
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  }

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ]

  const truncateText = (text: string | undefined, maxLength = 100) => {
    // Strip HTML tags for display in the table
    const strippedText = text ? text.replace(/<[^>]*>?/gm, "") : ""
    return strippedText.length > maxLength ? strippedText.substring(0, maxLength) + "..." : strippedText
  }

  // Type-safe image error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget
    img.onerror = null
    img.src = "https://via.placeholder.com/150?text=No+Image"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toast Notifications */}
      <div id="success-toast" className="hidden fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
        Project added successfully!
      </div>
      <div id="delete-toast" className="hidden fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50">
        Project deleted successfully!
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
          <button
            onClick={() => {
              setIsFormVisible(!isFormVisible)
              if (isFormVisible) {
                setIsEditing(false)
                setEditingSlug("")
                setTitle("")
                setDescription("")
                setImageUrl("")
                setSlug("")
              }
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            {isFormVisible ? (
              "Cancel"
            ) : (
              <>
                Add New Project <FaPlus className="ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Form Section - Collapsible */}
        {isFormVisible && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300">
            {/* Update the form title to reflect current mode */}
            <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
              {isEditing ? `Edit Project: ${title}` : "Add a New Project"}
            </h2>
            {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 border border-red-200">{error}</div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border-gray-300 border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Project Slug</label>
                {/* Disable the slug field when editing */}
                <input
                  type="text"
                  placeholder="unique-slug-name"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  disabled={isEditing}
                  className="w-full border-gray-300 border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border-gray-300 border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Project Description</label>
                {typeof window !== "undefined" && (
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Describe your project"
                    className="bg-white rounded-md"
                    style={{ height: "200px", marginBottom: "50px" }}
                  />
                )}
              </div>

              <div className="md:col-span-2 mt-16">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center"
                  disabled={loading}
                >
                  {/* Update the submit button text */}
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isEditing ? (
                    "Update Project"
                  ) : (
                    "Add Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Project List Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Project List</h2>
            <p className="text-gray-500 mt-1">Manage your projects using the actions menu</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Slug</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                  <th className="py-3 px-4 font-semibold">Image</th>
                  <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-800">{project.title}</td>
                      <td className="py-4 px-4 text-gray-600">{project.slug}</td>
                      <td className="py-4 px-4 text-gray-600 max-w-xs">{truncateText(project.description)}</td>
                      <td className="py-4 px-4">
                        {project.imageUrl ? (
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 border">
                            <Image
                              src="https://i.postimg.cc/Dyzh3pFX/MG-6720.png"
                              alt="My Image"
                              width={500}
                              height={300}
                              onError={handleImageError}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-100 text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 relative">
                        <button
                          onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
                        >
                          <FaEllipsisV />
                        </button>
                        {dropdownIndex === index && (
                          <div className="absolute right-4 top-12 bg-white shadow-xl rounded-md py-1 w-40 z-10 border">
                            {/* Update the Edit button in the dropdown menu */}
                            <button
                              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 w-full text-left"
                              onClick={() => handleEdit(project)}
                            >
                              <FaEdit size={14} /> Edit Project
                            </button>
                            <button
                              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                              onClick={() => handleDelete(project.slug)}
                            >
                              <FaTrash size={14} /> Delete Project
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          ></path>
                        </svg>
                        <p className="text-lg font-medium mb-1">No projects found</p>
                        <p className="text-sm text-gray-500">
                          Click the &quot;Add New Project&quot; button to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
