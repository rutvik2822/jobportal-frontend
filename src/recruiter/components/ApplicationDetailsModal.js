function ApplicationDetailsModal({
    application,
    isOpen,
    onClose,
}) {
    if (!isOpen || !application) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Application Details
                </h2>

                <div className="space-y-4">

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                            Candidate Email
                        </p>

                        <p className="font-semibold mt-1">
                            {application.userEmail}
                        </p>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                            Job Title
                        </p>

                        <p className="font-semibold mt-1">
                            {application.jobTitle}
                        </p>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                            AI Match Score
                        </p>

                        <p className="font-semibold text-xl mt-1">
                            {application.matchScore}%
                        </p>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                            Resume
                        </p>

                        <p className="font-semibold mt-1 break-all">
                            {application.resumeFileName}
                        </p>
                    </div>

                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                            Application Status
                        </p>

                        <p className="font-semibold mt-1">
                            {application.status}
                        </p>
                    </div>

                </div>

                <div className="flex justify-end mt-8">

                    <button
                        onClick={onClose}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ApplicationDetailsModal;