import { useState } from "react";
import withAuth from "@/utils/withAuth"; // Protects Dashboard
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaProjectDiagram, FaUsers, FaImages, FaSignOutAlt } from "react-icons/fa";
import MediaManagement from "./media";
import ProjectManagement from "./projects";
import TeamManagement from "./team";
import SubscribersList from "./subscruber";



const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("projects");

  return (
    <div className="min-h-screen bg-blue-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4 space-y-4 transition-all duration-300">
        <h2 className="text-2xl font-bold text-center tracking-wide">Dashboard</h2>
        <nav className="space-y-2">
          {[
            { id: "media", label: "Media Management", icon: <FaImages /> },
            { id: "projects", label: "Project Management", icon: <FaProjectDiagram /> },
            { id: "team", label: "Team Management", icon: <FaUsers /> },
            { id: "subscruber", label: "All subscrubers", icon: <FaUsers /> },
          ].map(({ id, label, icon }) => (
            <Button
              key={id}
              variant="ghost"
              className={`w-full flex items-center gap-2 p-2 text-left ${
                activeSection === id ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveSection(id)}
            >
              {icon} {label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <Button
              variant="ghost"
              className="text-red-600 hover:text-red-800 flex items-center gap-2"
              onClick={() => {
                document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                localStorage.removeItem("authToken");
                window.location.href = "/login"; // Redirect to login after logout
              }}
            >
              <FaSignOutAlt /> Logout
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <Card>
            <CardContent className="p-6 bg-white shadow rounded-lg">
              {activeSection === "media" && <MediaManagement />}
              {activeSection === "projects" && <ProjectManagement />}
              {activeSection === "team" && <TeamManagement />}
              {activeSection === "subscruber" && <SubscribersList />}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

// Protect Dashboard with Authentication
export default withAuth(Dashboard);
