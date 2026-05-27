import { useState, useContext } from "react";

import { motion } from "framer-motion";

import { ThemeContext } from "../context/ThemeContext";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const { darkMode } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER"

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });
  };

  // EMAIL VALIDATION

  const isValidEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // PASSWORD STRENGTH

  const getPasswordStrength = () => {

    const password = formData.password;

    if (password.length < 6) {
      return "Weak";
    }

    if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    // EMAIL VALIDATION

    if (!isValidEmail(formData.email)) {

      toast.error("Invalid email format");

      return;
    }

    // PASSWORD MATCH

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      toast.error("Passwords do not match");

      return;
    }

    try {

      setLoading(true);

      await API.post(
        "/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      );

      toast.success("Registration successful!");

      navigate("/");

    } catch (err) {

      console.log(err);

      toast.error("Registration failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className={`
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        transition-all
        duration-500

        ${
          darkMode
            ? "bg-gradient-to-br from-black via-gray-900 to-blue-950"
            : "bg-gradient-to-br from-cyan-100 via-white to-blue-200"
        }
      `}
    >

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.6 }}

        className={`
          w-full
          max-w-md
          rounded-3xl
          p-10
          backdrop-blur-lg
          shadow-2xl
          border

          ${
            darkMode
              ? "bg-white/10 border-white/20 text-white"
              : "bg-white/70 border-gray-200 text-black"
          }
        `}
      >

        <h1 className="text-4xl font-bold text-center mb-3">
          Create Account
        </h1>

        <p className="text-center opacity-70 mb-8">
          Join AI Job Portal
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/20
              border
              border-white/10
              outline-none
            "
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/20
              border
              border-white/10
              outline-none
            "
          />

          {/* PASSWORD */}

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full
                p-4
                rounded-2xl
                bg-white/20
                border
                border-white/10
                outline-none
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                right-4
                top-5
              "
            >

              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>

          {/* PASSWORD STRENGTH */}

          <p
            className={`
              text-sm
              font-semibold

              ${
                getPasswordStrength() === "Weak"
                  ? "text-red-400"
                  : getPasswordStrength() === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }
            `}
          >

            Password Strength:
            {" "}
            {getPasswordStrength()}

          </p>

          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="
                w-full
                p-4
                rounded-2xl
                bg-white/20
                border
                border-white/10
                outline-none
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="
                absolute
                right-4
                top-5
              "
            >

              {
                showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>

          {/* ROLE */}

          <div>

            <p className="mb-3 font-semibold">
              Select Role
            </p>

            <div className="flex gap-4">

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "USER"
                  })
                }
                className={`
                  flex-1
                  py-4
                  rounded-2xl
                  font-bold
                  transition

                  ${
                    formData.role === "USER"
                      ? "bg-cyan-500 text-black"
                      : "bg-white/10"
                  }
                `}
              >
                👤 USER
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "ADMIN"
                  })
                }
                className={`
                  flex-1
                  py-4
                  rounded-2xl
                  font-bold
                  transition

                  ${
                    formData.role === "ADMIN"
                      ? "bg-purple-500 text-white"
                      : "bg-white/10"
                  }
                `}
              >
                🛠 ADMIN
              </button>

            </div>

          </div>

          {/* SUBMIT */}

          <motion.button

            whileTap={{ scale: 0.95 }}

            type="submit"

            disabled={loading}

            className="
              w-full
              bg-cyan-400
              hover:bg-cyan-300
              text-black
              font-bold
              py-4
              rounded-2xl
              transition
            "
          >

            {
              loading
                ? "Creating Account..."
                : "Register"
            }

          </motion.button>

        </form>

        {/* LOGIN LINK */}

        <p className="text-center mt-6 opacity-80">

          Already have an account?

          <Link
            to="/"
            className="text-cyan-400 ml-2 font-bold"
          >
            Login
          </Link>

        </p>

      </motion.div>

    </div>
  );
}

export default Register;