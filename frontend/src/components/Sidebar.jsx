// import { NavLink } from "react-router-dom";
// import { Home, Album, Star, Users } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r shadow-sm z-50">
//       <div className="h-16 flex items-center justify-center border-b">
//         <h1 className="text-xl font-semibold text-gray-700">Pixora</h1>
//       </div>

//       <nav className="mt-6 px-4">
//         <ul className="space-y-2">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Home size={18} />
//               <span>All Photos</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/albums"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Album size={18} />
//               <span>Albums</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/favorites"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Star size={18} />
//               <span>Favorites</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/shared"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Users size={18} />
//               <span>Shared with Me</span>
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// import { NavLink } from "react-router-dom";
// import { Home, Album, Star, Users } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 h-screen fixed top-0 left-0 bg-white border-r shadow-sm flex flex-col">
//       {/* Logo */}
//       <div className="h-16 border-b flex items-center px-6">
//         <h1 className="text-2xl font-semibold text-gray-700">Pixora</h1>
//       </div>

//       {/* Navigation */}
//       <nav className="mt-6 px-4 flex-1">
//         <ul className="space-y-2">
//           <li>
//             <NavLink
//               to="/photos"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Home size={18} />
//               <span>All Photos</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/albums"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Album size={18} />
//               <span>Albums</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/favorites"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Star size={18} />
//               <span>Favorites</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/shared"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Users size={18} />
//               <span>Shared with Me</span>
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }


import { NavLink } from "react-router-dom";
import { Home, Album, Star, Users, X } from "lucide-react";

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r shadow-sm">
      {/* Header with logo */}
      <div className="h-16 px-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold text-gray-700">Pixora</h1>
        {/* Close icon on mobile */}
        <button className="md:hidden" onClick={onClose}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/photos"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Home size={18} />
              <span>All Photos</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/albums"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Album size={18} />
              <span>Albums</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Star size={18} />
              <span>Favorites</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/shared"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Users size={18} />
              <span>Shared with Me</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
