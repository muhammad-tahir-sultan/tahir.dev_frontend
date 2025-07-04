import axios from "axios";
import { server } from "../../store";
import { getUser } from "../../utils/authManager";

// Create a custom axios instance with default configurations
const api = axios.create({
    baseURL: server,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to include user ID in every request
api.interceptors.request.use(
    config => {
        // Get user from localStorage
        const user = getUser();
        if (user && user._id) {
            // Add user ID to request headers
            config.headers['user-id'] = user._id;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const getAllProjects = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProjectsRequest"
        });

        const { data } = await api.get(`${server}/projects`);

        dispatch({
            type: "getAllProjectsSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getAllProjectsFail",
            payload: error.response?.data?.message || "Failed to fetch projects"
        });
    }
};

export const createProject = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "createProjectRequest"
        });

        const { data } = await api.post(`${server}/project/new`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        dispatch({
            type: "createProjectSuccess",
            payload: data
        });
        
        return {
            type: "createProjectSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "createProjectFail",
            payload: error.response?.data?.message || "Failed to create project"
        });
        throw error;
    }
};

// Alias for createProject to maintain backward compatibility
export const addProject = (formData) => async (dispatch) => {
    try {
        const result = await dispatch(createProject(formData));
        return {
            type: "addProjectSuccess",
            payload: result.payload
        };
    } catch (error) {
        throw error;
    }
};

export const updateProject = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProjectRequest"
        });

        const { data } = await api.put(`${server}/project/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        dispatch({
            type: "updateProjectSuccess",
            payload: data
        });
        
        return {
            type: "updateProjectSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "updateProjectFail",
            payload: error.response?.data?.message || "Failed to update project"
        });
        throw error;
    }
};

// Alias for updateProject to maintain backward compatibility
export const editProject = (formData, id) => async (dispatch) => {
    try {
        const result = await dispatch(updateProject(id, formData));
        return {
            type: "editProjectSuccess",
            payload: result.payload
        };
    } catch (error) {
        throw error;
    }
};

export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProjectRequest"
        });

        const { data } = await api.delete(`${server}/project/${id}`);

        dispatch({
            type: "deleteProjectSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "deleteProjectFail",
            payload: error.response?.data?.message || "Failed to delete project"
        });
    }
};

export const bulkDeleteProjects = (projectIds) => async (dispatch) => {
    try {
        dispatch({
            type: "bulkDeleteProjectsRequest"
        });

        // Make individual delete requests for each project
        const deletePromises = projectIds.map(id => 
            api.delete(`${server}/project/${id}`)
        );
        
        await Promise.all(deletePromises);

        dispatch({
            type: "bulkDeleteProjectsSuccess",
            payload: { message: "Selected projects deleted successfully" }
        });
    } catch (error) {
        dispatch({
            type: "bulkDeleteProjectsFail",
            payload: error.response?.data?.message || "Failed to delete projects"
        });
    }
};

export const getProjectDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getProjectDetailsRequest"
        });

        const { data } = await api.get(`${server}/project/${id}`);

        dispatch({
            type: "getProjectDetailsSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getProjectDetailsFail",
            payload: error.response?.data?.message || "Failed to fetch project details"
        });
    }
};