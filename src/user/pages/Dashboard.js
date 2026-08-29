import {
    useEffect,
    useState,
    useContext,
    useRef
} from "react";

import API from "../../services/api";

import ApplyComponent from "../components/ApplyComponent";

import Navbar from "../../components/Navbar";

import { ThemeContext } from "../../context/ThemeContext";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

function Dashboard() {

  const [jobs, setJobs] = useState([]);

  const [applications, setApplications] = useState([]);

  const [activeTab, setActiveTab] = useState("jobs");

  const [search, setSearch] = useState("");

  const { darkMode } = useContext(ThemeContext);

  const [activeAIResponse, setActiveAIResponse] = useState("");

  const [activeAITitle, setActiveAITitle] = useState("");

  const [loadingAI, setLoadingAI] = useState("");

  const [uploadedResumes, setUploadedResumes] = useState({});

  const aiResponseRef = useRef(null);

  const previousScrollPosition = useRef(0);

  useEffect(() => {

    fetchJobs();

    fetchApplications();

  }, []);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/user/jobs");

      setJobs(res.data);

    } catch (err) {

      console.log(err);

      alert("Error fetching jobs");
    }
  };

  const fetchApplications = async () => {

    try {

      const res = await API.get("/user/applications");

      setApplications(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  const analyzeJobWithAI = async (jobId, jobText) => {

  try {
    previousScrollPosition.current =
  window.scrollY;

    setLoadingAI(`job-${jobId}`);

    const res = await API.post(
      "/ai/analyze-job",
      {
        job: jobText
      }
    );

    setActiveAITitle("AI Job Analysis");

      setActiveAIResponse(
        res.data.choices[0].message.content
      );

      setTimeout(() => {

  aiResponseRef.current?.scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}, 200);

  } catch (err) {

    console.log(err);

    toast.error("Job analysis failed");

  } finally {

    setLoadingAI("");
  }
};

const analyzeResumeWithAI = async (
  jobId,
  resumeFile
) => {

  if (!resumeFile) {

    toast.error("Please upload resume first");

    return;
  }

  try {

    previousScrollPosition.current =
      window.scrollY;

    setLoadingAI(`resume-${jobId}`);

    const formData = new FormData();

    formData.append("file", resumeFile);

    const res = await API.post(

      "/ai/analyze-resume",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    setActiveAITitle(
      "AI Resume Analysis"
    );

    setActiveAIResponse(
      res.data.choices[0].message.content
    );

    setTimeout(() => {

      aiResponseRef.current?.scrollIntoView({

        behavior: "smooth",

        block: "start"

      });

    }, 200);

  } catch (err) {

    console.log(err);

    toast.error(
      "Resume analysis failed"
    );

  } finally {

    setLoadingAI("");
  }
};

const compareResumeWithJob = async (

  jobId,

  resumeFile,

  jobText

) => {

  if (!resumeFile) {

    toast.error("Please upload resume first");

    return;
  }

  try {

    previousScrollPosition.current =
      window.scrollY;

    setLoadingAI(`compare-${jobId}`);

    const formData = new FormData();

    formData.append("file", resumeFile);

    formData.append("job", jobText);

    const res = await API.post(

      "/ai/compare",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    setActiveAITitle(
      "Resume vs Job Match"
    );

    setActiveAIResponse(
      res.data.choices[0].message.content
    );

    setTimeout(() => {

      aiResponseRef.current?.scrollIntoView({

        behavior: "smooth",

        block: "start"

      });

    }, 200);

  } catch (err) {

    console.log(err);

    toast.error("Comparison failed");

  } finally {

    setLoadingAI("");
  }
};

  // SEARCH FILTER
  const filteredJobs = jobs.filter((job) =>

    job.title.toLowerCase().includes(search.toLowerCase()) ||

    job.skillsRequired.toLowerCase().includes(search.toLowerCase())
  );

  const hasApplied = (jobId) => {
    return applications.some(
        (application) => Number(application.jobId) === Number(jobId)
    );
  };

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

        {/* HEADING */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <h2 className="text-4xl font-bold mb-5 md:mb-0">
            Available Jobs ({filteredJobs.length})
          </h2>

          {/* TABS */}
          <div className="flex gap-4 mb-8">

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
                    : "bg-gray-700 text-white"
                }
              `}
            >
              Available Jobs
            </button>

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
                    : "bg-gray-700 text-white"
                }
              `}
            >
              Applied Jobs
            </button>

          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search jobs or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`
  px-5
  py-3
  rounded-2xl
  outline-none
  border
  transition-all
  duration-300
  w-full
  md:w-96

  ${
    darkMode
      ? "bg-white/10 border-white/10 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 shadow-md"
  }

  focus:ring-2
  focus:ring-cyan-400
`}
          />

        </div>

{/* JOBS TAB */}

{
  activeTab === "jobs" && (

    filteredJobs.length === 0 ? (

      <div className="text-center mt-20">

        <h2 className="text-3xl font-bold text-cyan-400">
          No Jobs Found
        </h2>

        <p className="mt-4 text-gray-400">
          Try another search keyword
        </p>

      </div>

    ) : (

      <>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredJobs.map((job, index) => (

            <motion.div

              key={job.id}

              initial={{ opacity: 0, y: 40 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: index * 0.1 }}

              whileHover={{
                scale: 1.03
              }}

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
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                {job.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                {job.description}
              </p>

              {/* EXTRA INFO */}
              <div className="space-y-2 mb-5">

                <p>
                  <b>Location:</b> {job.location}
                </p>

                <p>
                  <b>Salary:</b> {job.salary}
                </p>

                <p>
                  <b>Type:</b> {job.jobType}
                </p>

              </div>

              {/* SKILLS */}
              <div className="mb-6">

                <h4 className="font-bold mb-3 text-lg">
                  Required Skills
                </h4>

                <div className="flex flex-wrap gap-3">

                  {job.skillsRequired
                    .split(",")
                    .map((skill, i) => (

                      <span
                        key={i}
                        className="
                          bg-cyan-500/20
                          text-cyan-300
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          border
                          border-cyan-400/20
                        "
                      >
                        {skill.trim()}
                      </span>
                    ))}

                </div>

              </div>

              {/* APPLY */}
              <div className="mt-8">

                {hasApplied(job.id) ? (

                <div
                    className="
                        w-full
                        py-3
                        rounded-2xl
                        font-bold
                        text-lg
                        text-center
                        bg-green-500/20
                        text-green-400
                        border
                        border-green-400/30
                    "
                >
                    ✓ Already Applied
                </div>

            ) : (

                <ApplyComponent

                    jobId={job.id}

                    uploadedResumes={uploadedResumes}

                    setUploadedResumes={setUploadedResumes}

                />

            )}

                {/* AI BUTTON */}
                <motion.button

                  whileHover={{ scale: 1.03 }}

                  whileTap={{ scale: 0.95 }}

                  onClick={() =>
                    analyzeJobWithAI(
                      job.id,
                      `
                      Job Title: ${job.title}

                      Description:
                      ${job.description}

                      Skills Required:
                      ${job.skillsRequired}
                      `
                    )
                  }

                  className="
                    mt-4
                    w-full
                    bg-purple-500
                    hover:bg-purple-600
                    text-white
                    font-bold
                    py-3
                    rounded-xl
                    transition
                  "
                >

                  {
                    loadingAI === `job-${job.id}`
                      ? "Analyzing Job..."
                      : "Analyze Job Requirements"
                  }

                </motion.button>

                {/* ANALYZE RESUME */}

                    <motion.button

                      whileHover={{ scale: 1.03 }}

                      whileTap={{ scale: 0.95 }}

                      onClick={() =>
                        analyzeResumeWithAI(
                          job.id,
                          uploadedResumes[job.id]
                        )
                      }

                      className="
                        mt-4
                        w-full
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        font-bold
                        py-3
                        rounded-xl
                        transition
                      "
                    >

                      {
                        loadingAI === `resume-${job.id}`
                          ? "Analyzing Resume..."
                          : "Analyze My Resume"
                      }

                    </motion.button>

                    {/* COMPARE */}

                    <motion.button

                      whileHover={{ scale: 1.03 }}

                      whileTap={{ scale: 0.95 }}

                      onClick={() =>
                        compareResumeWithJob(
                          job.id,
                          uploadedResumes[job.id],
                          `
                          ${job.title}

                          ${job.description}

                          ${job.skillsRequired}
                          `
                        )
                      }

                      className="
                        mt-4
                        w-full
                        bg-cyan-500
                        hover:bg-cyan-600
                        text-black
                        font-bold
                        py-3
                        rounded-xl
                        transition
                      "
                    >

                      {
                        loadingAI === `compare-${job.id}`
                          ? "Comparing..."
                          : "Compare Resume With Job"
                      }

                    </motion.button>
              </div>

            </motion.div>

          ))}

        </div>
      {
 
    activeAIResponse && (

    <motion.div

      ref={aiResponseRef}
      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      className="
        mt-10
        bg-white/10
        border
        border-white/10
        rounded-3xl
        p-8
        backdrop-blur-lg
        shadow-xl
        whitespace-pre-wrap
      "
    >

      <div className="
        flex
        justify-between
        items-center
        mb-6
      ">

        <h2 className="
          text-3xl
          font-bold
          text-cyan-400
        ">

          {activeAITitle}

        </h2>

        <button

          onClick={() => {

  setActiveAIResponse("");

  setActiveAITitle("");

  window.scrollTo({

    top: previousScrollPosition.current,

    behavior: "smooth"
  });
}}

          className="
            bg-red-500
            hover:bg-red-600
            px-4
            py-2
            rounded-xl
            font-bold
          "
        >

          Close

        </button>

      </div>

      <div className="
        leading-relaxed
        text-gray-200
      ">

        {activeAIResponse}

      </div>

    </motion.div>

  )
}
</>
    )

  )
}
        {/* APPLIED JOBS TAB */}

        {
          activeTab === "applications" && (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {applications.map((app, index) => (

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

                    ${
                      darkMode
                        ? "bg-white/10 border-white/10"
                        : "bg-white border-gray-200"
                    }
                  `}
                >

                  <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                    {app.jobTitle}
                  </h2>

                  <p className="mb-5">
                        AI Match Score:

                        <span className="ml-2 font-bold text-cyan-400">
                          {Number.isInteger(Number(app.matchScore))
                            ? Number(app.matchScore)
                            : Number(app.matchScore).toFixed(2)}
                          %
                        </span>
                      </p>
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

                  <button

                    onClick={() => {

                      window.open(
                        `https://jobportal-backend-tm6k.onrender.com/api/user/resume/view?fileName=${app.resumeFileName}`,
                        "_blank"
                      );
                    }}

                    className="
                      w-full
                      bg-purple-500
                      hover:bg-purple-600
                      py-3
                      rounded-2xl
                      font-bold
                    "
                  >
                    Preview Resume
                  </button>

                </motion.div>

              ))}

            </div>

          )
        }

      </div>
    </>
  );
}

export default Dashboard;