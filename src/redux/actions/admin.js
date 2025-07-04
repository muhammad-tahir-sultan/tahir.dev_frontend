import axios from "axios"
import { server } from "../../store"
import { getUser } from "../../utils/authManager"

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

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUsersRequest"
        })

        const { data } = await api.get(`/admin/users`)

        dispatch({
            type: "getAllUsersSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getAllUsersFail",
            payload: error.response?.data?.message || "Failed to fetch users"
        })
    }
}

export const updateUserRole = (id, role) => async (dispatch) => {
    try {
        dispatch({
            type: "updateUserRoleRequest"
        })

        const { data } = await api.put(`/admin/user/${id}`, { role })

        dispatch({
            type: "updateUserRoleSuccess",
            payload: data
        })
        
        return {
            type: "updateUserRoleSuccess",
            payload: data
        }
    } catch (error) {
        dispatch({
            type: "updateUserRoleFail",
            payload: error.response?.data?.message || "Failed to update user role"
        })
        throw error
    }
}

// Alias for updateUserRole to maintain backward compatibility
export const updateRole = (id, role) => async (dispatch) => {
    try {
        const result = await dispatch(updateUserRole(id, role))
        return {
            type: "updateProfileSuccess",
            payload: result.payload
        }
    } catch (error) {
        throw error
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getUserDetailsRequest"
        })

        const { data } = await api.get(`/admin/user/${id}`)

        dispatch({
            type: "getUserDetailsSuccess",
            payload: data
        })
        
        return data
    } catch (error) {
        dispatch({
            type: "getUserDetailsFail",
            payload: error.response?.data?.message || "Failed to fetch user details"
        })
        throw error
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteUserRequest"
        })

        const { data } = await api.delete(`/admin/user/${id}`)

        dispatch({
            type: "deleteUserSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "deleteUserFail",
            payload: error.response?.data?.message || "Failed to delete user"
        })
    }
}

// Alias for deleteUser to maintain backward compatibility
export const deleteUserProfile = (id) => async (dispatch) => {
    return dispatch(deleteUser(id));
}

export const bulkDeleteUsers = (userIds) => async (dispatch) => {
    try {
        dispatch({
            type: "bulkDeleteUsersRequest"
        })

        // Make individual delete requests for each user
        const deletePromises = userIds.map(id => 
            api.delete(`/admin/user/${id}`)
        )
        
        await Promise.all(deletePromises)

        dispatch({
            type: "bulkDeleteUsersSuccess",
            payload: { message: "Selected users deleted successfully" }
        })
    } catch (error) {
        dispatch({
            type: "bulkDeleteUsersFail",
            payload: error.response?.data?.message || "Failed to delete users"
        })
    }
}





