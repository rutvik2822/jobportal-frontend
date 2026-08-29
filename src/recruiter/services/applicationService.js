import api from "../../services/api";

export const getRecruiterApplications = () => {
    return api.get("/recruiter/applications");
};

export const updateApplicationStatus = (id, status) => {
    return api.put(`/recruiter/applications/${id}/status`, {
        status: status,
    });
};