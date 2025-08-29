import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
    const { darkMode } = useSelector((state) => state.theme);

    // Array of catchy taglines for developers
    const catchyLines = [
        "Transforming ideas into exceptional digital experiences with clean code and innovative solutions.",
        "Crafting pixel-perfect interfaces that convert visitors into loyal customers.",
        "Building scalable web solutions that grow with your business needs.",
        "Turning complex problems into elegant, efficient code that drives results.",
        "Creating seamless user experiences that keep your customers coming back."
    ];

    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const originalText = catchyLines[currentLineIndex];
    const [displayedText, setDisplayedText] = useState(originalText);

    // Change the tagline every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLineIndex((prevIndex) => (prevIndex + 1) % catchyLines.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Update displayed text when original text changes or on resize
    useEffect(() => {
        const handleResize = () => {
            const newText = window.innerWidth <= 768 ? catchyLines[currentLineIndex].substring(0, 120) + "..." : catchyLines[currentLineIndex];
            setDisplayedText(newText);
        };

        // Set initial text
        handleResize();

        // Update text on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentLineIndex, catchyLines]);

    return (
        <section className={`${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"} overflow-hidden`}>
            <div className="container mx-auto px-12 py-24 md:py-36 lg:py-40 relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="md:w-1/2 lg:w-5/12 md:pr-8 lg:pr-12 mb-10 md:mb-0">
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                            <span className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                                MERN Stack Developer
                            </span>
                        </div>

                        <h1 className={`text-4xl xl:text-5xl md:text-7xl lg:text-5xl font-extrabold mb-8 leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Hi, I'm{" "}
                            <span className={`mt-3 ${darkMode ? "text-blue-400" : "text-blue-600"} relative`}>
                                <Typewriter
                                    options={{
                                        strings: ["Muhammad Tahir", "Full Stack Developer", "MERN Specialist"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                            </span>
                        </h1>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentLineIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className={`text-lg md:text-xl mb-10 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                                {displayedText}
                            </motion.p>
                        </AnimatePresence>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                className={`px-8 py-4 rounded-lg font-medium text-white transition-all shadow-lg ${darkMode
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-900/20"
                                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30"
                                    }`}
                            >
                                <span className="flex items-center">
                                    📨 Let's Work Together
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </Link>
                            <a
                                href="/Muhammad_Tahir_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-8 py-4 rounded-lg font-medium transition-all shadow-lg flex items-center ${darkMode
                                    ? "bg-gray-800 text-white hover:bg-gray-700 shadow-gray-900/20"
                                    : "bg-white text-gray-800 hover:bg-gray-100 shadow-gray-200/50"
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                📄 Download Resume
                            </a>
                        </div>

                        <div className="flex-1 text-center md:text-left mt-10 pl-2">

                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <a href="http://github.com/tahir-sigmadevelopers/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors ">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/muhammadtahirsultan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/tahirdev.tahirsultanofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/tahirsultanofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="https://wa.me/923266640988" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 lg:w-7/12 relative">
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-3xl ${darkMode ? "bg-blue-900/20" : "bg-blue-100/50"} transform rotate-6`}></div>

                            {/* Hero Image */}
                            <img
                                src="/tahir.jpg"
                                alt="Muhammad Tahir - Full Stack Developer"
                                className="relative z-10 rounded-3xl shadow-xl object-cover w-full max-w-xl  mx-auto transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            />

                            {/* Floating badge - increased z-index */}
                            <div
                                className={`absolute -bottom-4 -right-4 px-6 py-3 rounded-lg shadow-lg z-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                                    }`}
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            {/* Example SVG */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 4v16m8-8H4"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="pl-4">
                                        <p className="text-base font-medium">Service Offer</p>
                                        <p className="text-sm opacity-75">MERN Stack + Webflow</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tech stack badge - increased z-index */}
                            <div
                                className={`absolute -top-4 -left-4 px-4 py-2 rounded-lg shadow-lg z-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    {/* Briefcase SVG */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12h6m-9 8h12a2 2 0 002-2V9a2 2 0 00-2-2h-3V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2H6a2 2 0 00-2 2v9a2 2 0 002 2z"
                                        />
                                    </svg>

                                    <span className="text-sm font-medium">Available For Hire</span>
                                </div>
                            </div>

                        </div>

                        {/* Tech icons - increased z-index */}
                        <div className="flex justify-center mt-6 space-x-4 relative z-20">
                            {/* React */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="2.139" fill="currentColor" />
                                    <path fill="currentColor" d="M12,1.25A12.743,12.743,0,0,0,8.794,21.771c.381.066.777.127,1.181.177.622.077,1.263.127,1.922.127.659,0,1.3-.05,1.922-.127.4-.05.8-.111,1.181-.177A12.743,12.743,0,0,0,12,1.25Zm.03,17.75a6.862,6.862,0,0,1-1.98-.281,6.782,6.782,0,0,1,3.96-10.969,6.782,6.782,0,0,1,3.96,10.969A6.862,6.862,0,0,1,12.03,19Z" />
                                    <path fill="currentColor" d="M12,1.25c-.659,0-1.3.05-1.922.127-.4.05-.8.111-1.181.177A12.743,12.743,0,0,0,12,22.075c.659,0,1.3-.05,1.922-.127.4-.05.8-.111,1.181-.177A12.743,12.743,0,0,0,12,1.25ZM8.05,19a6.862,6.862,0,0,1-1.98-.281,6.782,6.782,0,0,1,3.96-10.969,6.782,6.782,0,0,1,3.96,10.969A6.862,6.862,0,0,1,8.05,19Z" />
                                </svg>
                            </div>

                            {/* Node.js */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,1.85a1.51,1.51,0,0,0-.7.17L4.23,6.76A1.46,1.46,0,0,0,3.5,8v8a1.46,1.46,0,0,0,.73,1.2l7.07,4.74a1.51,1.51,0,0,0,1.4,0l7.07-4.74A1.46,1.46,0,0,0,20.5,16V8a1.46,1.46,0,0,0-.73-1.2L12.7,2A1.51,1.51,0,0,0,12,1.85Zm0,5.72A4.43,4.43,0,1,1,7.57,12,4.43,4.43,0,0,1,12,7.57Z" />
                                </svg>
                            </div>

                            {/* MongoDB */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,2C9.8,2,7.79,4.19,7.79,6.67S9.83,13,12,13s4.21-3.85,4.21-6.33S14.2,2,12,2Zm0,10a3.5,3.5,0,0,1-3.5-3.5A3.5,3.5,0,0,1,12,5a3.5,3.5,0,0,1,3.5,3.5A3.5,3.5,0,0,1,12,12Z" />
                                    <path fill="currentColor" d="M13.5,14h-3a9.32,9.32,0,0,0-9.5,9.21A.79.79,0,0,0,1.5,24h21a.79.79,0,0,0,.5-.79A9.32,9.32,0,0,0,13.5,14Z" />
                                </svg>
                            </div>

                            {/* Tailwind */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave divider */}
            <div className={`${darkMode ? "text-gray-800" : "text-white"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                    <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    )
}

export default HeroSection
