import axios from "axios";

const REST_API_BASE_URL="http://localhost:8080/api/employees";

export const listEmployees=()=>{
    return axios.get(REST_API_BASE_URL)
}

export const createEmployee=(employee)=>{
    return axios.post(REST_API_BASE_URL,employee);
}

export const getEmployee=(empId)=>{
    return axios.get(REST_API_BASE_URL+'/'+empId);
}

export const updateEmployee=(empId,employee)=>{
    return axios.put(REST_API_BASE_URL+'/'+empId,employee);
}

export const deleteEmployee=(empId)=>{
    return axios.delete(REST_API_BASE_URL+'/'+empId);
}