import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogComments, addComment, likeComment, deleteComment } from '../../redux/actions/comment';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { getUser } from '../../utils/authManager';

const Comments = ({ blogId }) => {
    const dispatch = useDispatch();
    const { comments, loading, error, message } = useSelector(state => state.comment);
    const { darkMode } = useSelector((state) => state.theme);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [commentCount, setCommentCount] = useState(0);
    const user = getUser();

    // Fetch comments when component mounts
    useEffect(() => {
        dispatch(getBlogComments(blogId));
    }, [dispatch, blogId]);

    // Update comment count when comments change
    useEffect(() => {
        if (comments) {
            let count = comments.length;
            // Add replies count
            comments.forEach(comment => {
                if (comment.replies) {
                    count += comment.replies.length;
                }
            });
            setCommentCount(count);
        }
    }, [comments]);

    // Handle error and success messages
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [error, message, dispatch]);

    // Pre-fill user data if logged in
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    // Handle comment submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!commentText.trim()) {
            return toast.error('Comment cannot be empty');
        }
        
        if (!name.trim() || !email.trim()) {
            return toast.error('Name and email are required');
        }
        
        try {
            const commentData = {
                blogId,
                name,
                email,
                comment: commentText,
            };
            
            // If replying to a comment, add parentCommentId
            if (replyingTo) {
                commentData.parentCommentId = replyingTo;
            }
            
            await dispatch(addComment(commentData));
            setCommentText('');
            setReplyingTo(null);
            
            // Refresh comments
            dispatch(getBlogComments(blogId));
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Handle like/unlike comment
    const handleLike = async (commentId) => {
        if (!user) {
            return toast.error('Please login to like comments');
        }
        
        try {
            await dispatch(likeComment(commentId));
            // Refresh comments
            dispatch(getBlogComments(blogId));
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    // Handle delete comment
    const handleDelete = async (commentId) => {
        if (!user) {
            return toast.error('Please login to delete comments');
        }
        
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await dispatch(deleteComment(commentId));
                // Refresh comments
                dispatch(getBlogComments(blogId));
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            return `${Math.floor(diffDays / 7)} weeks ago`;
        } else if (diffDays < 365) {
            return `${Math.floor(diffDays / 30)} months ago`;
        } else {
            return `${Math.floor(diffDays / 365)} years ago`;
        }
    };

    // Check if user has liked a comment
    const hasLiked = (likes) => {
        return user && likes && likes.includes(user._id);
    };

    // Check if user can delete a comment
    const canDelete = (comment) => {
        return user && (
            (comment.user && comment.user._id === user._id) || 
            user.role === 'admin'
        );
    };

    return (
        <section className={`py-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`rounded-2xl p-8 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                    >
                        <h2 className="text-2xl font-bold mb-8 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Comments ({commentCount})
                        </h2>
                        
                        {/* Comment Form */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold mb-4">
                                {replyingTo ? 'Reply to comment' : 'Leave a Comment'}
                                {replyingTo && (
                                    <button 
                                        onClick={() => setReplyingTo(null)}
                                        className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                                    >
                                        (Cancel)
                                    </button>
                                )}
                            </h3>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Name
                                        </label>
                                        <input 
                                            type="text" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                                                darkMode 
                                                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500/30 text-white" 
                                                    : "bg-white border-gray-300 focus:ring-blue-500/30 text-gray-800"
                                            }`}
                                            placeholder="Your name"
                                            required
                                            disabled={user}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                                                darkMode 
                                                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500/30 text-white" 
                                                    : "bg-white border-gray-300 focus:ring-blue-500/30 text-gray-800"
                                            }`}
                                            placeholder="Your email"
                                            required
                                            disabled={user}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        Comment
                                    </label>
                                    <textarea 
                                        rows="4"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                                            darkMode 
                                                ? "bg-gray-700 border-gray-600 focus:ring-blue-500/30 text-white" 
                                                : "bg-white border-gray-300 focus:ring-blue-500/30 text-gray-800"
                                        }`}
                                        placeholder="Write your comment here..."
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg ${
                                            loading ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {loading ? 'Posting...' : 'Post Comment'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        {/* Comments List */}
                        <div className="space-y-8">
                            {loading && !comments.length ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : comments.length === 0 ? (
                                <p className={`text-center py-8 italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Be the first to comment on this article!
                                </p>
                            ) : (
                                <AnimatePresence>
                                    {comments.map((comment) => (
                                        <motion.div 
                                            key={comment._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                    {comment.user && comment.user.avatar ? (
                                                        <img 
                                                            src={comment.user.avatar.url} 
                                                            alt={comment.name} 
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-white font-bold">
                                                            {comment.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-bold">{comment.name}</h4>
                                                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                            {formatDate(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                        {comment.comment}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <button 
                                                            onClick={() => handleLike(comment._id)}
                                                            className={`flex items-center gap-1 text-sm transition-colors ${
                                                                hasLiked(comment.likes) 
                                                                    ? 'text-blue-500' 
                                                                    : 'hover:text-blue-500'
                                                            }`}
                                                        >
                                                            <svg className="w-4 h-4" fill={hasLiked(comment.likes) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                            </svg>
                                                            Like ({comment.likes ? comment.likes.length : 0})
                                                        </button>
                                                        <button 
                                                            onClick={() => setReplyingTo(comment._id)}
                                                            className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                            </svg>
                                                            Reply
                                                        </button>
                                                        {canDelete(comment) && (
                                                            <button 
                                                                onClick={() => handleDelete(comment._id)}
                                                                className="flex items-center gap-1 text-sm hover:text-red-500 transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Replies */}
                                                    {comment.replies && comment.replies.length > 0 && (
                                                        <div className="mt-6 ml-6 pl-6 border-l-2 border-gray-300 dark:border-gray-600 space-y-6">
                                                            {comment.replies.map(reply => (
                                                                <div key={reply._id} className="flex items-start gap-4">
                                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                                                                        {reply.user && reply.user.avatar ? (
                                                                            <img 
                                                                                src={reply.user.avatar.url} 
                                                                                alt={reply.name} 
                                                                                className="w-10 h-10 rounded-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <span className="text-white font-bold text-sm">
                                                                                {reply.name.charAt(0).toUpperCase()}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                            <h4 className="font-bold">{reply.name}</h4>
                                                                            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                                {formatDate(reply.createdAt)}
                                                                            </span>
                                                                        </div>
                                                                        <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                            {reply.comment}
                                                                        </p>
                                                                        <div className="flex items-center gap-4 mt-4">
                                                                            <button 
                                                                                onClick={() => handleLike(reply._id)}
                                                                                className={`flex items-center gap-1 text-sm transition-colors ${
                                                                                    hasLiked(reply.likes) 
                                                                                        ? 'text-blue-500' 
                                                                                        : 'hover:text-blue-500'
                                                                                }`}
                                                                            >
                                                                                <svg className="w-4 h-4" fill={hasLiked(reply.likes) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                                                </svg>
                                                                                Like ({reply.likes ? reply.likes.length : 0})
                                                                            </button>
                                                                            {canDelete(reply) && (
                                                                                <button 
                                                                                    onClick={() => handleDelete(reply._id)}
                                                                                    className="flex items-center gap-1 text-sm hover:text-red-500 transition-colors"
                                                                                >
                                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                    </svg>
                                                                                    Delete
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Comments;
