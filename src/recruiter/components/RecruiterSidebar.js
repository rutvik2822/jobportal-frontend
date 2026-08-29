import { NavLink } from "react-router-dom";

function RecruiterSidebar() {

    const linkClass = ({ isActive }) =>
        `block px-4 py-3 rounded-lg transition ${
            isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-slate-700"
        }`;

    return (

        <div className="w-64 min-h-screen bg-slate-900 text-white p-5">

            <h1 className="text-3xl font-bold mb-10">
                AI Job Portal
            </h1>

            <nav className="space-y-2">

                <NavLink
                    to="/recruiter/dashboard"
                    className={linkClass}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/recruiter/jobs"
                    className={linkClass}
                >
                    My Jobs
                </NavLink>

                <NavLink
                    to="/recruiter/applications"
                    className={linkClass}
                >
                    Applications
                </NavLink>

                <NavLink
                    to="/recruiter/profile"
                    className={linkClass}
                >
                    Profile
                </NavLink>

            </nav>

        </div>

    );

}

export default RecruiterSidebar;