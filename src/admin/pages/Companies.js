import { useEffect, useState } from "react";
import { getCompanies, deleteCompany } from "../../services/companyService";
import CompanyModal from "../components/CompanyModal";
import CompanyDetailsModal from "../components/CompanyDetailsModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import toast from "react-hot-toast";

function Companies() {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {

    if (!companyToDelete) return;

    try {

        setDeleteLoading(true);

        await deleteCompany(companyToDelete.id);

        toast.success("Company deleted successfully");

        setDeleteModalOpen(false);

        setCompanyToDelete(null);

        loadCompanies();

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data ||
            "Failed to delete company"
        );

    } finally {

        setDeleteLoading(false);

    }

};
  if (loading) {
    return (
      <h2 className="text-2xl font-semibold">
        Loading companies...
      </h2>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Companies
        </h1>

        <button
            onClick={() => {
                setModalMode("add");
                setSelectedCompany(null);
                setShowModal(true);
            }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl"
            >
            + Add Company
            </button>

      </div>

      {companies.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <h2 className="text-2xl font-semibold mb-2">
            No Companies Found
          </h2>

          <p className="text-gray-500">
            Create your first company.
          </p>

        </div>

      ) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">Company</th>

                <th className="p-4 text-left">Website</th>

                <th className="p-4 text-left">Location</th>

                <th className="p-4 text-left">Actions</th>

              </tr>

            </thead>

            <tbody>

              {companies.map((company) => (

                <tr
                  key={company.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {company.companyName}
                  </td>

                  <td className="p-4">
                    {company.website}
                  </td>

                  <td className="p-4">
                    {company.location}
                  </td>

                  <td className="p-4">

                    <button
                        className="text-green-600 mr-3"
                        onClick={() => {
                            setSelectedCompany(company);
                            setDetailsOpen(true);
                        }}
                    >
                        View
                    </button>
                    <button
                        className="text-blue-600 mr-4"
                        onClick={() => {
                            setModalMode("edit");
                            setSelectedCompany(company);
                            setShowModal(true);
                        }}
                    >
                        Edit
                    </button>

                    <button
                        className="text-red-600"
                        onClick={() => {
                            setCompanyToDelete(company);
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

      <CompanyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadCompanies}
        company={selectedCompany}
        mode={modalMode}
    />  

    <CompanyDetailsModal
    company={selectedCompany}
    isOpen={detailsOpen}
    onClose={() => {
        setDetailsOpen(false);
        setSelectedCompany(null);
    }}
    />

<ConfirmDeleteModal
    isOpen={deleteModalOpen}
    loading={deleteLoading}
    title="Delete Company"
    message={
        companyToDelete
            ? `Are you sure you want to delete "${companyToDelete.companyName}"? This action cannot be undone.`
            : ""
    }
    onClose={() => {

        setDeleteModalOpen(false);

        setCompanyToDelete(null);

    }}
    onConfirm={handleDelete}
/>
    </div>
  );
}

export default Companies;