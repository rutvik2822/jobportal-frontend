import { jwtDecode } from "jwt-decode";

function Header() {

  const token = localStorage.getItem("token");

  let role = "";

  if (token) {

    try {

      const decoded = jwtDecode(token);

      role = decoded.role || "";

    } catch (error) {

      console.error("Invalid token");

    }

  }

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  return (

    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        {role === "RECRUITER"
          ? "Recruiter Panel"
          : "Admin Panel"}
      </h1>

      <div className="flex items-center gap-4">

        <span className="text-gray-500">
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

export default Header;