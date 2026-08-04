import API from "./api";

export const getRecruiters = () => {
    return API.get("/admin/recruiters");
};

export const getRecruiterById = (id) => {
    return API.get(`/admin/recruiters/${id}`);
};

export const createRecruiter = (data) => {
    return API.post("/admin/recruiters", data);
};

export const updateRecruiter = (id, data) => {
    return API.put(`/admin/recruiters/${id}`, data);
};

export const deleteRecruiter = (id) => {
    return API.delete(`/admin/recruiters/${id}`);
};