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

export const getBlogDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getBlogDetailsRequest"
        });

        const { data } = await api.get(`/blog/${id}`);

        dispatch({
            type: "getBlogDetailsSuccess",
            payload: data
        });
        
        return {
            type: "getBlogDetailsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getBlogDetailsFail",
            payload: error.response?.data?.message || "Failed to fetch blog details"
        });
        throw error;
    }
};

export const addBlog = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "addBlogRequest"
        });

        // For multipart/form-data, we need different headers
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        
        const { data } = await api.post(
            `/blog/create`,
            formData,
            config
        );

        dispatch({
            type: "addBlogSuccess",
            payload: data
        });
        
        return {
            type: "addBlogSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "addBlogFail",
            payload: error.response?.data?.message || "Failed to add blog"
        });
        throw error;
    }
};

export const editBlog = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "editBlogRequest"
        });

        // For multipart/form-data, we need different headers
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        
        const { data } = await api.put(
            `/blog/${id}`,
            formData,
            config
        );

        dispatch({
            type: "editBlogSuccess",
            payload: data
        });
        
        return {
            type: "editBlogSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "editBlogFail",
            payload: error.response?.data?.message || "Failed to edit blog"
        });
        throw error;
    }
};

export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteBlogRequest"
        });

        const { data } = await api.delete(`/blog/${id}`);

        dispatch({
            type: "deleteBlogSuccess",
            payload: data
        });
        
        return {
            type: "deleteBlogSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "deleteBlogFail",
            payload: error.response?.data?.message || "Failed to delete blog"
        });
        throw error;
    }
};

export const getAllBlogs = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllBlogsRequest"
        });

        const { data } = await api.get(`/blogs/all`);

        dispatch({
            type: "getAllBlogsSuccess",
            payload: data
        });
        
        return {
            type: "getAllBlogsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getAllBlogsFail",
            payload: error.response?.data?.message || "Failed to fetch blogs"
        });
        throw error;
    }
};

export const bulkDeleteBlogs = (blogIds) => async (dispatch) => {
    try {
        dispatch({ type: "bulkDeleteBlogRequest" });

        // Make individual delete requests for each blog
        const deletePromises = blogIds.map(id => 
            api.delete(`/blog/${id}`)
        );
        
        await Promise.all(deletePromises);

        dispatch({ 
            type: "bulkDeleteBlogSuccess", 
            payload: `Successfully deleted ${blogIds.length} blogs` 
        });
        
        return {
            success: true,
            message: `Successfully deleted ${blogIds.length} blogs`
        };
    } catch (error) {
        dispatch({
            type: "bulkDeleteBlogFail",
            payload: error.response?.data?.message || "Failed to delete blogs",
        });
        throw error;
    }
};

