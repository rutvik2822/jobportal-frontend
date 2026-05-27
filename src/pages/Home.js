import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import Lottie from "lottie-react";

import animationData from "../assets/landing-animation.json";

import ParticleBackground from "../components/ParticleBackground";

function Home() {

  return (

    <div className="
      relative
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-black
      text-white
    ">

      {/* PARTICLES */}
      <ParticleBackground />

      {/* NAVBAR */}

      <nav className="
        flex
        justify-between
        items-center
        px-10
        py-6
        relative
        z-10
      ">

        <h1 className="
          text-3xl
          font-bold
          text-cyan-400
        ">
          AI Recruiter
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="
              px-5
              py-3
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              transition
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              px-5
              py-3
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-600
              text-black
              font-bold
              transition
            "
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* HERO SECTION */}

      <div className="
        max-w-7xl
        mx-auto
        px-10
        pt-16
        grid
        lg:grid-cols-2
        gap-16
        items-center
        relative
        z-10
      ">

        {/* LEFT */}

        <motion.div

          initial={{ opacity: 0, x: -60 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 1 }}
        >

          <h1 className="
            text-6xl
            font-extrabold
            leading-tight
            mb-8
          ">

            AI-Powered

            <span className="text-cyan-400">
              {" "}Recruitment{" "}
            </span>

            Platform
          </h1>

          <p className="
            text-xl
            text-gray-300
            leading-relaxed
            mb-10
          ">

            Smart ATS platform that helps
            recruiters screen resumes,
            analyze candidates, and hire
            faster using Artificial Intelligence.

          </p>

          <div className="flex gap-5">

            <Link
              to="/register"
              className="
                bg-cyan-500
                hover:bg-cyan-600
                text-black
                font-bold
                px-8
                py-4
                rounded-2xl
                transition
                shadow-xl
              "
            >
              Start Hiring
            </Link>

            <Link
              to="/login"
              className="
                border
                border-cyan-400
                text-cyan-400
                hover:bg-cyan-400
                hover:text-black
                px-8
                py-4
                rounded-2xl
                transition
              "
            >
              Login
            </Link>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div

          initial={{ opacity: 0, x: 60 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 1 }}
        >

          <Lottie
            animationData={animationData}
            loop={true}
          />

        </motion.div>

      </div>

      {/* FEATURES */}

      <div className="
        max-w-7xl
        mx-auto
        px-10
        py-24
        relative
        z-10
      ">

        <h2 className="
          text-5xl
          font-bold
          text-center
          mb-20
        ">
          Powerful Features
        </h2>

        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
        ">

          {[
            {
              title: "AI Resume Matching",
              desc: "Automatically analyze resumes and calculate candidate match scores."
            },

            {
              title: "Modern ATS Dashboard",
              desc: "Manage jobs, applications, analytics and hiring workflows."
            },

            {
              title: "Smart Analytics",
              desc: "Visual charts and insights for recruitment performance."
            },

            {
              title: "Secure Authentication",
              desc: "JWT authentication with protected admin and user routes."
            }

          ].map((feature, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 40 }}

              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: index * 0.2
              }}

              className="
                bg-white/10
                border
                border-white/10
                backdrop-blur-lg
                rounded-3xl
                p-8
                hover:scale-105
                transition
              "
            >

              <h3 className="
                text-2xl
                font-bold
                text-cyan-400
                mb-5
              ">
                {feature.title}
              </h3>

              <p className="text-gray-300">
                {feature.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;