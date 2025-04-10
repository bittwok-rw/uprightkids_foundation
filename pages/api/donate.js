import clientPromise from "@/lib/mongodb"; // adjust path if needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const donationData = req.body;

      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("donations");

      // Save donation to the "donations" collection
      const result = await collection.insertOne(donationData);

      console.log("Donation saved:", result.insertedId);

      res.status(200).json({
        success: true,
        message: "Donation saved successfully",
        donationId: result.insertedId,
      });
    } catch (error) {
      console.error("Donation save error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
