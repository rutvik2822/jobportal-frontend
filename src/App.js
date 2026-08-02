import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import RecruiterDashboard from "./pages/RecruiterDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

function App() {

  return (

    <BrowserRouter>
    <>
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

  {/* ADMIN */}

  <Route
    path="/admin"
    element={

      <ProtectedRoute role="SUPER_ADMIN">

        <AdminDashboard />

      </ProtectedRoute>
    }
  />

  <Route
  path="/recruiter"
  element={
    <ProtectedRoute role="RECRUITER">
      <RecruiterDashboard />
    </ProtectedRoute>
  }
/>

</Routes>
      <ToastContainer position="top-right" />
      </>
    </BrowserRouter>
  );
}

export default App;