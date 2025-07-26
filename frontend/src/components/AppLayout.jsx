// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// export default function AppLayout() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="ml-64 w-full p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// import { Outlet, NavLink } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// export default function AppLayout() {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       {/* <aside className="w-60 bg-white border-r p-4 shadow-md">
//         <h2 className="text-xl font-bold mb-6">Pixora</h2>
//         <nav className="space-y-3">
//           <NavLink
//             to="/photos"
//             className={({ isActive }) =>
//               isActive ? "font-medium text-blue-600" : "text-gray-600"
//             }
//           >
//             All Photos
//           </NavLink>
//           <NavLink
//             to="/albums"
//             className={({ isActive }) =>
//               isActive ? "font-medium text-blue-600" : "text-gray-600"
//             }
//           >
//             Albums
//           </NavLink>
//           <NavLink
//             to="/favorites"
//             className={({ isActive }) =>
//               isActive ? "font-medium text-blue-600" : "text-gray-600"
//             }
//           >
//             Favorites
//           </NavLink>
//           <NavLink
//             to="/upload-photo"
//             className={({ isActive }) =>
//               isActive ? "font-medium text-blue-600" : "text-gray-600"
//             }
//           >
//             Upload to All
//           </NavLink>
//         </nav>
//       </aside> */}
//           <Sidebar/>

//       {/* Main Content */}
//           <div className="ml-64 flex-1 flex flex-col overflow-y-auto">
//         <Navbar />
//         <main className="p-6 overflow-y-auto h-full">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// import { Link, Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// export default function AppLayout() {
//   const { user } = useContext(AuthContext);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar on the left */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="ml-64 flex-1 flex flex-col relative overflow-y-auto">
//         {/* Top bar with profile icon and bottom border */}
//         <div className="h-16 flex items-center justify-end px-6 border-b">
//           {user && (
//             <Link to="/v2/profile/google">
//               <img
//                 src={user.picture}
//                 alt="Profile"
//                 className="w-9 h-9 rounded-full border shadow"
//               />
//             </Link>
//           )}
//         </div>

//         {/* Main content below the top bar */}
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
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
            <img
              src={user.picture}
              alt="Profile"
              className="w-9 h-9 rounded-full border shadow-sm"
            />
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

