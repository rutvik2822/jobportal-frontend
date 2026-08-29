function JobDetailsModal({ job, isOpen, onClose, onApply }) {

    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

            <div className="bg-white text-black rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="p-7 border-b">

                    <div className="flex justify-between items-start gap-4">

                        <div>

                            <h2 className="text-3xl font-bold text-cyan-600">
                                {job.title}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {job.companyName || "Company not specified"}
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black text-2xl"
                        >
                            ×
                        </button>

                    </div>

                </div>


                {/* Details */}

                <div className="p-7 space-y-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="border rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                                Location
                            </p>

                            <p className="font-semibold mt-1">
                                {job.location || "—"}
                            </p>

                        </div>


                        <div className="border rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                                Salary
                            </p>

                            <p className="font-semibold mt-1">
                                {job.salary || "—"}
                            </p>

                        </div>


                        <div className="border rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                                Job Type
                            </p>

                            <p className="font-semibold mt-1">
                                {job.jobType || "—"}
                            </p>

                        </div>


                        <div className="border rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                                Recruiter
                            </p>

                            <p className="font-semibold mt-1">
                                {job.recruiterName || "—"}
                            </p>

                        </div>

                    </div>


                    {/* Skills */}

                    <div className="border rounded-xl p-5">

                        <p className="text-sm text-gray-500 mb-3">
                            Required Skills
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {job.skillsRequired
                                ?.split(",")
                                .map((skill, index) => (

                                    <span
                                        key={index}
                                        className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {skill.trim()}
                                    </span>

                                ))}

                        </div>

                    </div>


                    {/* Description */}

                    <div className="border rounded-xl p-5">

                        <p className="text-sm text-gray-500 mb-2">
                            Job Description
                        </p>

                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {job.description || "No description available."}
                        </p>

                    </div>

                </div>


                {/* Footer */}

                <div className="p-7 border-t flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 border rounded-xl hover:bg-gray-100"
                    >
                        Close
                    </button>

                    {onApply && (
                        <button
                            onClick={() => {
                                onApply(job);
                                onClose();
                            }}
                            className="px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl"
                        >
                            Apply Now
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default JobDetailsModal;