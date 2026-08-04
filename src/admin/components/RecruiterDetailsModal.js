function RecruiterDetailsModal({ recruiter, isOpen, onClose }) {

    if (!isOpen || !recruiter) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Recruiter Details
                </h2>

                <div className="flex justify-center mb-6">

                    <div className="w-28 h-28 rounded-full bg-cyan-500 flex items-center justify-center text-white text-4xl font-bold">
                        {recruiter.name?.charAt(0).toUpperCase()}
                    </div>

                </div>

                <div className="space-y-4">

                    <div>
                        <p className="font-semibold">Recruiter ID</p>
                        <p>{recruiter.id}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Name</p>
                        <p>{recruiter.name}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Email</p>
                        <p>{recruiter.email}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Company</p>
                        <p>{recruiter.companyName}</p>
                    </div>

                </div>

                <div className="flex justify-end mt-8">

                    <button
                        onClick={onClose}
                        className="bg-cyan-500 text-white px-5 py-2 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default RecruiterDetailsModal;