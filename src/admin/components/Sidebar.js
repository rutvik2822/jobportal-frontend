function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        AI Job Portal
      </div>

      <nav className="p-4 space-y-2">

        <button className="w-full text-left p-3 rounded hover:bg-slate-700">
          Dashboard
        </button>

        <button className="w-full text-left p-3 rounded hover:bg-slate-700">
          Companies
        </button>

        <button className="w-full text-left p-3 rounded hover:bg-slate-700">
          Recruiters
        </button>

        <button className="w-full text-left p-3 rounded hover:bg-slate-700">
          Jobs
        </button>

        <button className="w-full text-left p-3 rounded hover:bg-slate-700">
          Applications
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;