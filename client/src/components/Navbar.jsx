import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <ul className="flex space-x-6 justify-center text-white">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Video Downloader
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/image-converter"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Image Converter
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/video-compressor"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Video Compressor
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
