import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaEllipsisV, FaTrash, FaEdit, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";

const UploadBlog = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: "",
    image: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [mediaPosts, setMediaPosts] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [expandedRows, setExpandedRows] = useState<{[key: string]: boolean}>({});

  // Fetch media posts from the database
  useEffect(() => {
    fetchMediaPosts();
  }, []);

  const fetchMediaPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/media");
      setMediaPosts(response.data);
    } catch (error) {
      console.error("Error fetching media posts:", error);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/media", form);
      alert("Media post uploaded successfully!");
      setForm({ title: "", slug: "", date: "", image: "", description: "" });
      fetchMediaPosts();
      setShowForm(false); // Hide form after successful submission
    } catch (error) {
      console.error("Error uploading media post:", error);
      alert("Error uploading media post. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete post
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/media/${id}`);
      alert("Post deleted successfully!");
      fetchMediaPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  // Toggle description expansion
  const toggleDescription = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800 text-center">Media Posts Management</h1>
        
        <div className="flex justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-indigo-700">
            {showForm ? "Add New Post" : "Media Posts"}
          </h2>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            className={`flex items-center gap-2 ${showForm ? "bg-indigo-700" : "bg-green-600"}`}
          >
            {showForm ? "Cancel" : <><FaPlus /> Add New Post</>}
          </Button>
        </div>

        {/* Upload Form - Collapsible */}
        {showForm && (
          <div className="bg-white shadow-lg rounded-lg mb-8 transition-all duration-300 ease-in-out">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter post title"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="Auto-generated from title"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter post description"
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isLoading ? "Uploading..." : "Upload Media Post"}
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Table displaying media posts */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mediaPosts.length > 0 ? (
                  mediaPosts.map((post: any, index: number) => (
                    <>
                      <tr key={post._id} className={`border-b hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="p-3 font-medium">{post.title}</td>
                        <td className="p-3">{formatDate(post.date)}</td>
                        <td className="p-3">
                          <div className="relative group">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-12 h-12 rounded object-cover border border-gray-300 cursor-pointer transform transition hover:scale-105" 
                            />
                            <div className="absolute hidden group-hover:block top-0 left-16 z-10">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-48 h-auto rounded-lg shadow-lg border-2 border-indigo-200" 
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className={`overflow-hidden ${expandedRows[post._id] ? "" : "line-clamp-2 max-h-12"}`}>
                              {post.description}
                            </div>
                            <button
                              onClick={() => toggleDescription(post._id)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800"
                            >
                              {expandedRows[post._id] ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                          </div>
                        </td>
                        <td className="p-3 relative text-center">
                          <button
                            onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                            className="p-2 rounded-full hover:bg-indigo-100 transition-colors"
                          >
                            <FaEllipsisV className="text-indigo-700" />
                          </button>

                          {/* Dropdown menu */}
                          {dropdownIndex === index && (
                            <div className="absolute right-4 top-10 bg-white shadow-xl rounded-lg p-2 space-y-1 z-10 border border-gray-200 min-w-32">
                              <button
                                className="flex items-center gap-2 p-2 text-indigo-600 hover:bg-indigo-50 w-full rounded-md transition-colors"
                                onClick={() => alert("Edit feature coming soon!")}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                className="flex items-center gap-2 p-2 text-red-600 hover:bg-red-50 w-full rounded-md transition-colors"
                                onClick={() => handleDelete(post._id)}
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center py-6">
                        <p className="text-lg mb-3">No media posts found.</p>
                        <Button 
                          onClick={() => setShowForm(true)} 
                          className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                        >
                          <FaPlus /> Add Your First Post
                        </Button>
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
  );
};

export default UploadBlog;