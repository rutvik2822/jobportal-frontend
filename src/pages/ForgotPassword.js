import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../services/api";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        `/auth/forgot-password?email=${encodeURIComponent(email)}`
      );

      toast.success(response.data);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to send reset link"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10"
      >

        <h1 className="text-4xl font-bold text-center text-white mb-3">
          Forgot Password?
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Enter your registered email and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 mb-6 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:opacity-50 text-slate-900 font-bold py-4 rounded-xl transition duration-300 shadow-lg"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>

        </form>

        <p className="text-center mt-6 text-gray-300">

          Remember your password?

          <Link
            to="/login"
            className="text-cyan-400 ml-2 font-bold hover:text-cyan-300"
          >
            Login
          </Link>

        </p>

      </motion.div>

    </div>
  );
}

export default ForgotPassword;