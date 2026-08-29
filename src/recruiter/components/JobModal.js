import { useEffect, useState } from "react";
import { createJob, updateJob } from "../services/jobService";
import toast from "react-hot-toast";

function JobModal({
    isOpen,
    onClose,
    onSuccess,
    job,
    mode = "add",
}) {

    const [form, setForm] = useState({
        title: "",
        description: "",
        skillsRequired: "",
        location: "",
        salary: "",
        jobType: "",
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        if (mode === "edit" && job) {

            setForm({
                title: job.title || "",
                description: job.description || "",
                skillsRequired: job.skillsRequired || "",
                location: job.location || "",
                salary: job.salary || "",
                jobType: job.jobType || "",
            });

        } else {

            resetForm();

        }

    }, [job, mode, isOpen]);

    const resetForm = () => {

        setForm({
            title: "",
            description: "",
            skillsRequired: "",
            location: "",
            salary: "",
            jobType: "",
        });

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async () => {

        if (
            !form.title.trim() ||
            !form.description.trim() ||
            !form.skillsRequired.trim() ||
            !form.location.trim() ||
            !form.salary.trim() ||
            !form.jobType.trim()
        ) {

            toast.error("Please fill all fields");

            return;
        }

        try {

            setSubmitting(true);

            if (mode === "add") {

                await createJob(form);

                toast.success("Job created successfully");

            } else {

                await updateJob(job.id, form);

                toast.success("Job updated successfully");

            }

            resetForm();

            onSuccess();

            onClose();

        } catch (error) {

            console.error("Job operation failed:", error);

            if (error.response?.data) {

                console.error(
                    "Backend response:",
                    error.response.data
                );

            }

            toast.error(
                mode === "add"
                    ? "Failed to create job"
                    : "Failed to update job"
            );

        } finally {

            setSubmitting(false);

        }

    };

    const handleClose = () => {

        if (submitting) return;

        resetForm();

        onClose();

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">

                <h2 className="text-2xl font-bold mb-6">

                    {mode === "add"
                        ? "Add Job"
                        : "Edit Job"}

                </h2>

                {/* Job Title */}

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full border rounded-lg p-3 mb-4"
                />

                {/* Description */}

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Job Description"
                    rows="5"
                    className="w-full border rounded-lg p-3 mb-4 resize-none"
                />

                {/* Skills */}

                <input
                    name="skillsRequired"
                    value={form.skillsRequired}
                    onChange={handleChange}
                    placeholder="Skills Required (e.g. Java, Spring Boot, SQL)"
                    className="w-full border rounded-lg p-3 mb-4"
                />

                {/* Location */}

                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border rounded-lg p-3 mb-4"
                />

                {/* Salary */}

                <input
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="Salary (e.g. 12 LPA)"
                    className="w-full border rounded-lg p-3 mb-4"
                />

                {/* Job Type */}

                <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mb-6"
                >

                    <option value="">
                        Select Job Type
                    </option>

                    <option value="Full Time">
                        Full Time
                    </option>

                    <option value="Part Time">
                        Part Time
                    </option>

                    <option value="Internship">
                        Internship
                    </option>

                    <option value="Contract">
                        Contract
                    </option>

                </select>

                {/* Buttons */}

                <div className="flex justify-end gap-3">

                    <button
                        onClick={handleClose}
                        disabled={submitting}
                        className="px-5 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg"
                    >
                        {submitting
                            ? "Saving..."
                            : mode === "add"
                                ? "Create"
                                : "Update"}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default JobModal;