import api from "./api";

export const getAllAdminJobs = () => {
    return api.get("/admin/jobs");
};