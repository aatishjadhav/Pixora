import { Link, NavLink } from "react-router-dom";
import { Home, Album, Star, Users, X } from "lucide-react";
import plogo from "../../public/letter-p.png";

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r shadow-sm">
      {/* Header with logo */}
      <div className="h-16 px-7 flex items-center justify-between border-b">
        <div className="flex justify-center items-center gap-3">
          <Link to="/photos" className="flex justify-center items-center gap-3">
            <img src={plogo} alt="" className="h-8" />
            <h1 className="text-2xl font-bold text-gray-700">Pixora</h1>
          </Link>
        </div>
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
