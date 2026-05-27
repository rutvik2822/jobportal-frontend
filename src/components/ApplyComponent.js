import { useState, useContext } from "react";

import API from "../services/api";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";

function ApplyComponent({

  jobId,

  uploadedResumes,

  setUploadedResumes

}) {

  const file = uploadedResumes[jobId] || null;

  const [fileName, setFileName] = useState(
    localStorage.getItem(`resume-${jobId}`) || ""
  );

  const [loading, setLoading] = useState(false);

  const { darkMode } = useContext(ThemeContext);

  const handleApply = async () => {

    if (!file) {

      alert("Please select a resume");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("jobId", jobId);

      formData.append("file", file);

      const res = await API.post(

        "/user/apply",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(
        `Applied Successfully!\nAI Match Score: ${res.data.matchScore}%`
      );

      // REMOVE FILE FROM GLOBAL STATE

      const updatedResumes = {

        ...uploadedResumes
      };

      delete updatedResumes[jobId];

      setUploadedResumes(updatedResumes);

      // RESET UI

      setFileName("");

      localStorage.removeItem(`resume-${jobId}`);

    } catch (err) {

      console.log(err);

      alert("Error applying");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="space-y-5">

      {/* FILE INPUT */}

      <label
        className={`
          flex
          items-center
          justify-center
          w-full
          p-4
          border-2
          border-dashed
          rounded-2xl
          cursor-pointer
          transition-all
          duration-300

          ${
            darkMode
              ? "border-cyan-400/30 bg-white/5 hover:bg-white/10"
              : "border-cyan-500/30 bg-gray-100 hover:bg-gray-200"
          }
        `}
      >

        <input

          type="file"

          className="hidden"

          onChange={(e) => {

            const selectedFile = e.target.files[0];

            if (!selectedFile) return;

            // STORE IN GLOBAL STATE

            setUploadedResumes({

              ...uploadedResumes,

              [jobId]: selectedFile
            });

            // UI DISPLAY

            setFileName(selectedFile.name);

            // LOCAL STORAGE

            localStorage.setItem(

              `resume-${jobId}`,

              selectedFile.name
            );
          }}
        />

        <span className="text-center">

          {fileName || "Upload Resume (PDF)"}

        </span>

      </label>

      {/* APPLY BUTTON */}

      <motion.button

        whileHover={{ scale: 1.03 }}

        whileTap={{ scale: 0.97 }}

        onClick={handleApply}

        disabled={loading}

        className={`
          w-full
          py-3
          rounded-2xl
          font-bold
          text-lg
          transition-all
          duration-300

          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600 text-black"
          }
        `}
      >

        {loading ? "Applying..." : "Apply Now"}

      </motion.button>

    </div>
  );
}

export default ApplyComponent;