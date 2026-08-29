import api from "./api";

export const getAllAdminApplications = () => {
    return api.get("/admin/applications");
};