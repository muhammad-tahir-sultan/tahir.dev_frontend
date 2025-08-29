import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../redux/actions/project';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { getBlogDetails } from '../../redux/actions/blog';
import { motion } from 'framer-motion';
import Loader from '../Loader';

function Blog() {
    const params = useParams();
    const dispatch = useDispatch();
    const { blog, loading } = useSelector(state => state.blog);
    const { error } = useSelector(state => state.project);
    const { darkMode } = useSelector((state) => state.theme);
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }

        dispatch(getBlogDetails(params.id));
    }, [error, params.id, dispatch]);

    // Reading progress effect
    useEffect(() => {
        const updateReadingProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setReadingProgress(progress);
        };

        window.addEventListener('scroll', updateReadingProgress);
        return () => window.removeEventListener('scroll', updateReadingProgress);
    }, []);

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <Loader />
            </div>
        );
    }

    if (!blog) {
    return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
                    <Link to="/blogs" className="text-blue-500 hover:text-blue-600">Back to Blogs</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} min-h-screen`}>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${readingProgress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className={`absolute inset-0 ${darkMode ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>
                
                <div className="relative container mx-auto px-4 pt-32 pb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Category Badge */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                darkMode ? "bg-blue-600/20 text-blue-400" : "bg-blue-100 text-blue-700"
                            }`}>
                                {blog?.category?.category || "Uncategorized"}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {blog?.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-lg opacity-80">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {blog?.author?.charAt(0) || 'A'}
                                    </span>
                </div>
                                <span>By {blog?.author || 'Anonymous'}</span>
                    </div>
                            <span>•</span>
                            <span>
                                {new Date(blog?.createdAt || Date.now()).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span>•</span>
                            <span>{Math.ceil((blog?.content?.length || 0) / 200)} min read</span>
                </div>

                        {/* Featured Image */}
                        {blog?.image?.url && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="relative rounded-2xl overflow-hidden shadow-2xl mb-8"
                            >
                                <img 
                                    src={blog?.image?.url} 
                                    alt={blog?.title}
                                    className="w-full h-64 md:h-96 object-cover"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className={`prose prose-lg max-w-none ${
                                darkMode 
                                    ? "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-400" 
                                    : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600"
                            }`}
                        >
                            <div 
                                dangerouslySetInnerHTML={{ __html: blog?.content }} 
                                className="leading-relaxed text-lg"
                            />
                        </motion.div>

                        {/* Tags */}
                        {blog?.tags && blog.tags.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                            >
                                <h3 className="text-lg font-semibold mb-4">Tags:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                darkMode 
                                                    ? "bg-gray-700 text-gray-300" 
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            #{tag}
                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        </div>
                    </div>
            </section>

            {/* Author Section */}
            <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className={`p-8 rounded-2xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                        >
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">
                                        {blog?.author?.charAt(0) || 'A'}
                                    </span>
                        </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-2">{blog?.author || 'Anonymous'}</h3>
                                    <p className={`mb-4 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        Passionate developer and writer sharing insights about web development, 
                                        design, and technology. Always learning and exploring new technologies.
                                    </p>
                                                                        <div className="flex items-center justify-center md:justify-start gap-4">
                                        <a href="http://github.com/tahir-sigmadevelopers/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/muhammadtahirsultan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.facebook.com/tahirdev.tahirsultanofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.instagram.com/tahirsultanofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                        <a href="https://wa.me/923266640988" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                            </svg>
                                        </a>
                            </div>
                                </div>
                            </div>
                        </motion.div>
                        </div>
                    </div>
                </section>

            {/* Navigation */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link 
                                to="/blogs"
                                className={`flex-1 p-6 rounded-xl transition-all duration-300 ${
                                    darkMode 
                                        ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" 
                                        : "bg-white hover:bg-gray-50 border border-gray-200"
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <div>
                                        <p className="text-sm opacity-60">Previous</p>
                                        <p className="font-semibold">Back to Blogs</p>
                                    </div>
                    </div>
                            </Link>
                            
                            <div className={`flex-1 p-6 rounded-xl ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                                <div className="flex items-center justify-end">
                                    <div className="text-right">
                                        <p className="text-sm opacity-60">Next</p>
                                        <p className="font-semibold">Coming Soon</p>
                                    </div>
                                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                        </div>
                        </motion.div>
                    </div>
            </div>
            </section>
        </div>
    );
}

export default Blog;
