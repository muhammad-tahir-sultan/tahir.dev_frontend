import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteProfile from './DeleteProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { loadUser } from '../../redux/actions/user'
import { 
  Email, 
  Edit, 
  DeleteOutline, 
  CalendarToday, 
  Lock, 
  VerifiedUser, 
  Schedule,
  Badge,
  AccountCircle,
  Security,
  History
} from '@mui/icons-material'
import { isAuthenticated, getUser } from '../../utils/authManager'

const Profile = () => {
    const { user, isAuthenticated: reduxIsAuthenticated, loading } = useSelector(state => state.user)
    console.log('user  is here', user)
    const { darkMode } = useSelector(state => state.theme)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')
    const [authStatus, setAuthStatus] = useState({
        hasUser: false,
        isAuthenticated: false
    })

    useEffect(() => {
        // Check authentication status
        const userData = getUser()
        const auth = isAuthenticated()
        setAuthStatus({
            hasUser: !!userData,
            isAuthenticated: auth
        })

        // Load user data if authenticated
        if (auth) {
            dispatch(loadUser())
        } else {
            console.log("Not authenticated, redirecting to login")
            navigate("/login")
        }
    }, [dispatch, navigate])

    // Debug authentication issues
    useEffect(() => {
     
    }, [reduxIsAuthenticated, user, loading, authStatus])

    const handleDelete = () => {
        setIsOpen(!isOpen)
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    // If not authenticated, show login prompt
    if (!authStatus.isAuthenticated) {
        return (
            <div className={`container mx-auto px-4 py-24 max-w-5xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <div className={`rounded-xl shadow-xl p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                    <p className="mb-6">You need to be logged in to view your profile.</p>
                    <Link 
                        to="/login" 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        )
    }

    // If no user data in Redux, try to get from localStorage
    const displayUser = user || getUser();

    // If still no user data, show error
    if (!displayUser) {
        return (
            <div className={`container mx-auto px-4 py-24 max-w-5xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <div className={`rounded-xl shadow-xl p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-2xl font-bold mb-4">Unable to load profile</h2>
                    <p className="mb-6">There was a problem loading your profile data. Please try again later.</p>
                    <button 
                        onClick={() => dispatch(loadUser())}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`container mx-auto px-4 py-16 max-w-6xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {/* Main Profile Card */}
            <div className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800/70 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} transition-all duration-300`}>
                {/* Profile Header with Gradient Background */}
                <div className="relative">
                    {/* Cover Image with Gradient Overlay */}
                    <div className="h-56 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 z-0"></div>
                        <img 
                            className="object-cover object-center w-full h-full opacity-50" 
                            src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' 
                            alt="Profile Cover" 
                        />
                    </div>
                    
                    {/* Profile Actions - Absolute positioned on top of cover */}
                    <div className="absolute top-4 right-4 flex space-x-3 z-10">
                        <Link 
                            to="/editprofile" 
                            className="bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            title="Edit Profile"
                        >
                            <Edit className="h-5 w-5" />
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500/80 hover:bg-red-600/90 backdrop-blur-md text-white p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            title="Delete Account"
                        >
                            <DeleteOutline className="h-5 w-5" />
                        </button>
                    </div>
                    
                    {/* Profile Picture with Animated Border */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                            <img 
                                className="object-cover object-center h-full w-full transition-transform duration-300 group-hover:scale-110" 
                                src={displayUser?.image?.url || 'https://via.placeholder.com/200x200.png?text=Profile'} 
                                alt={`${displayUser?.name}'s profile`} 
                            />
                        </div>
                        <div className="mt-2 text-center z-10">
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">{displayUser?.name}</h1>
                            <div className="flex items-center justify-center mt-1">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white flex items-center">
                                    <Badge className="h-3 w-3 mr-1" />
                                    {displayUser?.role || 'Member'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Profile Info Section */}
                <div className="pt-24 pb-6 px-6 md:px-10">
                    {/* User Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} shadow-md transition-transform hover:transform hover:scale-105 border-l-4 border-blue-500`}>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                            <p className="font-medium text-lg">{formatDate(displayUser?.joinedAt)}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} shadow-md transition-transform hover:transform hover:scale-105 border-l-4 border-green-500`}>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Account Status</p>
                            <p className="font-medium text-lg text-green-500">Active</p>
                        </div>
                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} shadow-md transition-transform hover:transform hover:scale-105 border-l-4 border-purple-500`}>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="font-medium text-lg truncate">{displayUser?.email}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} shadow-md transition-transform hover:transform hover:scale-105 border-l-4 border-yellow-500`}>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
                            <p className="font-medium text-lg">Today</p>
                        </div>
                    </div>
                    
                    {/* Tabs Navigation - Modern Style */}
                    <div className="mb-8">
                        <div className={`inline-flex p-1 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                    activeTab === 'profile'
                                        ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} shadow-md`
                                        : `text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`
                                }`}
                            >
                                <div className="flex items-center">
                                    <AccountCircle className="h-4 w-4 mr-2" />
                                    Profile
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                    activeTab === 'security'
                                        ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} shadow-md`
                                        : `text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`
                                }`}
                            >
                                <div className="flex items-center">
                                    <Security className="h-4 w-4 mr-2" />
                                    Security
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                    activeTab === 'activity'
                                        ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} shadow-md`
                                        : `text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`
                                }`}
                            >
                                <div className="flex items-center">
                                    <History className="h-4 w-4 mr-2" />
                                    Activity
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    {/* Tab Content with Enhanced Styling */}
                    <div className="mt-6">
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50 backdrop-blur-sm' : 'bg-gray-50/80 backdrop-blur-sm'} shadow-lg border border-gray-200/20`}>
                                    <h3 className="font-medium text-lg mb-4 flex items-center">
                                        <AccountCircle className="h-5 w-5 mr-2 text-blue-500" />
                                        Personal Information
                                    </h3>
                                    <div className="space-y-5">
                                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20`}>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                            <p className="font-medium text-lg">{displayUser?.name}</p>
                                        </div>
                                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20`}>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                            <p className="font-medium text-lg">{displayUser?.email}</p>
                                        </div>
                                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20`}>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                                            <p className="font-medium text-lg">{formatDate(displayUser?.joinedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50 backdrop-blur-sm' : 'bg-gray-50/80 backdrop-blur-sm'} shadow-lg border border-gray-200/20`}>
                                    <h3 className="font-medium text-lg mb-4 flex items-center">
                                        <Edit className="h-5 w-5 mr-2 text-blue-500" />
                                        Account Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <Link 
                                            to="/editprofile" 
                                            className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800/80' : 'bg-white/70 hover:bg-white/90'} border border-gray-200/20 transition-all duration-200 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]`}
                                        >
                                            <div className="flex items-center">
                                                <Edit className="h-5 w-5 text-blue-500" />
                                                <span className="ml-3 font-medium">Edit Profile</span>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                <span>&rarr;</span>
                                            </div>
                                        </Link>
                                        
                                        <button 
                                            onClick={handleDelete} 
                                            className={`w-full flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800/50 hover:bg-red-900/30' : 'bg-white/70 hover:bg-red-50'} border border-gray-200/20 text-left transition-all duration-200 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]`}
                                        >
                                            <div className="flex items-center">
                                                <DeleteOutline className="h-5 w-5 text-red-500" />
                                                <span className="ml-3 font-medium text-red-500">Delete Account</span>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                <span>&rarr;</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'security' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50 backdrop-blur-sm' : 'bg-gray-50/80 backdrop-blur-sm'} shadow-lg border border-gray-200/20`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium text-lg flex items-center">
                                            <Lock className="h-5 w-5 mr-2 text-blue-500" />
                                            Security Settings
                                        </h3>
                                        <Link 
                                            to="/editprofile" 
                                            className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}
                                        >
                                            Change Password
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        <div className={`flex items-center p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20 shadow-md`}>
                                            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mr-4`}>
                                                <Lock className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Password</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Last changed: Unknown</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-center p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20 shadow-md`}>
                                            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mr-4`}>
                                                <VerifiedUser className="h-5 w-5 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Account Status</p>
                                                <p className="text-sm text-green-500">Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50 backdrop-blur-sm' : 'bg-gray-50/80 backdrop-blur-sm'} shadow-lg border border-gray-200/20`}>
                                    <h3 className="font-medium text-lg mb-4 flex items-center">
                                        <Security className="h-5 w-5 mr-2 text-blue-500" />
                                        Security Recommendations
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20`}>
                                            <span className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mt-0.5 mr-3 flex-shrink-0">✓</span>
                                            <div>
                                                <p className="font-medium">Strong Password</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">You're using a secure password</p>
                                            </div>
                                        </li>
                                        <li className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20`}>
                                            <span className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mt-0.5 mr-3 flex-shrink-0">✓</span>
                                            <div>
                                                <p className="font-medium">Email Verified</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Your email address is verified</p>
                                            </div>
                                        </li>
                                        <li className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} border border-gray-200/20`}>
                                            <span className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs mt-0.5 mr-3 flex-shrink-0">!</span>
                                            <div>
                                                <p className="font-medium">Password Age</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Consider changing your password regularly</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'activity' && (
                            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50 backdrop-blur-sm' : 'bg-gray-50/80 backdrop-blur-sm'} shadow-lg border border-gray-200/20`}>
                                <h3 className="font-medium text-lg mb-6 flex items-center">
                                    <History className="h-5 w-5 mr-2 text-blue-500" />
                                    Recent Activity
                                </h3>
                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                    
                                    <div className="space-y-8">
                                        <div className="relative flex items-start">
                                            <div className={`absolute left-0 mt-1.5 h-8 w-8 rounded-full border-4 ${darkMode ? 'border-gray-800 bg-blue-500' : 'border-white bg-blue-500'} flex items-center justify-center z-10`}>
                                                <Schedule className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="ml-16">
                                                <p className="font-medium">Account Created</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(user?.joinedAt)}</p>
                                                <p className="mt-1 text-sm">Your account was successfully created.</p>
                                            </div>
                                        </div>
                                        
                                        <div className="relative flex items-start">
                                            <div className={`absolute left-0 mt-1.5 h-8 w-8 rounded-full border-4 ${darkMode ? 'border-gray-800 bg-green-500' : 'border-white bg-green-500'} flex items-center justify-center z-10`}>
                                                <VerifiedUser className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="ml-16">
                                                <p className="font-medium">Email Verified</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(user?.joinedAt)}</p>
                                                <p className="mt-1 text-sm">Your email address was verified.</p>
                                            </div>
                                        </div>
                                        
                                        <div className="relative flex items-start">
                                            <div className={`absolute left-0 mt-1.5 h-8 w-8 rounded-full border-4 ${darkMode ? 'border-gray-800 bg-purple-500' : 'border-white bg-purple-500'} flex items-center justify-center z-10`}>
                                                <Schedule className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="ml-16">
                                                <p className="font-medium">Last Login</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
                                                <p className="mt-1 text-sm">You logged in to your account.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {isOpen && <DeleteProfile isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
    )
}

export default Profile



