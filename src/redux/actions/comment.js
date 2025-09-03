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

// Get all comments for a blog
export const getBlogComments = (blogId) => async (dispatch) => {
    try {
        dispatch({
            type: "getCommentsRequest"
        });

        const { data } = await api.get(`/comments/blog/${blogId}`);

        dispatch({
            type: "getCommentsSuccess",
            payload: data
        });
        
        return {
            type: "getCommentsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getCommentsFail",
            payload: error.response?.data?.message || "Failed to fetch comments"
        });
        throw error;
    }
};

// Add a new comment
export const addComment = (commentData) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest"
        });

        const { data } = await api.post("/comment/add", commentData);

        dispatch({
            type: "addCommentSuccess",
            payload: data
        });
        
        return {
            type: "addCommentSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "addCommentFail",
            payload: error.response?.data?.message || "Failed to add comment"
        });
        throw error;
    }
};

// Like/unlike a comment
export const likeComment = (commentId) => async (dispatch) => {
    try {
        dispatch({
            type: "likeCommentRequest"
        });

        const { data } = await api.post(`/comment/like/${commentId}`);

        dispatch({
            type: "likeCommentSuccess",
            payload: {
                commentId,
                ...data
            }
        });
        
        return {
            type: "likeCommentSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "likeCommentFail",
            payload: error.response?.data?.message || "Failed to like comment"
        });
        throw error;
    }
};

// Delete a comment
export const deleteComment = (commentId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCommentRequest"
        });

        const { data } = await api.delete(`/comment/delete/${commentId}`);

        dispatch({
            type: "deleteCommentSuccess",
            payload: {
                commentId,
                ...data
            }
        });
        
        return {
            type: "deleteCommentSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "deleteCommentFail",
            payload: error.response?.data?.message || "Failed to delete comment"
        });
        throw error;
    }
};

// Share a blog post
export const shareBlog = (blogId, platform) => async (dispatch) => {
    try {
        dispatch({
            type: "shareBlogRequest"
        });

        const { data } = await api.post(`/blog/share/${blogId}`, { platform });

        dispatch({
            type: "shareBlogSuccess",
            payload: data
        });
        
        return {
            type: "shareBlogSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "shareBlogFail",
            payload: error.response?.data?.message || "Failed to share blog"
        });
        throw error;
    }
};
