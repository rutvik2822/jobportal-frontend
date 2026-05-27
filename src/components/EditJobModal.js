import { useState } from "react";

import API from "../services/api";

function EditJobModal({
  job,
  closeModal,
  refreshJobs
}) {

  const [jobData, setJobData] = useState({

    title: job.title,

    description: job.description,

    skillsRequired: job.skillsRequired,

    location: job.location,

    salary: job.salary,

    jobType: job.jobType

  });

  const handleChange = (e) => {

    setJobData({

      ...jobData,

      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await API.put(
        `/admin/jobs/${job.id}`,
        jobData
      );

      refreshJobs();

      closeModal();

    } catch (err) {

      console.log(err);
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
            Edit Job
          </h2>

          <button

            onClick={closeModal}

            className="
              bg-red-500
              px-4
              py-2
              rounded-xl
            "
          >
            Close
          </button>

        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
            "
          />

          <textarea
            name="description"
            rows="4"
            value={jobData.description}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
            "
          />

          <input
            type="text"
            name="skillsRequired"
            value={jobData.skillsRequired}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
            "
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="
                p-4
                rounded-xl
                bg-slate-800
              "
            />

            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="
                p-4
                rounded-xl
                bg-slate-800
              "
            />

          </div>

          <input
            type="text"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
            "
          />

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
            "
          >
            Update Job
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditJobModal;