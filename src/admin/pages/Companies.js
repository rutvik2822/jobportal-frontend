import { useEffect, useState } from "react";
import { getCompanies } from "../../services/companyService";
import CompanyModal from "../components/CompanyModal";

function Companies() {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);
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
                        className="text-blue-600 mr-4"
                        onClick={() => {
                            setModalMode("edit");
                            setSelectedCompany(company);
                            setShowModal(true);
                        }}
                    >
                        Edit
                    </button>

                    <button className="text-red-600">
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

    </div>
  );
}

export default Companies;