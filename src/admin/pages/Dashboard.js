import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {

  const { darkMode } = useContext(ThemeContext);

  // Temporary data
  const total = 0;
  const accepted = 0;
  const rejected = 0;
  const pending = 0;

  const pieData = [
    { name: "Accepted", value: accepted },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#facc15"
  ];

  const barData = [];

  return (
    <>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <motion.div whileHover={{ scale: 1.03 }}
          className="bg-cyan-500 text-black rounded-3xl p-6 shadow-xl">

          <FaUsers className="text-4xl mb-4" />

          <h2 className="text-4xl font-bold">
            {total}
          </h2>

          <p>Total Applications</p>

        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }}
          className="bg-green-500 text-white rounded-3xl p-6 shadow-xl">

          <FaCheckCircle className="text-4xl mb-4" />

          <h2 className="text-4xl font-bold">
            {accepted}
          </h2>

          <p>Accepted</p>

        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }}
          className="bg-red-500 text-white rounded-3xl p-6 shadow-xl">

          <FaTimesCircle className="text-4xl mb-4" />

          <h2 className="text-4xl font-bold">
            {rejected}
          </h2>

          <p>Rejected</p>

        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }}
          className="bg-yellow-400 text-black rounded-3xl p-6 shadow-xl">

          <FaClock className="text-4xl mb-4" />

          <h2 className="text-4xl font-bold">
            {pending}
          </h2>

          <p>Pending</p>

        </motion.div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div
          className={`
            rounded-3xl
            p-7
            shadow-xl
            border
            ${darkMode
              ? "bg-white/10 border-white/10"
              : "bg-white border-gray-200"}
          `}
        >

          <h2 className="text-2xl font-bold mb-6">
            Application Status
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div
          className={`
            rounded-3xl
            p-7
            shadow-xl
            border
            ${darkMode
              ? "bg-white/10 border-white/10"
              : "bg-white border-gray-200"}
          `}
        >

          <h2 className="text-2xl font-bold mb-6">
            Applications Per Job
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer>

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="job"/>

                <YAxis/>

                <Tooltip/>

                <Legend/>

                <Bar
                  dataKey="applications"
                  fill="#06b6d4"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;