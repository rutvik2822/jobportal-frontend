import api from "../../services/api";

export const getRecruiterDashboard = () => {
    return api.get("/recruiter/dashboard");
};