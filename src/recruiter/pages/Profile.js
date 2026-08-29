import { useEffect, useState } from "react";
import { getRecruiterProfile } from "../services/profileService";
import toast from "react-hot-toast";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getRecruiterProfile();
            setProfile(response.data);
        } catch (error) {
            console.error("Failed to load recruiter profile", error);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <h2 className="text-2xl font-semibold">
                Loading profile...
            </h2>
        );
    }

    if (!profile) {
        return (
            <div className="bg-white rounded-xl shadow p-8">
                <h2 className="text-2xl font-bold">
                    Profile not found
                </h2>
            </div>
        );
    }

    return (
        <div>

            <h1 className="text-4xl font-bold mb-8">
                Recruiter Profile
            </h1>

            <div className="bg-white rounded-xl shadow p-8 max-w-3xl">

                {/* Profile Header */}

                <div className="flex items-center gap-5 mb-8">

                    <div className="w-20 h-20 rounded-full bg-cyan-500 text-white flex items-center justify-center text-3xl font-bold">
                        {profile.name?.trim().charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">
                            {profile.name?.trim()}
                        </h2>

                        <p className="text-gray-500">
                            {profile.role}
                        </p>

                    </div>

                </div>

                {/* Profile Information */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="border rounded-xl p-5">

                        <p className="text-sm text-gray-500 mb-1">
                            Full Name
                        </p>

                        <p className="text-lg font-semibold">
                            {profile.name?.trim()}
                        </p>

                    </div>

                    <div className="border rounded-xl p-5">

                        <p className="text-sm text-gray-500 mb-1">
                            Email
                        </p>

                        <p className="text-lg font-semibold break-all">
                            {profile.email}
                        </p>

                    </div>

                    <div className="border rounded-xl p-5">

                        <p className="text-sm text-gray-500 mb-1">
                            Company
                        </p>

                        <p className="text-lg font-semibold">
                            {profile.companyName}
                        </p>

                    </div>

                    <div className="border rounded-xl p-5">

                        <p className="text-sm text-gray-500 mb-1">
                            Role
                        </p>

                        <p className="text-lg font-semibold">
                            {profile.role}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;