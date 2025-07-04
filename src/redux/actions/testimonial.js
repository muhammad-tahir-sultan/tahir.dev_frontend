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

export const getAllTestimonials = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllTestimonialsRequest"
        });

        const { data } = await api.get(`/testimonials`);

        dispatch({
            type: "getAllTestimonialsSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getAllTestimonialsFail",
            payload: error.response?.data?.message || "Failed to fetch testimonials"
        });
    }
};

export const addReview = (description) => async (dispatch) => {
    try {
        dispatch({
            type: "addReviewRequest"
        });

        const { data } = await api.post(`/testimonial/add`, { description });

        dispatch({
            type: "addReviewSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "addReviewFail",
            payload: error.response?.data?.message || "Failed to add review"
        });
    }
};

export const approveTestimonial = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "approveTestimonialRequest"
        });

        const { data } = await api.put(`/testimonial/approve/${id}`);

        dispatch({
            type: "approveTestimonialSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "approveTestimonialFail",
            payload: error.response?.data?.message || "Failed to approve testimonial"
        });
    }
};

export const deleteUserTestimonial = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteUserTestimonialRequest"
        });

        const { data } = await api.delete(`/testimonial/user/${id}`);

        dispatch({
            type: "deleteUserTestimonialSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "deleteUserTestimonialFail",
            payload: error.response?.data?.message || "Failed to delete user testimonial"
        });
    }
};

export const bulkDeleteTestimonials = (ids) => async (dispatch) => {
    try {
        dispatch({
            type: "bulkDeleteTestimonialsRequest"
        });

        // Make individual delete requests for each testimonial
        const deletePromises = ids.map(id => 
            api.delete(`/testimonial/user/${id}`)
        );
        
        await Promise.all(deletePromises);

        dispatch({
            type: "bulkDeleteTestimonialsSuccess",
            payload: { message: "Selected testimonials deleted successfully" }
        });
    } catch (error) {
        dispatch({
            type: "bulkDeleteTestimonialsFail",
            payload: error.response?.data?.message || "Failed to delete testimonials"
        });
    }
};

export const bulkApproveTestimonials = (ids) => async (dispatch) => {
    try {
        dispatch({
            type: "bulkApproveTestimonialsRequest"
        });

        // Make individual approve requests for each testimonial
        const approvePromises = ids.map(id => 
            api.put(`/testimonial/approve/${id}`)
        );
        
        await Promise.all(approvePromises);

        dispatch({
            type: "bulkApproveTestimonialsSuccess",
            payload: { message: "Selected testimonials approved successfully" }
        });
    } catch (error) {
        dispatch({
            type: "bulkApproveTestimonialsFail",
            payload: error.response?.data?.message || "Failed to approve testimonials"
        });
    }
};

export const createTestimonial = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "createTestimonialRequest"
        });

        const { data } = await api.post(`/testimonial/create`, formData);

        dispatch({
            type: "createTestimonialSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "createTestimonialFail",
            payload: error.response?.data?.message || "Failed to create testimonial"
        });
    }
};

export const updateTestimonial = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateTestimonialRequest"
        });

        const { data } = await api.put(`/testimonial/${id}`, formData);

        dispatch({
            type: "updateTestimonialSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "updateTestimonialFail",
            payload: error.response?.data?.message || "Failed to update testimonial"
        });
    }
};

export const deleteTestimonial = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteTestimonialRequest"
        });

        const { data } = await api.delete(`/testimonial/${id}`);

        dispatch({
            type: "deleteTestimonialSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "deleteTestimonialFail",
            payload: error.response?.data?.message || "Failed to delete testimonial"
        });
    }
};

export const getTestimonialDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getTestimonialDetailsRequest"
        });

        const { data } = await api.get(`/testimonial/${id}`);

        dispatch({
            type: "getTestimonialDetailsSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getTestimonialDetailsFail",
            payload: error.response?.data?.message || "Failed to fetch testimonial details"
        });
    }
};