import { useEffect, useState } from "react";
import { getRecruiterProfile } from "../services/profileService";
import { getRecruiterDashboard } from "../services/dashboardService";
import toast from "react-hot-toast";

function Dashboard() {

    const [profile, setProfile] = useState(null);

    const [stats, setStats] = useState({
        totalJobs: 0,
        totalApplications: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const [profileResponse, dashboardResponse] =
                await Promise.all([
                    getRecruiterProfile(),
                    getRecruiterDashboard(),
                ]);

            setProfile(profileResponse.data);

            setStats(dashboardResponse.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load dashboard");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <h2 className="text-2xl font-semibold">
                Loading Dashboard...
            </h2>
        );

    }

    return (

        <div>

            {/* Welcome Section */}

            <div className="bg-white rounded-xl shadow p-8 mb-8">

                <h1 className="text-4xl font-bold mb-2">
                    Welcome, {profile?.name} 
                </h1>

                <p className="text-gray-600">
                    {profile?.email}
                </p>

                <p className="text-lg mt-2">

                    <span className="font-semibold">
                        Company:
                    </span>{" "}

                    {profile?.companyName}

                </p>

                <p>

                    <span className="font-semibold">
                        Role:
                    </span>{" "}

                    {profile?.role}

                </p>

            </div>


            {/* Dashboard Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                {/* Jobs Posted */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Jobs Posted
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {stats.totalJobs}
                    </p>

                </div>


                {/* Applications */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Applications
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {stats.totalApplications}
                    </p>

                </div>


                {/* Pending */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Pending
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {stats.pending}
                    </p>

                </div>


                {/* Selected */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Selected
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {stats.accepted}
                    </p>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;