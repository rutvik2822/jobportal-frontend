import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getRecruiterApplications,
    updateApplicationStatus,
} from "../services/applicationService";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";

function Applications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const loadApplications = async () => {
        try {
            setLoading(true);

            const res = await getRecruiterApplications();

            setApplications(res.data);

        } catch (err) {
            console.error(err);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const handleStatusChange = async (id, status) => {

        try {

            await updateApplicationStatus(id, status);

            toast.success("Application status updated");

            loadApplications();

        } catch (err) {

            console.error(err);
            toast.error("Failed to update application status");

        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">

                <p className="text-gray-500 text-lg">
                    Loading applications...
                </p>

            </div>
        );
    }

    return (
        <div>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Applications
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage applications received for your jobs.
                    </p>

                </div>

                <div className="bg-white px-5 py-3 rounded-lg shadow">

                    <span className="text-gray-500">
                        Total Applications
                    </span>

                    <span className="font-bold text-xl ml-3">
                        {applications.length}
                    </span>

                </div>

            </div>


            {applications.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-10 text-center">

                    <h2 className="text-2xl font-semibold mb-2">
                        No Applications Yet
                    </h2>

                    <p className="text-gray-500">
                        Applications for your jobs will appear here.
                    </p>

                </div>

            ) : (

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="text-left p-4">
                                        Candidate
                                    </th>

                                    <th className="text-left p-4">
                                        Job
                                    </th>

                                    <th className="text-left p-4">
                                        Match Score
                                    </th>

                                    <th className="text-left p-4">
                                        Resume
                                    </th>

                                    <th className="text-left p-4">
                                        Status
                                    </th>

                                    <th className="text-left p-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {applications.map((application) => (

                                    <tr
                                        key={application.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4">

                                            <p className="font-semibold">
                                                {application.userEmail}
                                            </p>

                                        </td>


                                        <td className="p-4">

                                            <p className="font-medium">
                                                {application.jobTitle}
                                            </p>

                                        </td>


                                        <td className="p-4">

                                            <span
                                                className={`font-bold ${
                                                    application.matchScore >= 80
                                                        ? "text-green-600"
                                                        : application.matchScore >= 60
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {application.matchScore}%
                                            </span>

                                        </td>


                                        <td className="p-4">

                                            <span className="text-sm text-gray-600">
                                                {application.resumeFileName}
                                            </span>

                                        </td>


                                        <td className="p-4">

                                            <select
                                                value={application.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        application.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded-lg px-3 py-2 bg-white"
                                            >

                                                <option value="ACCEPTED">
                                                    ACCEPTED
                                                </option>

                                                <option value="REJECTED">
                                                    REJECTED
                                                </option>

                                            </select>

                                        </td>

                                        <td className="p-4">

                                            <button
                                                className="text-green-600 font-medium"
                                                onClick={() => {
                                                    setSelectedApplication(application);
                                                    setShowDetails(true);
                                                }}
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

                <ApplicationDetailsModal
            application={selectedApplication}
            isOpen={showDetails}
            onClose={() => {
                setShowDetails(false);
                setSelectedApplication(null);
            }}
        />
        </div>
    );
}

export default Applications;