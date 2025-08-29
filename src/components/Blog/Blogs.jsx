import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../redux/actions/blog';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, error, loading } = useSelector(state => state.blog);
  const { darkMode } = useSelector((state) => state.theme);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(getAllBlogs());
  }, [error, dispatch]);

  // Extract unique categories from blogs
  const categories = blogs ? 
    ['all', ...new Set(blogs?.map(blog => blog?.category?.category).filter(Boolean))] : 
    ['all'];

  // Filter blogs based on selected category and search term
  const filteredBlogs = blogs && selectedCategory === 'all' ? 
    blogs?.filter(blog => 
      blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog?.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : 
    blogs?.filter(blog => 
      blog?.category?.category === selectedCategory &&
      (blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       blog?.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} min-h-screen`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${darkMode ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`font-bold text-5xl md:text-7xl mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              <span className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>Tahir.dev</span> Blog
          </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Insights, tutorials, and updates from our team of expert developers and designers.
            Stay informed about the latest trends in web development and design.
          </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className={`py-8 ${darkMode ? "bg-gray-800" : "bg-white"} border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20" 
                    : "bg-white border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
              <svg className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
                <motion.button
                key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
                </motion.button>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            {filteredBlogs && filteredBlogs.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredBlogs.map((blog, index) => (
                    <motion.div key={blog?._id} variants={itemVariants}>
                      <BlogCard blog={blog} darkMode={darkMode} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M16 3h5v5h-5V3zM6 8h4M6 12h4M6 16h4" />
                </svg>
              </div>
                  <h3 className="text-2xl font-bold mb-2">No blog posts found</h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {searchTerm ? `No results for "${searchTerm}"` : "Try selecting a different category"}
                  </p>
                </motion.div>
            )}
          </>
        )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`max-w-4xl mx-auto p-12 rounded-2xl ${darkMode ? "bg-gradient-to-r from-gray-700 to-gray-800" : "bg-gradient-to-r from-blue-50 to-purple-50"} border ${darkMode ? "border-gray-600" : "border-blue-200"}`}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Get the latest articles, tutorials, and updates delivered straight to your inbox.
                Join our community of developers and designers.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-grow px-6 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode 
                    ? "bg-gray-600 text-white focus:ring-blue-500 border-gray-500" 
                    : "bg-white text-gray-800 focus:ring-blue-500 border-gray-200"
                } border`}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Subscribe
              </motion.button>
            </form>
            <p className={`text-sm mt-4 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const BlogCard = ({ blog, darkMode, index }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`group h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      {/* Blog Image */}
      <Link to={`/blog/${blog?._id}`} className="block overflow-hidden h-56">
        <div className="relative">
        <img 
          src={blog?.image?.url} 
          alt={blog?.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      
      {/* Blog Content */}
      <div className="p-8">
        {/* Category & Date */}
        <div className="flex justify-between items-center mb-4">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            darkMode ? "bg-blue-600/20 text-blue-400" : "bg-blue-100 text-blue-700"
          }`}>
            {blog?.category?.category || "Uncategorized"}
          </span>
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {new Date(blog?.createdAt || Date.now()).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300">
          <Link to={`/blog/${blog?._id}`}>{blog?.title}</Link>
        </h3>
        
        {/* Excerpt */}
        <p className={`mb-6 line-clamp-3 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {blog?.shortDescription}
        </p>
        
        {/* Read More Button */}
        <div className="flex justify-between items-center">
          <Link 
            to={`/blog/${blog?._id}`}
            className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white ${
              darkMode 
                ? "bg-gray-700 text-gray-300 hover:bg-blue-600" 
                : "bg-gray-100 text-gray-700 hover:bg-blue-600"
            }`}
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          {/* Reading Time Estimate */}
          <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {Math.ceil((blog?.content?.length || 0) / 200)} min read
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;
