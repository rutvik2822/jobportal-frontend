import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../services/api";
import toast from "react-hot-toast";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordLoading, setPasswordLoading] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const [showNewPassword, setShowNewPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const getPasswordStrength = (password) => {

    if (!password) {
        return {
            label: "",
            width: "0%"
        };
    }

    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/\d/.test(password)) score++;

    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) {
        return {
            label: "Weak",
            width: "33%"
        };
    }

    if (score <= 4) {
        return {
            label: "Medium",
            width: "66%"
        };
    }

    return {
        label: "Strong",
        width: "100%"
    };
};

const passwordStrength = getPasswordStrength(newPassword);

    const loadProfile = async () => {

        try {

            const response = await API.get("/user/profile");

            setProfile(response.data);

            setName(response.data.name || "");

        } catch (error) {

            console.error(error);

            toast.error("Failed to load profile");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="p-8">
                <h2 className="text-2xl font-semibold">
                    Loading Profile...
                </h2>
            </div>
        );

    }

    if (!profile) {

        return (
            <div className="p-8">
                <h2 className="text-2xl font-semibold">
                    Profile not found
                </h2>
            </div>
        );

    }

    return (
        <div className="p-8">

            <div className="max-w-3xl mx-auto">

                {/* HEADER */}

                <div className="mb-8 flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View your account information.
                    </p>

                </div>

               {editing ? (

    <div className="flex gap-3">

        <button
            onClick={() => {

                setEditing(false);
                setName(profile.name || "");

            }}
            className="
                border
                px-5
                py-2
                rounded-lg
                font-semibold
                hover:bg-gray-100
                transition
            "
        >
            Cancel
        </button>

        <button
    onClick={async () => {

        if (!name.trim()) {

            toast.error("Name cannot be empty");

            return;
        }

        try {

            const response = await API.put(
                "/user/profile",
                null,
                {
                    params: {
                        name: name.trim()
                    }
                }
            );

            setProfile(response.data);

            setName(response.data.name || "");

            setEditing(false);

            toast.success("Profile updated successfully");

        } catch (error) {

            console.error("Failed to update profile", error);

            toast.error("Failed to update profile");

        }

    }}
    className="
        bg-cyan-500
        hover:bg-cyan-600
        text-black
        font-semibold
        px-5
        py-2
        rounded-lg
        transition
    "
>
    Save
</button>

    </div>

) : (

    <button
        onClick={() => setEditing(true)}
        className="
            bg-cyan-500
            hover:bg-cyan-600
            text-black
            font-semibold
            px-5
            py-2
            rounded-lg
            transition
        "
    >
        Edit Profile
    </button>

)}

            </div>


                {/* PROFILE CARD */}

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    {/* AVATAR */}

                    <div className="flex items-center gap-5 mb-8">

                        <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl font-bold text-black">
                            {profile.name
                                ? profile.name.charAt(0).toUpperCase()
                                : "U"}
                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">
                                {profile.name}
                            </h2>

                            <p className="text-gray-500">
                                {profile.email}
                            </p>

                        </div>

                    </div>


                    {/* INFORMATION */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                       <div className="border rounded-xl p-5">

                        <p className="text-sm text-gray-500">
                            Full Name
                        </p>

                        {editing ? (

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    px-3
                                    py-2
                                    outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                "
                                placeholder="Enter your name"
                            />

                        ) : (

                            <p className="font-semibold text-lg mt-1">
                                {profile.name || "—"}
                            </p>

                        )}

                    </div>


                        <div className="border rounded-xl p-5">

                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold text-lg mt-1 break-all">
                                {profile.email || "—"}
                            </p>

                        </div>


                        <div className="border rounded-xl p-5">

                            <p className="text-sm text-gray-500">
                                Role
                            </p>

                            <p className="font-semibold text-lg mt-1">
                                {profile.role || "—"}
                            </p>

                        </div>


                        <div className="border rounded-xl p-5">

                            <p className="text-sm text-gray-500">
                                Company
                            </p>

                            <p className="font-semibold text-lg mt-1">
                                {profile.companyName || "Not associated"}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-8 pt-6 border-t">

                <button
                    onClick={() => setShowChangePassword(true)}
                    className="
                        bg-slate-800
                        hover:bg-slate-900
                        text-white
                        font-semibold
                        px-5
                        py-3
                        rounded-lg
                        transition
                    "
                >
                    Change Password
                </button>

                {showChangePassword && (

    <div className="mt-6 border rounded-xl p-6 bg-gray-50">

        <h3 className="text-xl font-bold mb-5">
            Change Password
        </h3>

        <div className="space-y-4">

            <div>
                <label className="block text-sm font-medium mb-1">
                    Current Password
                </label>

                <div className="relative">

    <input
        type={showCurrentPassword ? "text" : "password"}
        value={currentPassword}
        onChange={(e) =>
            setCurrentPassword(e.target.value)
        }
        className="
            w-full
            border
            rounded-lg
            px-4
            py-2
            pr-11
        "
        placeholder="Enter current password"
    />

    <button
        type="button"
        onClick={() =>
            setShowCurrentPassword(!showCurrentPassword)
        }
        className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-gray-700
        "
    >
        {showCurrentPassword
            ? <FaEyeSlash />
            : <FaEye />}
    </button>

</div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    New Password
                </label>

               <div className="relative">

    <input
        type={showNewPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) =>
            setNewPassword(e.target.value)
        }
        className="
            w-full
            border
            rounded-lg
            px-4
            py-2
            pr-11
        "
        placeholder="Enter new password"
    />

    <button
        type="button"
        onClick={() =>
            setShowNewPassword(!showNewPassword)
        }
        className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-gray-700
        "
    >
        {showNewPassword
            ? <FaEyeSlash />
            : <FaEye />}
    </button>

</div>
{newPassword && (
    <div className="mt-2">

        <div className="flex justify-between items-center mb-1">

            <span className="text-sm text-gray-500">
                Password strength
            </span>

            <span className="text-sm font-semibold">
                {passwordStrength.label}
            </span>

        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

            <div
    className={`
        h-full
        transition-all
        duration-300
        ${
            passwordStrength.label === "Weak"
                ? "bg-red-500"
                : passwordStrength.label === "Medium"
                ? "bg-yellow-400"
                : "bg-green-500"
        }
    `}
    style={{
        width: passwordStrength.width
    }}
/>

        </div>

    </div>
)}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Confirm New Password
                </label>

                <div className="relative">

    <input
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) =>
            setConfirmPassword(e.target.value)
        }
        className="
            w-full
            border
            rounded-lg
            px-4
            py-2
            pr-11
        "
        placeholder="Confirm new password"
    />

    <button
        type="button"
        onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
        }
        className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-gray-700
        "
    >
        {showConfirmPassword
            ? <FaEyeSlash />
            : <FaEye />}
    </button>

</div>
            </div>

            <div className="flex gap-3 pt-2">

                <button
                    onClick={() => setShowChangePassword(false)}
                    className="
                        border
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-gray-100
                    "
                >
                    Cancel
                </button>

                <button
    disabled={passwordLoading}
    onClick={async () => {

        if (!currentPassword || !newPassword || !confirmPassword) {

            toast.error("Please fill all password fields");

            return;
        }

        if (newPassword !== confirmPassword) {

            toast.error("New passwords do not match");

            return;
        }

        if (newPassword.length < 6) {

            toast.error(
                "New password must be at least 6 characters"
            );

            return;
        }

        try {

            setPasswordLoading(true);

            await API.post(
                "/auth/change-password",
                {
                    currentPassword,
                    newPassword,
                    confirmPassword
                }
            );

            toast.success(
                "Password changed successfully"
            );

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

            setShowChangePassword(false);

        } catch (error) {

            console.error(
                "Failed to change password",
                error
            );

            const message =
                error.response?.data?.message ||
                "Failed to change password";

            toast.error(message);

        } finally {

            setPasswordLoading(false);

        }

    }}
    className="
        bg-cyan-500
        hover:bg-cyan-600
        text-black
        font-semibold
        px-5
        py-2
        rounded-lg
        disabled:opacity-50
    "
>
    {passwordLoading
        ? "Changing..."
        : "Change Password"}
</button>

            </div>

        </div>

    </div>

)}

            </div>

            </div>

        </div>
    );
}

export default Profile;