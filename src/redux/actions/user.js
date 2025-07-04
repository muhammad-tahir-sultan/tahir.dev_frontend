import axios from "axios"
import { server } from "../../store"
import { saveUser, getUser, clearAuth } from '../../utils/authManager'

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

export const loadUser = () => async (dispatch) => {
    try {
        // Don't try to load user if there's no user data in localStorage
        const user = getUser();
        if (!user) {
            console.log("No user data found, aborting loadUser");
            dispatch({
                type: "loadUserFail",
                payload: "No authentication data",
            });
            return null;
        }
        
        dispatch({
            type: "loadUserRequest",
        });
        
        // If we have user data in localStorage, try to get fresh data from server
        try {
            const { data } = await api.get(`/user/profile`);
            
            // Update user data in localStorage
            if (data.user) {
                saveUser(data.user);
            }
            
            dispatch({
                type: "loadUserSuccess",
                payload: data
            });
            
            return data;
        } catch (err) {
            console.log("Error fetching user profile, using localStorage data");
            
            dispatch({
                type: "loadUserSuccess",
                payload: { user }
            });
            
            return { user };
        }
    } catch (error) {
        console.error("Error loading user:", error);
        
        dispatch({
            type: "loadUserFail",
            payload: error.response?.data?.message || "Failed to load user data",
        });
        
        return null;
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginUserRequest"
        });
        
        const { data } = await api.post(`${server}/user/login`, { email, password });
        
        // Save user data if available
        if (data.user) {
            saveUser(data.user);
        }

        dispatch({
            type: "loginUserSuccess",
            payload: data
        });
        
        return { type: "loginUserSuccess", payload: data };
    } catch (error) {
        dispatch({
            type: "loginUserFail",
            payload: error.response?.data?.message || "Login failed"
        });
        throw error;
    }
};

export const registerUser = (formData) => async (dispatch) => {
    try {
        console.log("Starting registration with formData");
        dispatch({
            type: "registerUserRequest"
        });

        // For multipart/form-data, we need to set the header specifically
        const { data } = await api.post(`${server}/user/register`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("Registration response:", data);
        
        // Save user data if available
        if (data.user) {
            saveUser(data.user);
        }
        
        dispatch({
            type: "registerUserSuccess",
            payload: data
        });
        
        return { type: "registerUserSuccess", payload: data };
    } catch (error) {
        console.error("Registration error:", error);
        dispatch({
            type: "registerUserFail",
            payload: error.response?.data?.message || "Registration failed"
        });
        throw error;
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest"
        });

        const { data } = await api.post(`${server}/forgotpassword`, { email });

        dispatch({
            type: "forgotPasswordSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "forgotPasswordFail",
            payload: error.response?.data?.message || "Password reset request failed"
        });
    }
};

export const resetPassword = (newPassword, confirmNewPassword, token) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest"
        });

        const { data } = await api.put(`/password/reset/${token}`, { 
            newPassword, 
            confirmNewPassword 
        });

        dispatch({
            type: "resetPasswordSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "resetPasswordFail",
            payload: error.response?.data?.message || "Password reset failed"
        });
    }
};

export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest"
        });

        // For multipart/form-data, we need to set the header specifically
        const { data } = await api.put(`${server}/user/update`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        // Update user data in localStorage
        if (data.user) {
            saveUser(data.user);
        }

        dispatch({
            type: "updateProfileSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response?.data?.message || "Profile update failed"
        });
    }
};

export const deleteProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest"
        });

        const { data } = await api.delete(`${server}/user/delete`);

        // Clear all auth data
        clearAuth();

        dispatch({
            type: "deleteProfileSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "deleteProfileFail",
            payload: error.response?.data?.message || "Profile deletion failed"
        });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutUserRequest"
        });

        // Clear user data from localStorage
        clearAuth();

        dispatch({
            type: "logoutUserSuccess",
            payload: { message: "Logged out successfully" }
        });
        
        return { success: true };
    } catch (error) {
        dispatch({
            type: "logoutUserFail",
            payload: error.message || "Logout failed"
        });
        return { success: false };
    }
};



