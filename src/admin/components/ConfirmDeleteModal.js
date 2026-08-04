function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    loading = false,
}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">

                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    ⚠ {title}
                </h2>

                <p className="text-gray-600 mb-8">
                    {message}
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="border px-5 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmDeleteModal;