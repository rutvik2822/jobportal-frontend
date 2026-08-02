import API from "./api";

const COMPANY_API = "/admin/companies";

export const getCompanies = () => {
  return API.get(COMPANY_API);
};

export const createCompany = (company) => {
  return API.post(COMPANY_API, company);
};

export const updateCompany = (id, company) => {
  return API.put(`${COMPANY_API}/${id}`, company);
};

export const deleteCompany = (id) => {
  return API.delete(`${COMPANY_API}/${id}`);
};