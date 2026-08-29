import api from "../../services/api";

export const getRecruiterProfile = () => {
    return api.get("/recruiter/profile");
};