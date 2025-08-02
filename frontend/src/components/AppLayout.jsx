import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Menu } from "lucide-react";

export default function AppLayout() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 transform bg-white border-r shadow-md w-64 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-auto`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top bar */}
        <div className="h-16 flex items-center justify-between px-4 md:px-6 border-b bg-white shadow-sm w-full">
          {/* Sidebar toggle for mobile */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Placeholder to keep space in between */}
          <div className="flex-1" />

          {/* Profile icon */}
          {user && (
            <Link to="/v2/profile/google">
              <img
                src={user.picture}
                alt="Profile"
                className="w-9 h-9 rounded-full border shadow-sm"
              />
            </Link>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
