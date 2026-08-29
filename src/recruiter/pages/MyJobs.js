import { useEffect, useState } from "react";
import { getMyJobs, deleteJob } from "../services/jobService";
import toast from "react-hot-toast";
import JobModal from "../components/JobModal";
import JobDetailsModal from "../components/JobDetailsModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

function MyJobs() {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);

    const [modalMode, setModalMode] = useState("add");

    const [showDetails, setShowDetails] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [jobToDelete, setJobToDelete] = useState(null);

    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const response = await getMyJobs();

            setJobs(response.data);

        } catch (error) {

            console.error("Failed to load jobs", error);

            toast.error("Failed to load jobs");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async () => {

    if (!jobToDelete) return;

    try {

        setDeleting(true);

        await deleteJob(jobToDelete.id);

        toast.success("Job deleted successfully");

        setShowDeleteModal(false);

        setJobToDelete(null);

        loadJobs();

    } catch (error) {

        console.error("Failed to delete job", error);

        toast.error("Failed to delete job");

    } finally {

        setDeleting(false);

    }

};

    if (loading) {

        return (
            <h2 className="text-2xl font-semibold">
                Loading jobs...
            </h2>
        );

    }

    return (

        <div>

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        My Jobs
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your job postings
                    </p>

                </div>

                <button
                    onClick={() => {

                        setModalMode("add");

                        setSelectedJob(null);

                        setShowModal(true);

                    }}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl"
                >
                    + Add Job
                </button>

            </div>

            {/* Jobs */}

            {jobs.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-8 text-center">

                    <h2 className="text-2xl font-semibold mb-2">
                        No Jobs Found
                    </h2>

                    <p className="text-gray-500">
                        You haven't posted any jobs yet.
                    </p>

                </div>

            ) : (

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="p-4 text-left">
                                    Job Title
                                </th>

                                <th className="p-4 text-left">
                                    Company
                                </th>

                                <th className="p-4 text-left">
                                    Location
                                </th>

                                <th className="p-4 text-left">
                                    Salary
                                </th>

                                <th className="p-4 text-left">
                                    Job Type
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {jobs.map((job) => (

                                <tr
                                    key={job.id}
                                    className="border-t"
                                >

                                    <td className="p-4 font-semibold">
                                        {job.title}
                                    </td>

                                    <td className="p-4">
                                        {job.companyName}
                                    </td>

                                    <td className="p-4">
                                        {job.location}
                                    </td>

                                    <td className="p-4">
                                        {job.salary}
                                    </td>

                                    <td className="p-4">
                                        {job.jobType}
                                    </td>

                                    <td className="p-4">

                                        <button
                                            className="text-green-600 mr-3"
                                            onClick={() => {
                                                setSelectedJob(job);
                                                setShowDetails(true);
                                            }}
                                        >
                                            View
                                        </button>

                                        <button
                                            className="text-blue-600 mr-3"
                                            onClick={() => {

                                                setModalMode("edit");

                                                setSelectedJob(job);

                                                setShowModal(true);

                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="text-red-600"
                                            onClick={() => {

                                                setJobToDelete(job);

                                                setShowDeleteModal(true);

                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

            {/* Job Modal */}

            <JobModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={loadJobs}
                job={selectedJob}
                mode={modalMode}
            />

                <JobDetailsModal
                job={selectedJob}
                isOpen={showDetails}
                onClose={() => {
                    setShowDetails(false);
                    setSelectedJob(null);
                }}
            />

               <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => {

                    if (deleting) return;

                    setShowDeleteModal(false);
                    setJobToDelete(null);

                }}
                onConfirm={handleDelete}
                title="Delete Job"
                message={
                    jobToDelete
                        ? `Are you sure you want to delete "${jobToDelete.title}"?`
                        : "Are you sure you want to delete this job?"
                }
                loading={deleting}
            />

        </div>

    );

}

export default MyJobs;