import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaEllipsisV, FaTrash, FaEdit, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import dynamic from 'next/dynamic';

// Import the editor dynamically with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading Editor...</p>
});

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

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'color', 'background', 'link', 'image'
  ];

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

  // Handle rich text editor content change
  const handleEditorChange = (content: string) => {
    setForm(prev => ({ ...prev, description: content }));
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

  // Render HTML content safely
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-800 text-center relative">
          <span className="relative z-10">Media Posts Management</span>
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-2 bg-indigo-300 rounded-full"></span>
        </h1>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-indigo-700">
            {showForm ? "Add New Post" : "Media Posts"}
          </h2>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            className={`flex items-center gap-2 rounded-full px-6 shadow-md ${showForm ? "bg-indigo-700 hover:bg-indigo-800" : "bg-green-600 hover:bg-green-700"}`}
          >
            {showForm ? "Cancel" : <><FaPlus className="mr-1" /> Add New Post</>}
          </Button>
        </div>

        {/* Upload Form - Collapsible */}
        {showForm && (
          <Card className="mb-8 shadow-xl border-none overflow-hidden transition-all duration-300 ease-in-out">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter post title"
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="Auto-generated from title"
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 shadow-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div className="border border-indigo-200 rounded-lg shadow-sm">
                    <ReactQuill
                      value={form.description}
                      onChange={handleEditorChange}
                      modules={modules}
                      formats={formats}
                      placeholder="Enter post description"
                      className="h-64"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  {isLoading ? "Uploading..." : "Upload Media Post"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Table displaying media posts */}
        <Card className="shadow-xl border-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="p-4 text-left font-medium">Title</th>
                  <th className="p-4 text-left font-medium">Date</th>
                  <th className="p-4 text-left font-medium">Image</th>
                  <th className="p-4 text-left font-medium">Description</th>
                  <th className="p-4 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mediaPosts.length > 0 ? (
                  mediaPosts.map((post: any, index: number) => (
                    <tr key={post._id} className={`border-b hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="p-4 font-medium text-indigo-800">{post.title}</td>
                      <td className="p-4 text-gray-700">{formatDate(post.date)}</td>
                      <td className="p-4">
                        <div className="relative group">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-16 h-16 rounded-lg object-cover border border-indigo-200 shadow-sm cursor-pointer transform transition hover:scale-110" 
                          />
                          <div className="absolute hidden group-hover:block top-0 left-20 z-10">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-64 h-auto rounded-lg shadow-xl border-2 border-indigo-200" 
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div 
                            className={`prose prose-sm max-w-none overflow-hidden ${expandedRows[post._id] ? "" : "line-clamp-2 max-h-12"}`}
                            dangerouslySetInnerHTML={createMarkup(post.description)}
                          />
                          <button
                            onClick={() => toggleDescription(post._id)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800 flex-shrink-0"
                          >
                            {expandedRows[post._id] ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                          </button>
                        </div>
                      </td>
                      <td className="p-4 relative text-center">
                        <button
                          onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                          className="p-2 rounded-full hover:bg-indigo-100 transition-colors"
                        >
                          <FaEllipsisV className="text-indigo-700" />
                        </button>

                        {/* Dropdown menu */}
                        {dropdownIndex === index && (
                          <div className="absolute right-4 top-12 bg-white shadow-xl rounded-lg p-2 space-y-1 z-10 border border-gray-200 min-w-40">
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-lg mb-4 font-medium">No media posts found.</p>
                        <Button 
                          onClick={() => setShowForm(true)} 
                          className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 rounded-full px-6 shadow-md"
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
        </Card>
      </div>
    </div>
  );
};

export default UploadBlog;