import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const { darkMode } = useSelector((state) => state.theme);
    const navigate = useNavigate();
    
    const handleNavigateToContact = () => {
        navigate('/contact');
    };

    const services = [
        {
            title: "Web Development",
            description: "Custom websites built with modern technologies to provide exceptional user experiences with responsive design and optimal performance.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            skills: ["React.js", "Next.js", "HTML5/CSS3", "JavaScript", "Responsive Design"]
        },
        {
            title: "Backend Development",
            description: "Robust and scalable server-side solutions that power your applications with secure APIs and efficient database management.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Authentication"]
        },
        {
            title: "Full-Stack Development",
            description: "End-to-end solutions that combine front-end and back-end expertise to create complete, integrated applications.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            skills: ["MERN Stack", "Redux", "JWT", "Context API", "Database Design"]
        },
        {
            title: "UI/UX Design",
            description: "Creating intuitive and visually appealing interfaces that enhance user satisfaction and engagement with your digital products.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            skills: ["Tailwind CSS", "Material UI", "Wireframing", "Prototyping", "Responsive Design"]
        },
        {
            title: "E-Commerce Solutions",
            description: "Custom online shopping experiences with secure payment integration, inventory management, and user-friendly interfaces.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            skills: ["Payment Gateways", "Shopping Cart", "User Authentication", "Inventory Management", "Order Processing"]
        },
        {
            title: "Mobile App Development",
            description: "Cross-platform mobile applications that provide native-like experiences on both iOS and Android devices.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            skills: ["React Native", "Expo", "Mobile UI/UX", "Push Notifications", "App Store Deployment"]
        },
        {
            title: "Performance Optimization",
            description: "Improve the speed and efficiency of your existing web applications for better user experience and higher conversion rates.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            skills: ["Lazy Loading", "Code Splitting", "Image Optimization", "Caching Strategies", "Webpack Configuration"]
        },
        {
            title: "Progressive Web Apps",
            description: "Create web applications that offer a native app-like experience with offline capabilities and high performance.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            skills: ["Service Workers", "Offline Support", "Push Notifications", "App Manifest", "Lighthouse Optimization"]
        },
        {
            title: "API Development & Integration",
            description: "Build custom APIs and integrate third-party services to extend your application's functionality and connectivity.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            skills: ["RESTful APIs", "GraphQL", "API Authentication", "Webhooks", "Third-party Integrations"]
        },
        {
            title: "DevOps & Deployment",
            description: "Streamline your development workflow with CI/CD pipelines and optimize your application deployment process.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            skills: ["Docker", "AWS", "CI/CD", "Nginx", "Server Configuration"]
        },
        {
            title: "CMS Development",
            description: "Create custom content management systems or extend existing ones to streamline your content creation workflow.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            skills: ["WordPress", "Headless CMS", "Custom Fields", "Content Modeling", "User Roles"]
        },
        {
            title: "Website Maintenance & Support",
            description: "Ongoing technical support, regular updates, and maintenance to keep your website secure, fast, and up-to-date.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            skills: ["Security Updates", "Performance Monitoring", "Content Updates", "Backup Management", "Bug Fixes"]
        }
    ];

    // Main container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    // Header animation variants
    const headerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        }
    };

    // Underline animation
    const underlineVariants = {
        hidden: { width: 0 },
        visible: { 
            width: "5rem", 
            transition: {
                duration: 0.8,
                ease: "easeOut"
            } 
        }
    };

    // Service card animation variants
    const cardVariants = {
        hidden: { 
            y: 50, 
            opacity: 0,
            scale: 0.9
        },
        visible: (i) => ({ 
            y: 0, 
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                delay: i * 0.1,
                duration: 0.6
            }
        }),
        hover: {
            y: -15,
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transition: {
                duration: 0.2
            }
        }
    };

    // Icon animation variants
    const iconVariants = {
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

    // Skills tag animation variants
    const skillVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: i => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        }),
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2
            }
        }
    };

    // CTA section animation
    const ctaVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8
            }
        }
    };

    // Button animation
    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
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
        <motion.div 
            className={`min-h-screen py-16 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header Section */}
            <section className="pt-20 pb-12">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="text-center max-w-3xl mx-auto"
                        variants={headerVariants}
                    >
                        <motion.h1 
                            className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                            animate={{ 
                                scale: [1, 1.03, 1],
                                transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                            }}
                        >
                            <Typewriter
                                options={{
                                    strings: ["My Services", "What I Offer", "My Expertise"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </motion.h1>
                        <motion.div 
                            className="w-20 h-1 bg-blue-500 mx-auto mb-8"
                            variants={underlineVariants}
                        ></motion.div>
                        <motion.p 
                            className="text-lg mb-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            I offer a comprehensive range of development services tailored to meet your specific needs.
                            From designing beautiful user interfaces to building powerful backend systems, I'm committed to
                            delivering high-quality solutions that help you achieve your goals.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                    >
                        {services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className={`rounded-xl overflow-hidden shadow-lg p-8 ${darkMode ? "bg-gray-800" : "bg-white"} transition-all duration-300`}
                                custom={index}
                                variants={cardVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <motion.div 
                                    className={`mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                                    variants={iconVariants}
                                    whileHover="hover"
                                >
                                    {service.icon}
                                </motion.div>
                                
                                <motion.h3 
                                    className="text-2xl font-bold mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    {service.title}
                                </motion.h3>
                                <motion.p 
                                    className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    {service.description}
                                </motion.p>
                                
                                <div>
                                    <motion.h4 
                                        className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-400" : "text-gray-700"}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        SKILLS & TECHNOLOGIES
                                    </motion.h4>
                                    <div className="flex flex-wrap gap-2">
                                        {service.skills.map((skill, skillIndex) => (
                                            <motion.span 
                                                key={skillIndex} 
                                                className={`text-xs px-3 py-1 rounded-full ${
                                                    darkMode 
                                                    ? "bg-gray-700 text-blue-300" 
                                                    : "bg-blue-100 text-blue-800"
                                                }`}
                                                custom={skillIndex}
                                                variants={skillVariants}
                                                whileHover="hover"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section 
                className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
                variants={ctaVariants}
            >
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.h2 
                            className="text-3xl font-bold mb-6"
                            animate={{ 
                                scale: [1, 1.03, 1],
                                transition: { 
                                    duration: 2.5, 
                                    repeat: Infinity,
                                    repeatType: "reverse" 
                                }
                            }}
                        >
                            Ready to Work Together?
                        </motion.h2>
                        <motion.p 
                            className="text-lg mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            Let's collaborate to bring your ideas to life. Whether you need a simple website or a complex web application,
                            I'm here to help you achieve your goals with high-quality development services.
                        </motion.p>
                        <button 
                            onClick={() => window.location.href = '/contact'}
                            className={`inline-flex items-center px-8 py-4 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                darkMode 
                                ? "bg-blue-600 hover:bg-blue-700" 
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            <span className="flex items-center">
                                Contact Me
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5 ml-2 transition-transform duration-300" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </button>
                    </motion.div>
                </div>
            </motion.section>
        </motion.div>
    );
};

export default Services; 