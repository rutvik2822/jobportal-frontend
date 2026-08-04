import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getRecruiters,
    deleteRecruiter
} from "../../services/recruiterService";

import RecruiterModal from "../components/RecruiterModal";
import RecruiterDetailsModal from "../components/RecruiterDetailsModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function Recruiters() {

  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recruiterToDelete, setRecruiterToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  useEffect(() => {
    loadRecruiters();
  }, []);

  const loadRecruiters = async () => {
    try {
      const response = await getRecruiters();
      setRecruiters(response.data);
    } catch (error) {
      console.error("Failed to fetch recruiters", error);
      toast.error("Failed to load recruiters");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {

    if (!recruiterToDelete) return;

    try {

        setDeleteLoading(true);

        await deleteRecruiter(recruiterToDelete.id);

        toast.success("Recruiter deleted successfully");

        setDeleteModalOpen(false);

        setRecruiterToDelete(null);

        loadRecruiters();

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data ||
            "Failed to delete recruiter"
        );

    } finally {

        setDeleteLoading(false);

    }

};

  if (loading) {
    return (
      <h2 className="text-2xl font-semibold">
        Loading recruiters...
      </h2>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Recruiters
        </h1>

        <button
          onClick={() => {

          setModalMode("add");

          setSelectedRecruiter(null);

          setShowModal(true);}}

          className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Recruiter
        </button>

      </div>

      {recruiters.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <h2 className="text-2xl font-semibold mb-2">
            No Recruiters Found
          </h2>

          <p className="text-gray-500">
            Create your first recruiter.
          </p>

        </div>

      ) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Company</th>

                <th className="p-4 text-left">Actions</th>

              </tr>

            </thead>

            <tbody>

              {recruiters.map((recruiter) => (

                <tr
                  key={recruiter.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {recruiter.name}
                  </td>

                  <td className="p-4">
                    {recruiter.email}
                  </td>

                  <td className="p-4">
                    {recruiter.companyName}
                  </td>

                  <td className="p-4">

                    <button
                      className="text-green-600 mr-3"
                      onClick={() => {
                          setSelectedRecruiter(recruiter);
                          setDetailsOpen(true);
                      }}
                    >
                      View
                    </button>

                    <button
                      className="text-blue-600 mr-4"
                      onClick={() => {

                          setModalMode("edit");

                          setSelectedRecruiter(recruiter);

                          setShowModal(true);

                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => {

                        setRecruiterToDelete(recruiter);

                        setDeleteModalOpen(true);

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

    <RecruiterModal

    isOpen={showModal}

    onClose={() => setShowModal(false)}

    onSuccess={loadRecruiters}

    recruiter={selectedRecruiter}

    mode={modalMode}

/>

<RecruiterDetailsModal
    recruiter={selectedRecruiter}
    isOpen={detailsOpen}
    onClose={() => {
        setDetailsOpen(false);
        setSelectedRecruiter(null);
    }}
/>

<ConfirmDeleteModal
    isOpen={deleteModalOpen}
    loading={deleteLoading}
    title="Delete Recruiter"
    message={
        recruiterToDelete
            ? `Are you sure you want to delete "${recruiterToDelete.name}"? This action cannot be undone.`
            : ""
    }
    onClose={() => {

        setDeleteModalOpen(false);

        setRecruiterToDelete(null);

    }}
    onConfirm={handleDelete}
/>
    </div>
  );
}

export default Recruiters;