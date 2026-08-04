import { useEffect, useState } from "react";
import {
    createRecruiter,
    updateRecruiter,
} from "../../services/recruiterService";
import { getCompanies } from "../../services/companyService";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RecruiterModal({
    isOpen,
    onClose,
    onSuccess,
    recruiter,
    mode,
}) {

    const [companies, setCompanies] = useState([]);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordStrength, setPasswordStrength] = useState("");

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        companyId: "",
    });

    useEffect(() => {

        if (isOpen) {
            loadCompanies();
        }

    }, [isOpen]);

    useEffect(() => {

        if (mode === "edit" && recruiter) {

            setForm({
                name: recruiter.name,
                email: recruiter.email,
                password: "",
                companyId: recruiter.companyId || "",
            });

        } else {

            resetForm();

        }

    }, [recruiter, mode]);

    const resetForm = () => {

        setForm({
            name: "",
            email: "",
            password: "",
            companyId: "",
        });

        setConfirmPassword("");

        setPasswordStrength("");

        setShowPassword(false);

        setShowConfirmPassword(false);

        setLoading(false);

    };

    const checkPasswordStrength = (password) => {

        if (!password) {
            setPasswordStrength("");
            return;
        }

        if (password.length < 8) {
            setPasswordStrength("Weak");
        }

        else if (
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        ) {
            setPasswordStrength("Strong");
        }

        else {
            setPasswordStrength("Medium");
        }

    };

    const loadCompanies = async () => {

        try {

            const res = await getCompanies();

            const sortedCompanies = [...res.data].sort((a, b) =>
                a.companyName.localeCompare(b.companyName)
            );

            setCompanies(sortedCompanies);

        }

        catch (err) {

            console.error(err);

            toast.error("Failed to load companies");

        }

    };

    const handleSubmit = async () => {

        if (
            mode === "add" &&
            form.password !== confirmPassword
        ) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            setLoading(true);

            if (mode === "add") {

                await createRecruiter(form);

                toast.success("Recruiter created successfully");

            }

            else {

                await updateRecruiter(
                    recruiter.id,
                    form
                );

                toast.success("Recruiter updated successfully");

            }

            resetForm();

            onSuccess();

            onClose();

        }

        catch (err) {

            console.error(err);

            toast.error(
                err.response?.data?.message ||
                err.response?.data ||
                "Operation failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleClose = () => {

        resetForm();

        onClose();

    };

    if (!isOpen) return null;
    return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

        <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-xl">

            <h2 className="text-2xl font-bold mb-6">

                {mode === "add"
                    ? "Add Recruiter"
                    : "Edit Recruiter"}

            </h2>

            <input
                className="w-full border rounded-lg p-3 mb-4"
                placeholder="Recruiter Name"
                value={form.name}
                onChange={(e) =>
                    setForm({
                        ...form,
                        name: e.target.value,
                    })
                }
            />

            <input
                className="w-full border rounded-lg p-3 mb-4"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({
                        ...form,
                        email: e.target.value,
                    })
                }
            />

            {/* Password */}

            <div className="relative mb-2">

                <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded-lg p-3 pr-12"
                    placeholder={
                        mode === "add"
                            ? "Password"
                            : "New Password (optional)"
                    }
                    value={form.password}
                    onChange={(e) => {

                        setForm({
                            ...form,
                            password: e.target.value,
                        });

                        checkPasswordStrength(e.target.value);

                    }}
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {showPassword
                        ? <FaEyeSlash />
                        : <FaEye />}
                </button>

            </div>

            {form.password && (

                <p
                    className={`text-sm mb-4 font-medium ${
                        passwordStrength === "Weak"
                            ? "text-red-500"
                            : passwordStrength === "Medium"
                            ? "text-yellow-500"
                            : "text-green-600"
                    }`}
                >
                    Password Strength: {passwordStrength}
                </p>

            )}

            {/* Confirm Password */}

            {mode === "add" && (

                <div className="relative mb-4">

                    <input
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        className="w-full border rounded-lg p-3 pr-12"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showConfirmPassword
                            ? <FaEyeSlash />
                            : <FaEye />}
                    </button>

                </div>

            )}

            {/* Company */}

            <select
                className="w-full border rounded-lg p-3 mb-6"
                value={form.companyId}
                onChange={(e) =>
                    setForm({
                        ...form,
                        companyId: e.target.value,
                    })
                }
            >

                <option value="">
                    Select Company
                </option>

                {companies.map((company) => (

                    <option
                        key={company.id}
                        value={company.id}
                    >
                        {company.companyName}
                    </option>

                ))}

            </select>

            <div className="flex justify-end gap-3">

                <button
                    onClick={handleClose}
                    disabled={loading}
                    className="px-5 py-2 border rounded-lg disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                    {loading
                        ? mode === "add"
                            ? "Creating..."
                            : "Updating..."
                        : mode === "add"
                            ? "Create"
                            : "Update"}
                </button>

            </div>

        </div>

    </div>
);

}

export default RecruiterModal;