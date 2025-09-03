import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { resetPassword } from '../redux/actions/user'
import Loader from './Loader'
import { motion } from 'framer-motion'

const ResetPassword = () => {
    const params = useParams()
    const token = params.token

    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false)

    const dispatch = useDispatch()
    const { darkMode } = useSelector(state => state.theme)
    const { loading, message, error } = useSelector(state => state.user)

    // Password strength checker
    const checkPasswordStrength = (password) => {
        let strength = 0
        if (password.length >= 8) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[0-9]/.test(password)) strength += 1
        if (/[^A-Za-z0-9]/.test(password)) strength += 1
        setPasswordStrength(strength)
        return strength
    }

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError("Password is required")
            return false
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters")
            return false
        }
        setPasswordError("")
        return true
    }

    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password")
            return false
        } else if (confirmPassword !== newPassword) {
            setConfirmPasswordError("Passwords do not match")
            return false
        }
        setConfirmPasswordError("")
        return true
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setNewPassword(value)
        checkPasswordStrength(value)
        if (passwordError) validatePassword(value)
        if (confirmNewPassword) validateConfirmPassword(confirmNewPassword)
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value
        setConfirmNewPassword(value)
        if (confirmPasswordError) validateConfirmPassword(value)
    }

    const resetFormSubmit = (e) => {
        e.preventDefault()
        
        const isPasswordValid = validatePassword(newPassword)
        const isConfirmPasswordValid = validateConfirmPassword(confirmNewPassword)
        
        if (!isPasswordValid || !isConfirmPasswordValid) return

        dispatch(resetPassword(newPassword, confirmNewPassword, token))
        setIsSuccess(true)
    }

    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
            setNewPassword("")
            setConfirmNewPassword("")
        }
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
            setIsSuccess(false)
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

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return darkMode ? "bg-red-800" : "bg-red-500"
            case 1: return darkMode ? "bg-orange-700" : "bg-orange-500"
            case 2: return darkMode ? "bg-yellow-600" : "bg-yellow-500"
            case 3: return darkMode ? "bg-blue-600" : "bg-blue-500"
            case 4: return darkMode ? "bg-green-600" : "bg-green-500"
            default: return darkMode ? "bg-red-800" : "bg-red-500"
        }
    }

    const getStrengthText = () => {
        switch (passwordStrength) {
            case 0: return "Very Weak"
            case 1: return "Weak"
            case 2: return "Fair"
            case 3: return "Good"
            case 4: return "Strong"
            default: return "Very Weak"
        }
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
                    Create New Password
                </motion.h2>
                <motion.p 
                    className={`mt-2 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    variants={itemVariants}
                >
                    Your new password must be different from previous passwords
                </motion.p>
            </motion.div>

            <motion.div 
                className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md ${darkMode ? "bg-gray-800" : "bg-white"} py-8 px-6 shadow-lg rounded-lg sm:px-10`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {isSuccess && !loading && !error ? (
                    <motion.div 
                        className={`rounded-md ${darkMode ? "bg-green-900/30 border border-green-800" : "bg-green-50 border border-green-200"} p-4 mb-4`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className={`h-5 w-5 ${darkMode ? "text-green-400" : "text-green-600"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className={`text-sm font-medium ${darkMode ? "text-green-300" : "text-green-800"}`}>Password reset successful</h3>
                                <div className={`mt-2 text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                                    <p>Your password has been reset successfully.</p>
                                </div>
                                <div className="mt-4">
                                    <div className="-mx-2 -my-1.5 flex">
                                        <Link 
                                            to="/login" 
                                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                                darkMode 
                                                    ? "bg-green-800/30 text-green-300 hover:bg-green-800/50" 
                                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                        >
                                            Go to login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <form className="space-y-6" onSubmit={resetFormSubmit}>
                        <motion.div variants={itemVariants}>
                            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                New Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className={`appearance-none block w-full px-3 py-3 border ${passwordError ? "border-red-300" : darkMode ? "border-gray-600" : "border-gray-300"} 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                    ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"} 
                                    text-sm transition duration-150 ease-in-out`}
                                    placeholder="••••••••"
                                />
                                {passwordError && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {passwordError ? (
                                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                            ) : newPassword ? (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Password strength: <span className={passwordStrength >= 3 ? "text-green-500" : "text-yellow-500"}>{getStrengthText()}</span></p>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div 
                                            className={`h-full ${getStrengthColor()}`}
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <ul className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        <li className={`flex items-center ${newPassword.length >= 8 ? "text-green-500" : ""}`}>
                                            <svg className={`h-3 w-3 mr-1 ${newPassword.length >= 8 ? "text-green-500" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                                                {newPassword.length >= 8 ? (
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                ) : (
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                )}
                                            </svg>
                                            At least 8 characters
                                        </li>
                                        <li className={`flex items-center ${/[A-Z]/.test(newPassword) ? "text-green-500" : ""}`}>
                                            <svg className={`h-3 w-3 mr-1 ${/[A-Z]/.test(newPassword) ? "text-green-500" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                                                {/[A-Z]/.test(newPassword) ? (
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                ) : (
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                )}
                                            </svg>
                                            At least one uppercase letter
                                        </li>
                                        <li className={`flex items-center ${/[0-9]/.test(newPassword) ? "text-green-500" : ""}`}>
                                            <svg className={`h-3 w-3 mr-1 ${/[0-9]/.test(newPassword) ? "text-green-500" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                                                {/[0-9]/.test(newPassword) ? (
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                ) : (
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                )}
                                            </svg>
                                            At least one number
                                        </li>
                                    </ul>
                                </div>
                            ) : null}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label htmlFor="confirm-password" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={confirmNewPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                    className={`appearance-none block w-full px-3 py-3 border ${confirmPasswordError ? "border-red-300" : darkMode ? "border-gray-600" : "border-gray-300"} 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                    ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"} 
                                    text-sm transition duration-150 ease-in-out`}
                                    placeholder="••••••••"
                                />
                                {confirmPasswordError ? (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                ) : confirmNewPassword && newPassword === confirmNewPassword ? (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                ) : null}
                            </div>
                            {confirmPasswordError && (
                                <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>
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
                                    Reset Password
                                </button>
                            )}
                        </motion.div>
                    </form>
                )}

                {!isSuccess && (
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
                )}
            </motion.div>
        </div>
    )
}

export default ResetPassword