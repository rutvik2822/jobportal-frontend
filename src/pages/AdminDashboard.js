import {
  useEffect,
  useState,
  useContext,
  useRef
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";

import AddJobModal from "../components/AddJobModal";

import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from "react-icons/fa";

import EditJobModal from "../components/EditJobModal";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function AdminDashboard() {

  const [applications, setApplications] = useState([]);
  
  const [jobs, setJobs] = useState([]);

  const [activeTab, setActiveTab] = useState("applications");

  const [selectedResume, setSelectedResume] = useState(null);

  const [search, setSearch] = useState("");

  const { darkMode } = useContext(ThemeContext);

  const [showModal, setShowModal] = useState(false);

  const [editJob, setEditJob] = useState(null);

  const [selectedStatus, setSelectedStatus] =
  useState("ALL");

  const applicationsRef = useRef(null);

  const updateStatus = async (id, status) => {

    try {

      await API.put(
        `/admin/applications/${id}/status?status=${status}`
      );

      fetchApplications();

    } catch (err) {

      console.log(err);

      alert("Error updating status");
    }
  };

  const fetchApplications = async () => {

    try {

      const res = await API.get("/admin/applications");

      setApplications(res.data);

    } catch (err) {

      console.log(err);

      alert("Error fetching applications");
    }
  };

  const fetchJobs = async () => {

  try {

    const res = await API.get("/admin/jobs");

    setJobs(res.data);

  } catch (err) {

    console.log(err);
  }
};

const deleteJob = async (id) => {

  try {

    await API.delete(`/admin/jobs/${id}`);

    fetchJobs();

  } catch (err) {

    console.log(err);
  }
};

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  // FILTER
  const filteredApplications = applications

  .filter((app) => {

    if (selectedStatus === "ALL")
      return true;

    return app.status === selectedStatus;
  })

  .filter((app) =>

    app.userEmail
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    app.jobTitle
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    app.status
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const acceptedCount = applications.filter(
  (app) => app.status === "ACCEPTED"
).length;

const rejectedCount = applications.filter(
  (app) => app.status === "REJECTED"
).length;

const pendingCount = applications.filter(
  (app) => app.status === "PENDING"
).length;

// PIE DATA
const pieData = [

  {
    name: "Accepted",
    value: acceptedCount
  },

  {
    name: "Rejected",
    value: rejectedCount
  },

  {
    name: "Pending",
    value: pendingCount
  }
];

// COLORS
const COLORS = [
  "#22c55e",
  "#ef4444",
  "#facc15"
];

// JOB ANALYTICS
const jobStats = {};

applications.forEach((app) => {

  if (!jobStats[app.jobTitle]) {

    jobStats[app.jobTitle] = 0;
  }

  jobStats[app.jobTitle]++;
});

const barData = Object.keys(jobStats).map((job) => ({
  job,
  applications: jobStats[job]
}));

  // STATS
  const accepted = applications.filter(
    (a) => a.status === "ACCEPTED"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "REJECTED"
  ).length;

  const pending = applications.filter(
    (a) => a.status === "PENDING"
  ).length;

  return (

    <>
      <Navbar />

      <div
        className={`
          min-h-screen
          px-8
          py-10
          transition-all
          duration-500

          ${
            darkMode
              ? "bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white"
              : "bg-gray-100 text-black"
          }
        `}
      >

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <h1 className="text-5xl font-bold mb-5 md:mb-0">
            Admin Analytics
          </h1>
          <div className="flex gap-4 mb-8">

            <button

              onClick={() => setActiveTab("applications")}

              className={`
                px-5
                py-3
                rounded-2xl
                font-bold

                ${
                  activeTab === "applications"
                    ? "bg-cyan-500 text-black"
                    : "bg-white/10"
                }
              `}
            >
              Applications
            </button>

            <button

              onClick={() => setActiveTab("jobs")}

              className={`
                px-5
                py-3
                rounded-2xl
                font-bold

                ${
                  activeTab === "jobs"
                    ? "bg-cyan-500 text-black"
                    : "bg-white/10"
                }
              `}
            >
              Jobs
            </button>

          </div>
          <button
              onClick={() => setShowModal(true)}
              className="
                bg-cyan-500
                hover:bg-cyan-600
                text-black
                px-5
                py-3
                rounded-2xl
                font-bold
                mb-6
              "
            >
              + Add Job
            </button>

          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              px-5
              py-3
              rounded-2xl
              w-full
              md:w-[350px]
              bg-white/10
              border
              border-white/10
              backdrop-blur-lg
              outline-none
            "
          />

        </div>

       {
  activeTab === "applications" && (

    <>
    
      {/* STATS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* TOTAL */}
<motion.div

  whileHover={{ scale: 1.03 }}

  onClick={() => {

    setSelectedStatus("ALL");

    applicationsRef.current
      ?.scrollIntoView({

        behavior: "smooth"
      });
  }}

  className="
    bg-cyan-500
    text-black
    rounded-3xl
    p-6
    shadow-xl
    cursor-pointer
  "
>

            <FaUsers className="text-4xl mb-4" />

            <h2 className="text-4xl font-bold">
              {applications.length}
            </h2>

            <p className="font-semibold mt-2">
              Total Applications
            </p>

          </motion.div>

         {/* ACCEPTED */}
<motion.div

  whileHover={{ scale: 1.03 }}

  onClick={() => {

    setSelectedStatus("ACCEPTED");

    applicationsRef.current
      ?.scrollIntoView({

        behavior: "smooth"
      });
  }}

  className="
    bg-green-500
    text-white
    rounded-3xl
    p-6
    shadow-xl
    cursor-pointer
  "
>
            <FaCheckCircle className="text-4xl mb-4" />

            <h2 className="text-4xl font-bold">
              {accepted}
            </h2>

            <p className="font-semibold mt-2">
              Accepted
            </p>

          </motion.div>

          {/* REJECTED */}
          <motion.div

            whileHover={{ scale: 1.03 }}

            onClick={() => {

  setSelectedStatus("REJECTED");

  applicationsRef.current
    ?.scrollIntoView({

      behavior: "smooth"
    });
}}

            className="
              bg-red-500
              text-white
              rounded-3xl
              p-6
              shadow-xl
              cursor-pointer
            "
          >

            <FaTimesCircle className="text-4xl mb-4" />

            <h2 className="text-4xl font-bold">
              {rejected}
            </h2>

            <p className="font-semibold mt-2">
              Rejected
            </p>

          </motion.div>

          {/* PENDING */}
          <motion.div

            whileHover={{ scale: 1.03 }}

            onClick={() => {

  setSelectedStatus("PENDING");

  applicationsRef.current
    ?.scrollIntoView({

      behavior: "smooth"
    });
}}

            className="
              bg-yellow-400
              text-black
              rounded-3xl
              p-6
              shadow-xl
              cursor-pointer
            "
          >

            <FaClock className="text-4xl mb-4" />

            <h2 className="text-4xl font-bold">
              {pending}
            </h2>

            <p className="font-semibold mt-2">
              Pending
            </p>

          </motion.div>

        </div>
        {/* ANALYTICS CHARTS */}

                <div className="grid lg:grid-cols-2 gap-8 mb-12">

                  {/* PIE CHART */}

                  <div
                    className={`
                      rounded-3xl
                      p-7
                      shadow-xl
                      border
                      backdrop-blur-lg

                      ${
                        darkMode
                          ? "bg-white/10 border-white/10"
                          : "bg-white border-gray-200"
                      }
                    `}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Application Status
                    </h2>

                    <div className="h-[350px]">

                      <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            dataKey="value"
                            label
                          >

                            {pieData.map((entry, index) => (

                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />

                            ))}

                          </Pie>

                          <Tooltip />

                          <Legend />

                        </PieChart>

                      </ResponsiveContainer>

                    </div>

                  </div>

                  {/* BAR CHART */}

                  <div
                    className={`
                      rounded-3xl
                      p-7
                      shadow-xl
                      border
                      backdrop-blur-lg

                      ${
                        darkMode
                          ? "bg-white/10 border-white/10"
                          : "bg-white border-gray-200"
                      }
                    `}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Applications Per Job
                    </h2>

                    <div className="h-[350px]">

                      <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={barData}>

                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis dataKey="job" />

                          <YAxis />

                          <Tooltip />

                          <Legend />

                          <Bar
                            dataKey="applications"
                            fill="#06b6d4"
                            radius={[10, 10, 0, 0]}
                          />

                        </BarChart>

                      </ResponsiveContainer>

                    </div>

                  </div>

                               </div>

              </>

            )
          }
        {/* APPLICATIONS */}
{
  activeTab === "applications" && (

    <div

  ref={applicationsRef}

  className="grid lg:grid-cols-2 gap-8"
>

      {filteredApplications.map((app, index) => (

        <motion.div

          key={app.id}

          initial={{ opacity: 0, y: 40 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: index * 0.08 }}

          className={`
            rounded-3xl
            p-7
            shadow-xl
            border
            backdrop-blur-lg
            transition-all
            duration-500

            ${
              darkMode
                ? "bg-white/10 border-white/10"
                : "bg-white border-gray-200"
            }
          `}
        >

          {/* JOB TITLE */}
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            {app.jobTitle}
          </h2>

          {/* EMAIL */}
          <p className="mb-4 text-gray-400">
            {app.userEmail}
          </p>

          {/* SCORE */}
          <div className="mb-6">

            <div className="flex justify-between mb-2">

              <span className="font-semibold">
                AI Match Score
              </span>

              <span className="font-bold text-cyan-400">
                {app.matchScore}%
              </span>

            </div>

            {/* PROGRESS BAR */}
            <div className="
              w-full
              h-4
              bg-gray-700
              rounded-full
              overflow-hidden
            ">

              <motion.div

                initial={{ width: 0 }}

                animate={{
                  width: `${app.matchScore}%`
                }}

                transition={{ duration: 1 }}

                className="
                  h-full
                  bg-cyan-400
                "
              />

            </div>

          </div>

          {/* STATUS */}
          <div className="mb-6">

            <span
              className={`
                px-4
                py-2
                rounded-full
                font-bold

                ${
                  app.status === "ACCEPTED"
                    ? "bg-green-500 text-white"

                    : app.status === "REJECTED"
                    ? "bg-red-500 text-white"

                    : "bg-yellow-400 text-black"
                }
              `}
            >
              {app.status}
            </span>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4">

            {/* PREVIEW */}
            <button

              onClick={() =>
                setSelectedResume(
                  `http://localhost:8080/api/user/resume/view?fileName=${app.resumeFileName}`
                )
              }

              className="
                flex-1
                bg-purple-500
                hover:bg-purple-600
                py-3
                rounded-2xl
                font-bold
                transition
              "
            >
              Preview Resume
            </button>

            {/* DOWNLOAD */}
            <button

              onClick={() => {

                window.open(
                  `http://localhost:8080/api/user/resume?fileName=${app.resumeFileName}`,
                  "_blank"
                );
              }}

              className="
                flex-1
                bg-cyan-500
                hover:bg-cyan-600
                py-3
                rounded-2xl
                font-bold
                transition
              "
            >
              Download Resume
            </button>

            {/* ACCEPT */}
            <button

              onClick={() =>
                updateStatus(app.id, "ACCEPTED")
              }

              className="
                flex-1
                bg-green-500
                hover:bg-green-600
                py-3
                rounded-2xl
                font-bold
                transition
              "
            >
              Accept
            </button>

            {/* REJECT */}
            <button

              onClick={() =>
                updateStatus(app.id, "REJECTED")
              }

              className="
                flex-1
                bg-red-500
                hover:bg-red-600
                py-3
                rounded-2xl
                font-bold
                transition
              "
            >
              Reject
            </button>

          </div>

        </motion.div>

      ))}

    </div>

  )
}
{
  activeTab === "jobs" && (

    <div className="grid lg:grid-cols-2 gap-8">

      {jobs.map((job) => (

        <div
          key={job.id}
          className={`
            rounded-3xl
            p-7
            shadow-xl
            border
            backdrop-blur-lg

            ${
              darkMode
                ? "bg-white/10 border-white/10"
                : "bg-white border-gray-200"
            }
          `}
        >

          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            {job.title}
          </h2>

          <p className="mb-3">
            {job.description}
          </p>

          <p className="mb-2">
            <b>Skills:</b> {job.skillsRequired}
          </p>

          <p className="mb-2">
            <b>Location:</b> {job.location}
          </p>

          <p className="mb-2">
            <b>Salary:</b> {job.salary}
          </p>

          <p className="mb-6">
            <b>Type:</b> {job.jobType}
          </p>

          <div className="flex gap-4 mt-6">

            {/* EDIT BUTTON */}

            <button

              onClick={() => setEditJob(job)}

              className="
                bg-yellow-400
                hover:bg-yellow-500
                text-black
                px-5
                py-3
                rounded-2xl
                font-bold
              "
            >
              Edit Job
            </button>

            {/* DELETE BUTTON */}

            <button

              onClick={() => deleteJob(job.id)}

              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-5
                py-3
                rounded-2xl
                font-bold
              "
            >
              Delete Job
            </button>

          </div>

        </div>

      ))}

    </div>

  )
}
      </div>
           {/* RESUME MODAL */}

      {selectedResume && (

        <div
          className="
            fixed
            inset-0
            bg-black/70
            flex
            items-center
            justify-center
            z-50
          "
        >

          <div
            className="
              bg-white
              dark:bg-gray-900
              w-[90%]
              h-[90%]
              rounded-3xl
              overflow-hidden
              relative
            "
          >

            {/* CLOSE BUTTON */}

            <button

              onClick={() =>
                setSelectedResume(null)
              }

              className="
                absolute
                top-4
                right-4
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-xl
                z-50
              "
            >
              Close
            </button>

            {/* PDF VIEWER */}

            <iframe
              src={selectedResume}
              title="Resume Preview"
              className="w-full h-full"
            />

          </div>

        </div>

      )}

      {/* ADD JOB MODAL */}

      {
        showModal && (

          <AddJobModal
            closeModal={() => setShowModal(false)}
            refreshJobs={fetchJobs}
          />

        )
      }
        
        {/* EDIT JOB MODAL */}

          {
            editJob && (

              <EditJobModal
                job={editJob}
                closeModal={() => setEditJob(null)}
                refreshJobs={fetchJobs}
              />

            )
          }
    </>
  );
}

export default AdminDashboard;