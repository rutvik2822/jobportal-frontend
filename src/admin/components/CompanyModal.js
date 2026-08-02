import { useEffect, useState } from "react";
import { createCompany, updateCompany } from "../../services/companyService";
import toast from "react-hot-toast";

function CompanyModal({ isOpen, onClose, onSuccess, company, mode }) {

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    location: "",
    description: "",
  });
  useEffect(() => {

    if (mode === "edit" && company) {

        setForm({
            companyName: company.companyName,
            website: company.website,
            location: company.location,
            description: company.description
        });

    } else {

        setForm({
            companyName: "",
            website: "",
            location: "",
            description: ""
        });

    }

}, [company, mode, isOpen]);

  const handleSave = async () => {

    try {

        if (mode === "add") {

            await createCompany(form);

            toast.success("Company created successfully");

        } else {

            await updateCompany(company.id, form);

            toast.success("Company updated successfully");

        }

        onSuccess();
        onClose();

    } catch (error) {

        console.error(error);

        toast.error("Operation failed");

    }

};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
            {mode === "add" ? "Add Company" : "Edit Company"}
        </h2>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Company Name"
          value={form.companyName}
          onChange={(e) =>
            setForm({ ...form, companyName: e.target.value })
          }
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Website"
          value={form.website}
          onChange={(e) =>
            setForm({ ...form, website: e.target.value })
          }
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <textarea
          className="w-full border rounded-lg p-3 mb-6"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-cyan-500 text-white px-5 py-2 rounded-lg"
        >
            Save
        </button>

        </div>

      </div>

    </div>
  );
}

export default CompanyModal;