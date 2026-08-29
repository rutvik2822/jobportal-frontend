import { jwtDecode } from "jwt-decode";

function RecruiterHeader() {

    const token = localStorage.getItem("token");

    let role = "RECRUITER";

    if (token) {

        try {

            const decoded = jwtDecode(token);

            role = decoded.role || "RECRUITER";

        } catch (error) {

            console.error("Invalid token");

        }

    }

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };

    return (

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <h2 className="text-3xl font-bold">
                Recruiter Panel
            </h2>

            <div className="flex items-center gap-5">

                <span className="font-semibold text-slate-600">
                    {role}
                </span>

                <button
                    onClick={handleLogout}
                    className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        font-semibold
                        transition
                    "
                >
                    Logout
                </button>

            </div>

        </header>

    );

}

export default RecruiterHeader;