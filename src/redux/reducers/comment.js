import { createReducer } from "@reduxjs/toolkit";

export const commentReducer = createReducer({
    comments: [],
    loading: false,
    error: null,
    message: null
}, {
    // Get comments
    getCommentsRequest: (state) => {
        state.loading = true;
    },
    getCommentsSuccess: (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.error = null;
    },
    getCommentsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Add comment
    addCommentRequest: (state) => {
        state.loading = true;
    },
    addCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // Add the new comment to the comments array
        if (action.payload.comment.parentComment) {
            // If it's a reply, find the parent comment and add to its replies
            const parentComment = state.comments.find(
                comment => comment._id === action.payload.comment.parentComment
            );
            if (parentComment) {
                parentComment.replies = parentComment.replies || [];
                parentComment.replies.push(action.payload.comment);
            }
        } else {
            // If it's a top-level comment, add to the comments array
            state.comments.unshift(action.payload.comment);
        }
        state.error = null;
    },
    addCommentFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Like comment
    likeCommentRequest: (state) => {
        state.loading = true;
    },
    likeCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        
        // Find and update the liked comment
        const commentId = action.payload.commentId;
        let commentFound = false;
        
        // Check in top-level comments
        state.comments = state.comments.map(comment => {
            if (comment._id === commentId) {
                commentFound = true;
                return {
                    ...comment,
                    likes: action.payload.likes
                };
            }
            return comment;
        });
        
        // If not found in top-level, check in replies
        if (!commentFound) {
            state.comments = state.comments.map(comment => {
                if (comment.replies) {
                    return {
                        ...comment,
                        replies: comment.replies.map(reply => {
                            if (reply._id === commentId) {
                                return {
                                    ...reply,
                                    likes: action.payload.likes
                                };
                            }
                            return reply;
                        })
                    };
                }
                return comment;
            });
        }
        
        state.error = null;
    },
    likeCommentFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Delete comment
    deleteCommentRequest: (state) => {
        state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        
        // Remove the deleted comment
        const commentId = action.payload.commentId;
        
        // Remove from top-level comments
        state.comments = state.comments.filter(comment => comment._id !== commentId);
        
        // Remove from replies
        state.comments = state.comments.map(comment => {
            if (comment.replies) {
                return {
                    ...comment,
                    replies: comment.replies.filter(reply => reply._id !== commentId)
                };
            }
            return comment;
        });
        
        state.error = null;
    },
    deleteCommentFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Share blog
    shareBlogRequest: (state) => {
        state.loading = true;
    },
    shareBlogSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.shareCount = action.payload.shareCount;
        state.error = null;
    },
    shareBlogFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Clear states
    clearMessage: (state) => {
        state.message = null;
    },
    clearError: (state) => {
        state.error = null;
    }
});
