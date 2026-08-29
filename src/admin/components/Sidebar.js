import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        AI Job Portal
      </div>

      <nav className="p-4 space-y-2">

                    <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block p-3 rounded ${
                  isActive ? "bg-cyan-500 text-black" : "hover:bg-slate-700"
                }`
              }
            >
            Dashboard
            </NavLink>

                <NavLink
            to="/admin/companies"
            className={({ isActive }) =>
                `block p-3 rounded ${
                isActive ? "bg-cyan-500 text-black" : "hover:bg-slate-700"
                }`
            }
            >
            Companies
            </NavLink>

            <NavLink
            to="/admin/recruiters"
            className={({ isActive }) =>
                `block p-3 rounded ${
                isActive ? "bg-cyan-500 text-black" : "hover:bg-slate-700"
                }`
            }
            >
            Recruiters
            </NavLink>

            <NavLink
            to="/admin/jobs"
            className={({ isActive }) =>
                `block p-3 rounded ${
                isActive ? "bg-cyan-500 text-black" : "hover:bg-slate-700"
                }`
            }
            >
            Jobs
            </NavLink>

            <NavLink
            to="/admin/applications"
            className={({ isActive }) =>
                `block p-3 rounded ${
                isActive ? "bg-cyan-500 text-black" : "hover:bg-slate-700"
                }`
            }
            >
            Applications
            </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;