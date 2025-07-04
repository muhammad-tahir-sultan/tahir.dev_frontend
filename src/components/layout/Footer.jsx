import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { darkMode } = useSelector((state) => state.theme);
    
    const currentYear = new Date().getFullYear();
    
    // Social media links
    const socialLinks = [
        { 
            name: "YouTube", 
            url: "https://www.youtube.com", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
            ) 
        },
        { 
            name: "Facebook", 
            url: "https://www.facebook.com/selftaughtstunts1", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
            ) 
        },
        { 
            name: "GitHub", 
            url: "https://www.github.com/tahir-sigmadevelopers", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            ) 
        },
        { 
            name: "LinkedIn", 
            url: "https://www.linkedin.com/in/", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
            ) 
        },
        { 
            name: "Instagram", 
            url: "https://www.instagram.com/sigmadevelopers_ceo", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            ) 
        }
    ];
    
    // Quick links
    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Projects", path: "/projects" },
        { name: "Blogs", path: "/blogs" },
        { name: "Contact", path: "/contact" }
    ];
    
    // Skills
    const skills = [
        "MERN Stack Development",
        "Full Stack Web Apps",
        "React Native Development",
        "Next.js Applications",
        "API Development"
    ];
    
    return (
        <>
            <footer className={`${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Main footer content */}
                    <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3 lg:grid-cols-4">
                        {/* Personal info */}
                        <div>
                            <div className="flex items-center">
                                <img 
                                    src="/logo.png" 
                                    alt="Muhammad Tahir" 
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <span className={`ml-3 text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    Muhammad Tahir
                                </span>
                            </div>
                            <p className="mt-4 text-sm">
                                I craft dynamic, scalable, and user-friendly web applications that drive business growth.
                            </p>
                            <div className="mt-6 flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`${darkMode 
                                            ? "text-gray-400 hover:text-white" 
                                            : "text-gray-500 hover:text-gray-900"} 
                                            transition-colors duration-200`}
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        
                        {/* Quick links */}
                        <div>
                            <h3 className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>
                                Quick Links
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={link.path}
                                            className={`text-sm ${darkMode 
                                                ? "text-gray-400 hover:text-white" 
                                                : "text-gray-500 hover:text-gray-900"} 
                                                transition-colors duration-200`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Skills */}
                        <div>
                            <h3 className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>
                                My Expertise
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {skills.map((skill, index) => (
                                    <li key={index}>
                                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            {skill}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Contact */}
                        <div>
                            <h3 className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>
                                Contact Me
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:tahirsultanofficial@gmail.com" className={`text-sm ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} transition-colors duration-200`}>
                                        tahirsultanofficial@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        +92 326 6640988 || +92 324 1553013
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        Multan, Pakistan
                                    </span>
                                </li>
                                <li className="mt-4">
                                    <Link 
                                        to="/contact"
                                        className={`inline-flex items-center text-sm font-medium ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"} transition-colors duration-200`}
                                    >
                                        Send me a message
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Bottom bar */}
                    <div className={`border-t ${darkMode ? "border-gray-800" : "border-gray-200"} py-6 text-center text-sm`}>
                        <p>© {currentYear} Muhammad Tahir - Full Stack Developer. All rights reserved.</p>
                        <p className="mt-2">
                            <a href="/Muhammad_Tahir_Resume.pdf" target="_blank" rel="noopener noreferrer" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} transition-colors duration-200`}>
                                Download Resume
                            </a>
                            <span className="mx-2">·</span>
                            <Link to="/contact" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} transition-colors duration-200`}>
                                Hire Me
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
            
            {/* WhatsApp Floating Button */}
            <a 
                href={`https://wa.me/923266640988`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
                aria-label="Chat on WhatsApp"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512" 
                    className="w-6 h-6 fill-current"
                >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
            </a>
        </>
    )
}

export default Footer