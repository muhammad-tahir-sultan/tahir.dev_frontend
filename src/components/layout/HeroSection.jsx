import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const HeroSection = () => {
    const { darkMode } = useSelector((state) => state.theme);

    const originalText = "I craft dynamic, scalable, and user-friendly web applications that drive business growth.";

    const [displayedText, setDisplayedText] = useState(originalText);

    useEffect(() => {
        const handleResize = () => {
            const newText = window.innerWidth <= 768 ? originalText.substring(0, 120) + "..." : originalText;
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
    }, [originalText]);

    return (
        <section className={`${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"} overflow-hidden`} aria-label="Hero section">
            <div className="container mx-auto px-4 sm:px-12 py-16 sm:py-24 md:py-36 lg:py-40 relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="md:w-1/2 lg:w-5/12 md:pr-8 lg:pr-12 mb-10 md:mb-0">
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                            <span className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse" aria-hidden="true"></span>
                                <span>MERN Stack Developer</span>
                            </span>
                        </div>
                        
                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold mb-8 leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Hi, I'm{" "}
                            <span className={`mt-3 ${darkMode ? "text-blue-400" : "text-blue-600"} relative`}>
                                <Typewriter
                                    options={{
                                        strings: ["Muhammad Tahir", "Full Stack Developer", "MERN Specialist"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" aria-hidden="true"></span>
                            </span>
                        </h1>

                        <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-10 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {displayedText}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                to="/contact" 
                                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-white transition-all shadow-lg ${
                                    darkMode 
                                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-900/20 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                }`}
                                aria-label="Contact me to work together"
                            >
                                <span className="flex items-center">
                                    <span aria-hidden="true">📨</span> Let's Work Together
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </Link>
                            <a 
                                href="/Muhammad_Tahir_Resume.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all shadow-lg flex items-center ${
                                    darkMode 
                                        ? "bg-gray-800 text-white hover:bg-gray-700 shadow-gray-900/20 focus:ring-2 focus:ring-gray-500 focus:outline-none" 
                                        : "bg-white text-gray-800 hover:bg-gray-100 shadow-gray-200/50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                }`}
                                aria-label="Download my resume in PDF format"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span aria-hidden="true">📄</span> Download Resume
                            </a>
                        </div>
                        
                        <div className="mt-8 sm:mt-12">
                            <p className={`text-sm font-medium mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Experienced with modern technologies
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Tech Icons */}
                                <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`} title="React" aria-label="React">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle cx="12" cy="12" r="2.139" fill="currentColor"/>
                                        <path fill="currentColor" d="M12,1.25A12.743,12.743,0,0,0,8.794,21.771c.381.066.777.127,1.181.177.622.077,1.263.127,1.922.127.659,0,1.3-.05,1.922-.127.4-.05.8-.111,1.181-.177A12.743,12.743,0,0,0,12,1.25Zm.03,17.75a6.862,6.862,0,0,1-1.98-.281,6.782,6.782,0,0,1,3.96-10.969,6.782,6.782,0,0,1,3.96,10.969A6.862,6.862,0,0,1,12.03,19Z"/>
                                        <path fill="currentColor" d="M12,1.25c-.659,0-1.3.05-1.922.127-.4.05-.8.111-1.181.177A12.743,12.743,0,0,0,12,22.075c.659,0,1.3-.05,1.922-.127.4-.05.8-.111,1.181-.177A12.743,12.743,0,0,0,12,1.25ZM8.05,19a6.862,6.862,0,0,1-1.98-.281,6.782,6.782,0,0,1,3.96-10.969,6.782,6.782,0,0,1,3.96,10.969A6.862,6.862,0,0,1,8.05,19Z"/>
                                    </svg>
                                </div>
                                
                                {/* Node.js */}
                                <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`} title="Node.js" aria-label="Node.js">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill="currentColor" d="M12,1.85a1.51,1.51,0,0,0-.7.17L4.23,6.76A1.46,1.46,0,0,0,3.5,8v8a1.46,1.46,0,0,0,.73,1.2l7.07,4.74a1.51,1.51,0,0,0,1.4,0l7.07-4.74A1.46,1.46,0,0,0,20.5,16V8a1.46,1.46,0,0,0-.73-1.2L12.7,2A1.51,1.51,0,0,0,12,1.85Zm0,5.72A4.43,4.43,0,1,1,7.57,12,4.43,4.43,0,0,1,12,7.57Z"/>
                                    </svg>
                                </div>

                                {/* MongoDB */}
                                <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`} title="MongoDB" aria-label="MongoDB">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill="currentColor" d="M12,2C9.8,2,7.79,4.19,7.79,6.67S9.83,13,12,13s4.21-3.85,4.21-6.33S14.2,2,12,2Zm0,10a3.5,3.5,0,0,1-3.5-3.5A3.5,3.5,0,0,1,12,5a3.5,3.5,0,0,1,3.5,3.5A3.5,3.5,0,0,1,12,12Z"/>
                                        <path fill="currentColor" d="M13.5,14h-3a9.32,9.32,0,0,0-9.5,9.21A.79.79,0,0,0,1.5,24h21a.79.79,0,0,0,.5-.79A9.32,9.32,0,0,0,13.5,14Z"/>
                                    </svg>
                                </div>
                                
                                {/* Express */}
                                <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`} title="Express.js" aria-label="Express.js">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 32 32" aria-hidden="true">
                                        <path fill="currentColor" d="M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.975-5.248c.336-1.61 1.91-2.71 3.87-2.723l15.37-.19c.567-.007.94-.45.94-.878 0-.35-.305-.634-.674-.674L5.513 5c-1.87-.164-4.16.53-4.83 2.75l-1.017 5.478c-.31 1.65.135 3.185 1.67 3.35l15.922 2.03c.45.055.897-.296.897-.75 0-.452-.385-.945-.803-.977L1.69 15.76c-.63-.06-.76-.53-.63-1.073l.036-.19.407-2.26c.072-.408.25-.6.548-.578l18.055.495s.612.043.775.336c.164.292.077.628-.284.8l-.36.166c-.45.21-.976.254-1.484.254l-14.645.1s-1.06-.013-1.87.63c-.604.476-.596 1.2-.48 1.86l.398 2.244c.068.38.243.76.45 1.023.208.264.5.49.82.63.322.14.678.214 1.05.214h.024l17.43-1.028c1.85-.108 3.6-1.543 3.92-3.194l1.056-5.272c.08-.386.124-.78.132-1.17.02-.938-.222-1.74-.662-2.33-.366-.49-.898-.873-1.57-1.12-.675-.25-1.487-.366-2.358-.348l-17.41.154c-1.96.018-3.603 1.562-3.962 3.192L0 16.37v-.002c.026-.008-.185-.646-.01-.942z"/>
                                    </svg>
                                </div>
                                
                                {/* Tailwind */}
                                <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`} title="Tailwind CSS" aria-label="Tailwind CSS">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill="currentColor" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 lg:w-7/12 relative">
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-3xl ${darkMode ? "bg-blue-900/20" : "bg-blue-100/50"} transform rotate-6`} aria-hidden="true"></div>
                            
                            {/* Hero Image */}
                            <img 
                                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" 
                                alt="Web developer coding on a computer with multiple monitors showing code" 
                                className="relative z-10 rounded-3xl shadow-xl object-cover w-full max-w-xl lg:max-w-2xl mx-auto transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl" 
                            />
                            
                            {/* Floating badge - increased z-index */}
                            <div className={`absolute -bottom-4 -right-4 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`} aria-hidden="true">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="pl-3 sm:pl-4">
                                        <p className="text-sm sm:text-base font-medium">3+ Years Experience</p>
                                        <p className="text-xs sm:text-sm opacity-75">Full Stack Developer</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Tech stack badge - increased z-index */}
                            <div className={`absolute -top-4 -left-4 px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg z-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`} aria-hidden="true">
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs sm:text-sm font-medium">MERN Stack</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave divider */}
            <div className={`${darkMode ? "text-gray-800" : "text-white"}`} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                    <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    )
}

export default HeroSection
