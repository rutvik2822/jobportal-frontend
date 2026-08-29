function JobDetailsModal({ job, isOpen, onClose }) {

    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">

                <h2 className="text-3xl font-bold mb-2">
                    {job.title}
                </h2>

                <p className="text-gray-500 mb-8">
                    {job.companyName}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div className="border rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                            Company
                        </p>
                        <p className="font-semibold">
                            {job.companyName}
                        </p>
                    </div>

                    <div className="border rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                            Recruiter
                        </p>
                        <p className="font-semibold">
                            {job.recruiterName}
                        </p>
                    </div>

                    <div className="border rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                            Location
                        </p>
                        <p className="font-semibold">
                            {job.location}
                        </p>
                    </div>

                    <div className="border rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                            Salary
                        </p>
                        <p className="font-semibold">
                            {job.salary}
                        </p>
                    </div>

                    <div className="border rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                            Job Type
                        </p>
                        <p className="font-semibold">
                            {job.jobType}
                        </p>
                    </div>

                    <div className="border rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                            Skills Required
                        </p>
                        <p className="font-semibold">
                            {job.skillsRequired}
                        </p>
                    </div>

                </div>

                <div className="border rounded-xl p-5 mt-5">

                    <p className="text-sm text-gray-500 mb-2">
                        Description
                    </p>

                    <p className="leading-relaxed">
                        {job.description}
                    </p>

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

export default JobDetailsModal;