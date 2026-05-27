import { useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

function AddJobModal({ closeModal, refreshJobs }) {

  const [jobData, setJobData] = useState({

    title: "",
    description: "",
    skillsRequired: "",
    location: "",
    salary: "",
    jobType: ""

  });

  const handleChange = (e) => {

    setJobData({

      ...jobData,
      [e.target.name]: e.target.value

    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/admin/jobs",
        jobData
      );

      toast.success("Job Added Successfully");

      refreshJobs();

      closeModal();

    } catch (err) {

      console.log(err);

      toast.error("Failed to add job");
    }
  };

  return (

    <div className="
      fixed
      inset-0
      bg-black/70
      flex
      justify-center
      items-center
      z-50
    ">

      <div className="
        bg-slate-900
        w-full
        max-w-2xl
        rounded-3xl
        p-8
        shadow-2xl
        border
        border-cyan-500/20
      ">

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
            Add New Job
          </h2>

          <button
            onClick={closeModal}
            className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            Close
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
              text-white
              border
              border-slate-700
            "
          />

          <textarea
            name="description"
            placeholder="Job Description"
            onChange={handleChange}
            required
            rows="4"
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
              text-white
              border
              border-slate-700
            "
          />

          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills Required"
            onChange={handleChange}
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
              text-white
              border
              border-slate-700
            "
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              required
              className="
                p-4
                rounded-xl
                bg-slate-800
                text-white
                border
                border-slate-700
              "
            />

            <input
              type="text"
              name="salary"
              placeholder="Salary"
              onChange={handleChange}
              required
              className="
                p-4
                rounded-xl
                bg-slate-800
                text-white
                border
                border-slate-700
              "
            />

          </div>

          <select
            name="jobType"
            onChange={handleChange}
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
              text-white
              border
              border-slate-700
            "
          >

            <option value="">
              Select Job Type
            </option>

            <option value="Full Time">
              Full Time
            </option>

            <option value="Part Time">
              Part Time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Remote">
              Remote
            </option>

          </select>

          <button
            type="submit"
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              text-black
              font-bold
              py-4
              rounded-xl
              transition
            "
          >
            Add Job
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddJobModal;