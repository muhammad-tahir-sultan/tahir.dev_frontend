import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../redux/actions/user'
import { toast } from 'react-hot-toast'
import Loader from './Loader'
import { motion } from 'framer-motion'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const dispatch = useDispatch()
    const { darkMode } = useSelector(state => state.theme)
    const { loading, message, error } = useSelector(state => state.user)

    const validateEmail = (email) => {
        if (!email) {
            setEmailError("Email is required")
            return false
        } else if (!isEmailValid(email)) {
            setEmailError("Invalid email format")
            return false
        }
        setEmailError("")
        return true
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (emailError) validateEmail(e.target.value)
    }

    const forgotFormSubmit = (e) => {
        e.preventDefault()
        if (!validateEmail(email)) return

        dispatch(forgotPassword(email))
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
            setIsSubmitted(false)
        }
    }, [message, error, dispatch])

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className={`flex min-h-[80vh] overflow-hidden flex-col justify-center px-6 py-12 lg:px-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
            <motion.div 
                className="sm:mx-auto sm:w-full sm:max-w-md"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div 
                    className="flex justify-center"
                    variants={itemVariants}
                >
                    <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                        <img className="h-28 w-auto rounded-full" src="/logo.png" alt="Tahir.dev Programmer" />
                    </div>
                </motion.div>
                
                <motion.h2 
                    className={`mt-6 text-center text-3xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}
                    variants={itemVariants}
                >
                    Reset Your Password
                </motion.h2>
                <motion.p 
                    className={`mt-2 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    variants={itemVariants}
                >
                    Enter your email and we'll send you a link to reset your password
                </motion.p>
            </motion.div>

            <motion.div 
                className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md ${darkMode ? "bg-gray-800" : "bg-white"} py-8 px-6 shadow-lg rounded-lg sm:px-10`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {isSubmitted && !loading && !error ? (
                    <motion.div 
                        className={`rounded-md ${darkMode ? "bg-blue-900/30 border border-blue-800" : "bg-blue-50 border border-blue-200"} p-4 mb-4`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className={`text-sm font-medium ${darkMode ? "text-blue-300" : "text-blue-800"}`}>Check your email</h3>
                                <div className={`mt-2 text-sm ${darkMode ? "text-blue-200" : "text-blue-700"}`}>
                                    <p>We've sent a password reset link to your email address.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <form className="space-y-6" onSubmit={forgotFormSubmit}>
                        <motion.div variants={itemVariants}>
                            <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className={`appearance-none block w-full px-3 py-3 border ${emailError ? "border-red-300" : darkMode ? "border-gray-600" : "border-gray-300"} 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                    ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"} 
                                    text-sm transition duration-150 ease-in-out`}
                                    placeholder="you@example.com"
                                />
                                {emailError && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {emailError && (
                                <p className="mt-2 text-sm text-red-600">{emailError}</p>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            {loading ? (
                                <div className="flex justify-center">
                                    <Loader />
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                    ${darkMode 
                                        ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" 
                                        : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"} 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-[1.02]`}
                                >
                                    Send Reset Link
                                </button>
                            )}
                        </motion.div>
                    </form>
                )}

                <motion.div 
                    className="mt-6 flex items-center justify-center"
                    variants={itemVariants}
                >
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Remember your password?{' '}
                        <Link 
                            to="/login" 
                            className={`font-medium ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"} transition duration-150 ease-in-out`}
                        >
                            Sign in
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ForgotPassword