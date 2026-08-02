import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;