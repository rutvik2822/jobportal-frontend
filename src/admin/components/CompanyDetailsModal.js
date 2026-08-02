function CompanyDetailsModal({ company, isOpen, onClose }) {

    if (!isOpen || !company) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Company Details
                </h2>

                <div className="flex justify-center mb-6">

                    {company.logoUrl ? (

                        <img
                            src={company.logoUrl}
                            alt={company.companyName}
                            className="w-28 h-28 object-contain rounded-xl border p-2"
                        />

                    ) : (

                        <div className="w-28 h-28 rounded-xl border flex items-center justify-center text-gray-400">
                            No Logo
                        </div>

                    )}

                </div>

                <div className="space-y-4">

                    <div>
                        <p className="font-semibold">Company Name</p>
                        <p>{company.companyName}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Website</p>
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {company.website}
                        </a>
                    </div>

                    <div>
                        <p className="font-semibold">Location</p>
                        <p>{company.location}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Description</p>
                        <p>{company.description}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Created On</p>
                        <p>
                            {new Date(company.createdAt).toLocaleString()}
                        </p>
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

export default CompanyDetailsModal;