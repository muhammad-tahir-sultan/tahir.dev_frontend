import { createReducer } from "@reduxjs/toolkit";

export const categoryReducer = createReducer({}, {
    // Create category
    createCategoryRequest: (state) => {
        state.loading = true
    },
    createCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },
    createCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    
    // For backward compatibility
    addCategoryRequest: (state) => {
        state.loading = true
    },
    addCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },
    addCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // Get all categories
    getAllCategoriesRequest: (state) => {
        state.loading = true
    },
    getAllCategoriesSuccess: (state, action) => {
        state.loading = false
        state.categories = action.payload.categories
        state.error = null
    },
    getAllCategoriesFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // For backward compatibility
    getAllCategoryRequest: (state) => {
        state.loading = true
    },
    getAllCategorySuccess: (state, action) => {
        state.loading = false
        state.categories = action.payload.categories
        state.error = null
    },
    getAllCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // Update category
    updateCategoryRequest: (state) => {
        state.loading = true
    },
    updateCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },
    updateCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // For backward compatibility
    editCategoryRequest: (state) => {
        state.loading = true
    },
    editCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },
    editCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // Get category details
    getCategoryDetailsRequest: (state) => {
        state.loading = true
    },
    getCategoryDetailsSuccess: (state, action) => {
        state.loading = false
        state.category = action.payload.category
        state.error = null
    },
    getCategoryDetailsFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // For backward compatibility
    getCategoryRequest: (state) => {
        state.loading = true
    },
    getCategorySuccess: (state, action) => {
        state.loading = false
        state.category = action.payload.category
        state.error = null
    },
    getCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // Delete category
    deleteCategoryRequest: (state) => {
        state.loading = true
    },
    deleteCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },
    deleteCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // Bulk delete categories
    bulkDeleteCategoriesRequest: (state) => {
        state.loading = true
    },
    bulkDeleteCategoriesSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },
    bulkDeleteCategoriesFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    // For backward compatibility
    bulkDeleteCategoryRequest: (state) => {
        state.loading = true
    },
    bulkDeleteCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },
    bulkDeleteCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    clearMessage: (state) => {
        state.message = null
    },
    clearError: (state) => {
        state.error = null
    }
})