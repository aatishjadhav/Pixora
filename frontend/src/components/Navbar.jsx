import { Link } from "react-router-dom";

const Navbar = () => (
  <header className="bg-white shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-semibold text-blue-600 hover:text-blue-700"
      >
        KaviosPix
      </Link>

      <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
        <Link
          to="/albums"
          className="hover:text-blue-600 transition duration-200"
        >
          Albums
        </Link>
        <Link
          to="/v2/profile/google"
          className="hover:text-blue-600 transition duration-200"
        >
          Profile
        </Link>
      </div>
    </nav>
  </header>
);

export default Navbar;
