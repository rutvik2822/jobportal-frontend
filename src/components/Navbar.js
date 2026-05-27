import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { FaMoon, FaSun } from "react-icons/fa";

import { motion } from "framer-motion";

import { jwtDecode } from "jwt-decode";

function Navbar() {

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const token = localStorage.getItem("token");

  let role = "";

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (

    <motion.nav

      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}

     className={`
  flex
  justify-between
  items-center
  px-8
  py-4
  backdrop-blur-lg
  border-b
  sticky
  top-0
  z-50
  transition-all
  duration-500

  ${
    darkMode
      ? "bg-white/10 border-white/10 text-white"
      : "bg-white shadow-md text-black"
  }
`}
    >

      {/* LEFT */}
      <div>

        <h1 className="text-2xl font-bold tracking-wide">
          AI Job Portal
        </h1>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* ROLE */}
        <span className="
          bg-cyan-400
          text-black
          px-4
          py-1
          rounded-full
          font-semibold
          text-sm
        ">
          {role}
        </span>

        {/* DARK MODE */}
        <button
  onClick={() => setDarkMode(!darkMode)}
  className="
    text-2xl
    text-yellow-300
    hover:scale-110
    transition
  "
>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            px-4
            py-2
            rounded-lg
            font-semibold
            transition
          "
        >
          Logout
        </button>

      </div>

    </motion.nav>
  );
}

export default Navbar;