import { useContext, useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import ParticleBackground from "../components/ParticleBackground";
import Lottie from "lottie-react";
import animationData from "../assets/login-animation.json";
import { Link } from "react-router-dom";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const token = res.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      toast.success("Login Successful ");

      setTimeout(() => {
        if (decoded.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }, 1000);

    } catch (err) {

      console.log(err);

      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-slate-900 dark:to-black flex items-center justify-center px-4">

  {/* Lottie Animation */}
  <div className="hidden lg:block w-[450px] mr-16">
    <Lottie animationData={animationData} loop={true} />
  </div>
      <ParticleBackground />

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 text-white text-2xl z-10"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-center text-white mb-3"
        >
          AI Job Portal
          </motion.h1>

        <p className="text-center text-gray-300 mb-8">
          Smart Recruitment Platform
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 mb-5 outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 mb-6 outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold py-4 rounded-xl transition duration-300 shadow-lg"
        >
          Login
        </motion.button>
        <p className="text-center mt-6 text-gray-300">

            Don't have an account?

            <Link
              to="/register"
              className="text-cyan-400 ml-2 font-bold"
            >
              Register
            </Link>

          </p>

      </motion.div>
    </div>
  );
}

export default Login;