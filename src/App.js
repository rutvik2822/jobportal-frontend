import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Home from "./pages/Home";
import AdminDashboard from "./admin/pages/Dashboard";

import Companies from "./admin/pages/Companies";
import Recruiters from "./admin/pages/Recruiters";
import Jobs from "./admin/pages/Jobs";
import Applications from "./admin/pages/Applications";
import AdminLayout from "./admin/AdminLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* USER */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* RECRUITER */}

        <Route
          path="/recruiter"
          element={
            <ProtectedRoute role="RECRUITER">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        {/* SUPER ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="SUPER_ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="companies" element={<Companies />} />

          <Route path="recruiters" element={<Recruiters />} />

          <Route path="jobs" element={<Jobs />} />

          <Route path="applications" element={<Applications />} />

        </Route>

      </Routes>

      <ToastContainer position="top-right" />

    </BrowserRouter>
  );
}

export default App;