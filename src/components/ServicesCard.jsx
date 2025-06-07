import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServicesCard = () => {
    const { darkMode } = useSelector((state) => state.theme);

    const services = [
        {
            id: 1,
            title: "Bug Fixing & Debugging",
            description: "Identifying and resolving issues in existing web applications to ensure smooth performance and functionality.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            color: "from-red-500 to-red-600"
        },
        {
            id: 2,
            title: "Landing Page Design",
            description: "Crafting visually appealing, conversion-focused landing pages that make a strong first impression for your business.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 3,
            title: "Full Stack Web App",
            description: "End-to-end development of scalable web applications with robust back-end functionality and intuitive front-end interfaces.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 4,
            title: "Admin Dashboard Development",
            description: "Creating comprehensive admin panels with data visualization, user management, and content control capabilities.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            ),
            color: "from-green-500 to-green-600"
        },
        {
            id: 5,
            title: "REST API Development",
            description: "Building secure, scalable, and well-documented APIs to power your applications and connect with third-party services.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "from-yellow-500 to-yellow-600"
        },
        {
            id: 6,
            title: "Database Design & Optimization",
            description: "Structuring efficient databases and optimizing queries for improved performance and scalability of your applications.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
            color: "from-indigo-500 to-indigo-600"
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const underlineVariants = {
        hidden: { width: 0 },
        visible: {
            width: "6rem",
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50, 
            scale: 0.9 
        },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
                delay: i * 0.1
            }
        }),
        hover: {
            y: -12,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const iconContainerVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        hover: {
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.5
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            x: 5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <motion.section 
            className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} py-20`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container px-4 mx-auto">
                <motion.div 
                    className="text-center mb-16"
                    variants={headerVariants}
                >
                    <motion.h2 
                        className={`text-4xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                        animate={{ 
                            scale: [1, 1.03, 1],
                            transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                        }}
                    >
                        Services I Offer
                    </motion.h2>
                    <motion.div 
                        className="w-24 h-1 bg-blue-500 mx-auto mb-6"
                        variants={underlineVariants}
                    ></motion.div>
                    <motion.p 
                        className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                        variants={fadeInUpVariants}
                    >
                        Specialized solutions to help your business grow and succeed in the digital world
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {services.map((service, index) => (
                        <ServiceCard 
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            color={service.color}
                            darkMode={darkMode}
                            index={index}
                            cardVariants={cardVariants}
                            iconContainerVariants={iconContainerVariants}
                        />
                    ))}
                </motion.div>

                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <motion.div
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link 
                            to="/contact" 
                            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                                darkMode 
                                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            <motion.span
                                className="flex items-center"
                                variants={buttonVariants}
                            >
                                Discuss Your Project
                                <motion.svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5 ml-2" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    initial={{ x: 0 }}
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut"
                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    )
}

const ServiceCard = ({ title, description, icon, color, darkMode, index, cardVariants, iconContainerVariants }) => {
    return (
        <motion.div 
            className={`group rounded-xl overflow-hidden ${
                darkMode ? "bg-gray-800 shadow-gray-700/20" : "bg-white shadow-lg"
            }`}
            custom={index}
            variants={cardVariants}
            whileHover="hover"
        >
            <div className="p-8">
                <motion.div 
                    className={`w-16 h-16 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-6 text-white`}
                    variants={iconContainerVariants}
                    whileHover="hover"
                >
                    {icon}
                </motion.div>

                <motion.h3 
                    className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                >
                    {title}
                </motion.h3>
                
                <motion.p 
                    className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                >
                    {description}
                </motion.p>
                
                <motion.a 
                    href="#" 
                    className={`inline-flex items-center font-medium ${
                        darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
                    }`}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Learn More
                    <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                </motion.a>
            </div>
        </motion.div>
    );
};

export default ServicesCard

