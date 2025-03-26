"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaUserPlus, FaUser, FaTimes } from "react-icons/fa";
import axios from "axios";

// Define TeamMember interface
interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  description: string;
}


export default function AddTeamMemberPage() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Show toast message
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({message, type});
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      if (!response.ok) throw new Error("Failed to fetch team members");
      const data = await response.json();
      setTeamMembers(data.data || data); // Handle both response formats
    } catch (error) {
      console.error("Error fetching team members:", error);
      showToast("Failed to load team members", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = { name, position, image, description };
      const url = selectedMember ? `/api/team?id=${selectedMember}` : "/api/team";
      
      const response = await fetch(url, {
        method: selectedMember ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedMember ? { ...payload, id: selectedMember } : payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save team member.");
      }

      showToast(
        selectedMember 
          ? "Team member updated successfully!" 
          : "Team member added successfully!",
        "success"
      );
      
      fetchTeamMembers();
      resetForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPosition("");
    setImage("");
    setDescription("");
    setSelectedMember(null);
    setIsFormVisible(false);
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member._id);
    setName(member.name);
    setPosition(member.position);
    setImage(member.image);
    setDescription(member.description);
    setActionMenu(null);
    setIsFormVisible(true);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete team
  const handleDelete = async (id: string) => {
    if (!id) {
      alert("Invalid member ID.");
      return;
    }
  
    if (!confirm("Are you sure you want to delete this member?")) return;
  
    try {
      console.log("Attempting to delete member with ID:", id); // Debugging
  
      const response = await axios.delete(`http://localhost:5000/api/team/${id}`, {
        headers: { "Content-Type": "application/json" }, // Ensure proper headers
      });
  
      console.log("Delete response:", response.data); // Debugging
  
      alert("Member deleted successfully!");
      fetchTeamMembers(); // Refresh list after deletion
    } catch (error: any) {
      console.error("Error deleting member:", error.response?.data || error.message);
      
      alert(`Failed to delete member: ${error.response?.data?.message || "Unknown error"}`);
    }
  };
  

  const truncateText = (text: string, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = "https://via.placeholder.com/150?text=No+Image";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toast Notification */}
      {toast && (
        <div 
          className={`fixed top-4 right-4 text-white p-4 rounded shadow-lg z-50 transition-opacity duration-300 ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Team Management</h1>
          <button 
            onClick={() => {
              if (selectedMember) {
                resetForm();
              } else {
                setIsFormVisible(!isFormVisible);
              }
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            {isFormVisible ? (
              <>Cancel <FaTimes className="ml-1" /></>
            ) : (
              <>Add Team Member <FaUserPlus className="ml-1" /></>
            )}
          </button>
        </div>
        
        {/* Form Section - Collapsible */}
        {isFormVisible && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
              {selectedMember ? "Edit Team Member" : "Add a New Team Member"}
            </h2>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded mb-4 border border-red-200">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter team member's name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-gray-300 border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Position *</label>
                <input
                  type="text"
                  placeholder="Enter job position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  className="w-full border-gray-300 border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Profile Image URL *</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  className="w-full border-gray-300 border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
              
              {image && (
                <div className="space-y-2 flex flex-col justify-end">
                  <label className="block text-sm font-medium text-gray-700">Image Preview</label>
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border">
                    <img 
                      src={image} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={handleImageError}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Bio/Description *</label>
                <textarea
                  placeholder="Brief description about team member"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full border-gray-300 border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
              
              <div className="md:col-span-2 mt-2 flex gap-3">
                <button 
                  type="submit" 
                  className="flex-1 md:flex-none md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    selectedMember ? "Update Team Member" : "Add Team Member"
                  )}
                </button>
                
                {selectedMember && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="flex-1 md:flex-none md:w-auto bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition duration-200"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
        
        {/* Team Members List Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
            <p className="text-gray-500 mt-1">Manage your team members and their information</p>
          </div>
          
          {teamMembers.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <div className="flex flex-col items-center">
                <FaUser className="text-gray-300 text-5xl mb-4" />
                <p className="text-lg font-medium mb-1">No team members found</p>
                <p className="text-sm text-gray-500">
                  Click the "Add Team Member" button to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
                    <th className="py-3 px-4 font-semibold">Image</th>
                    <th className="py-3 px-4 font-semibold">Name</th>
                    <th className="py-3 px-4 font-semibold">Position</th>
                    <th className="py-3 px-4 font-semibold">Description</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border mx-auto">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover" 
                            onError={handleImageError}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-800">{member.name}</td>
                      <td className="py-4 px-4 text-gray-600">{member.position}</td>
                      <td className="py-4 px-4 text-gray-600 max-w-xs">
                        {truncateText(member.description)}
                      </td>
                      <td className="py-4 px-4 relative">
                        <button
                          onClick={() => setActionMenu(actionMenu === member._id ? null : member._id)}
                          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
                        >
                          <HiOutlineDotsVertical className="text-xl" />
                        </button>
                        {actionMenu === member._id && (
                          <div className="absolute right-4 top-12 bg-white shadow-xl rounded-md py-1 w-40 z-10 border">
                            <button 
                              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 w-full text-left"
                              onClick={() => handleEdit(member)}
                            >
                              Edit Member
                            </button>
                            <button
                              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                              onClick={() => handleDelete(member._id)}
                            >
                              Delete Member
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}