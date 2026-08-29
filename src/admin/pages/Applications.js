import { useEffect, useState } from "react";
import { getAllAdminApplications } from "../../services/applicationService";

function Applications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await getAllAdminApplications();

            setApplications(response.data);

        } catch (error) {

            console.error("Failed to load applications:", error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <h2 className="text-2xl font-semibold">
                Loading Applications...
            </h2>
        );

    }

    return (
        <div>

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Applications
                    </h1>

                    <p className="text-gray-600 mt-2">
                        View all job applications submitted on the platform.
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow px-6 py-4">

                    <p className="text-gray-500">
                        Total Applications
                    </p>

                    <p className="text-3xl font-bold">
                        {applications.length}
                    </p>

                </div>

            </div>


            {/* APPLICATION TABLE */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                {applications.length === 0 ? (

                    <div className="p-8 text-center text-gray-500">

                        No applications found.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Candidate
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Job
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Match Score
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Resume
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {applications.map((application) => (

                                    <tr
                                        key={application.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-5">

                                            {application.userEmail || "—"}

                                        </td>

                                        <td className="px-6 py-5">

                                            <p className="font-semibold">
                                                {application.jobTitle || "—"}
                                            </p>

                                        </td>

                                        <td className="px-6 py-5">

                                            <span
                                                className={
                                                    application.matchScore >= 70
                                                        ? "font-semibold text-green-600"
                                                        : "font-semibold text-red-500"
                                                }
                                            >
                                                {application.matchScore ?? 0}%
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="text-sm text-gray-600">
                                                {application.resumeFileName || "—"}
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="font-semibold">
                                                {application.status || "PENDING"}
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            <button
                                                onClick={() =>
                                                    setSelectedApplication(application)
                                                }
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


            {/* APPLICATION DETAILS MODAL */}

            {selectedApplication && (

                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                        <div className="p-8">

                            <div className="flex justify-between items-start mb-8">

                                <div>

                                    <h2 className="text-3xl font-bold">
                                        Application Details
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        Application ID: {selectedApplication.id}
                                    </p>

                                </div>

                                <button
                                    onClick={() => setSelectedApplication(null)}
                                    className="text-gray-500 hover:text-black text-2xl"
                                >
                                    ×
                                </button>

                            </div>


                            <div className="space-y-4">

                                <div className="border rounded-xl p-5">

                                    <p className="text-gray-500">
                                        Candidate Email
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {selectedApplication.userEmail || "—"}
                                    </p>

                                </div>


                                <div className="border rounded-xl p-5">

                                    <p className="text-gray-500">
                                        Job Title
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {selectedApplication.jobTitle || "—"}
                                    </p>

                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="border rounded-xl p-5">

                                        <p className="text-gray-500">
                                            AI Match Score
                                        </p>

                                        <p className="text-xl font-semibold mt-1">
                                            {selectedApplication.matchScore ?? 0}%
                                        </p>

                                    </div>


                                    <div className="border rounded-xl p-5">

                                        <p className="text-gray-500">
                                            Application Status
                                        </p>

                                        <p className="font-semibold mt-1">
                                            {selectedApplication.status || "PENDING"}
                                        </p>

                                    </div>

                                </div>


                                <div className="border rounded-xl p-5">

                                    <p className="text-gray-500">
                                        Resume
                                    </p>

                                    <p className="font-semibold mt-1 break-all">
                                        {selectedApplication.resumeFileName || "—"}
                                    </p>

                                </div>

                            </div>


                            <div className="flex justify-end mt-8">

                                <button
                                    onClick={() => setSelectedApplication(null)}
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

export default Applications;