import { useEffect, useState } from "react";
import { getAllAdminJobs } from "../../services/jobService";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const response = await getAllAdminJobs();

            setJobs(response.data);

        } catch (error) {

            console.error("Failed to load jobs:", error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <h2 className="text-2xl font-semibold">
                Loading Jobs...
            </h2>
        );

    }

    return (
        <div>

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Jobs
                    </h1>

                    <p className="text-gray-600 mt-2">
                        View all jobs posted on the platform.
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow px-6 py-4">

                    <p className="text-gray-500">
                        Total Jobs
                    </p>

                    <p className="text-3xl font-bold">
                        {jobs.length}
                    </p>

                </div>

            </div>


            {/* JOB TABLE */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                {jobs.length === 0 ? (

                    <div className="p-8 text-center text-gray-500">

                        No jobs found.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Job
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Company
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Recruiter
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Location
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Job Type
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {jobs.map((job) => (

                                    <tr
                                        key={job.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-5">

                                            <div>

                                                <p className="font-semibold">
                                                    {job.title}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    ID: {job.id}
                                                </p>

                                            </div>

                                        </td>

                                        <td className="px-6 py-5">
                                            {job.companyName || "—"}
                                        </td>

                                        <td className="px-6 py-5">
                                            {job.recruiterName || "—"}
                                        </td>

                                        <td className="px-6 py-5">
                                            {job.location || "—"}
                                        </td>

                                        <td className="px-6 py-5">
                                            {job.jobType || "—"}
                                        </td>

                                        <td className="px-6 py-5">

                                            <button
                                                onClick={() => setSelectedJob(job)}
                                                className="text-cyan-600 font-semibold hover:underline"
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* JOB DETAILS MODAL */}

            {selectedJob && (

                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                        <div className="p-8">

                            <div className="flex justify-between items-start mb-8">

                                <div>

                                    <h2 className="text-3xl font-bold">
                                        Job Details
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        Job ID: {selectedJob.id}
                                    </p>

                                </div>

                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="text-gray-500 hover:text-black text-2xl"
                                >
                                    ×
                                </button>

                            </div>


                            <div className="space-y-4">

                                <div className="border rounded-xl p-5">

                                    <p className="text-gray-500">
                                        Job Title
                                    </p>

                                    <p className="text-xl font-semibold mt-1">
                                        {selectedJob.title}
                                    </p>

                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="border rounded-xl p-5">

                                        <p className="text-gray-500">
                                            Company
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {selectedJob.companyName || "—"}
                                        </p>

                                    </div>


                                    <div className="border rounded-xl p-5">

                                        <p className="text-gray-500">
                                            Recruiter
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {selectedJob.recruiterName || "—"}
                                        </p>

                                    </div>


                                    <div className="border rounded-xl p-5">

                                        <p className="text-gray-500">
                                            Location
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {selectedJob.location || "—"}
                                        </p>

                                    </div>


                                    <div className="border rounded-xl p-5">

                                        <p className="text-gray-500">
                                            Job Type
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {selectedJob.jobType || "—"}
                                        </p>

                                    </div>


                                    <div className="border rounded-xl p-5 md:col-span-2">

                                        <p className="text-gray-500">
                                            Salary
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {selectedJob.salary || "—"}
                                        </p>

                                    </div>

                                </div>


                                <div className="border rounded-xl p-5">

                                    <p className="text-gray-500">
                                        Skills Required
                                    </p>

                                    <p className="mt-2">
                                        {selectedJob.skillsRequired || "—"}
                                    </p>

                                </div>


                                <div className="border rounded-xl p-5">

                                    <p className="text-gray-500">
                                        Description
                                    </p>

                                    <p className="mt-2 whitespace-pre-line">
                                        {selectedJob.description || "—"}
                                    </p>

                                </div>

                            </div>


                            <div className="flex justify-end mt-8">

                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600"
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Jobs;