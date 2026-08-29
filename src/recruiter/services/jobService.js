import api from "../../services/api";

export const getMyJobs = () => {
    return api.get("/recruiter/jobs");
};

export const createJob = (jobData) => {
    return api.post("/recruiter/jobs", jobData);
};

export const updateJob = (id, jobData) => {
    return api.put(`/recruiter/jobs/${id}`, jobData);
};

export const deleteJob = (id) => {
    return api.delete(`/recruiter/jobs/${id}`);
};