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

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllCategoriesRequest"
        });
        console.log('getAllCategories')

        const { data } = await api.get(`${server}/categories`);
        console.log('data', data)

        dispatch({
            type: "getAllCategoriesSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getAllCategoriesFail",
            payload: error.response?.data?.message || "Failed to fetch categories"
        });
    }
};

export const createCategory = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "createCategoryRequest"
        });

        const { data } = await api.post(`${server}/category/create`, formData);

        dispatch({
            type: "createCategorySuccess",
            payload: data
        });
        
        return {
            type: "createCategorySuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "createCategoryFail",
            payload: error.response?.data?.message || "Failed to create category"
        });
        throw error;
    }
};

// Alias for createCategory to maintain backward compatibility
export const addCategory = (category) => async (dispatch) => {
    try {
        const result = await dispatch(createCategory({ category }));
        return {
            type: "addCategorySuccess",
            payload: result.payload
        };
    } catch (error) {
        throw error;
    }
};

export const updateCategory = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateCategoryRequest"
        });

        const { data } = await api.put(`${server}/category/${id}`, formData);

        dispatch({
            type: "updateCategorySuccess",
            payload: data
        });
        
        return {
            type: "updateCategorySuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "updateCategoryFail",
            payload: error.response?.data?.message || "Failed to update category"
        });
        throw error;
    }
};

// Alias for updateCategory to maintain backward compatibility
export const editCategory = (category, id) => async (dispatch) => {
    try {
        const result = await dispatch(updateCategory(id, { category }));
        return {
            type: "editCategorySuccess",
            payload: result.payload
        };
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCategoryRequest"
        });

        const { data } = await api.delete(`${server}/category/${id}`);

        dispatch({
            type: "deleteCategorySuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "deleteCategoryFail",
            payload: error.response?.data?.message || "Failed to delete category"
        });
    }
};

export const bulkDeleteCategories = (categoryIds) => async (dispatch) => {
    try {
        dispatch({
            type: "bulkDeleteCategoriesRequest"
        });

        // Make individual delete requests for each category
        const deletePromises = categoryIds.map(id => 
            api.delete(`${server}/category/${id}`)
        );
        
        await Promise.all(deletePromises);

        dispatch({
            type: "bulkDeleteCategoriesSuccess",
            payload: { message: "Selected categories deleted successfully" }
        });
    } catch (error) {
        dispatch({
            type: "bulkDeleteCategoriesFail",
            payload: error.response?.data?.message || "Failed to delete categories"
        });
    }
};

export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getCategoryDetailsRequest"
        });

        const { data } = await api.get(`${server}/category/${id}`);

        dispatch({
            type: "getCategoryDetailsSuccess",
            payload: data
        });
        
        return {
            type: "getCategorySuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getCategoryDetailsFail",
            payload: error.response?.data?.message || "Failed to fetch category details"
        });
        throw error;
    }
};

// For backward compatibility
export const getCategory = getCategoryDetails;

