import React from 'react'
import Typewriter from 'typewriter-effect';
import { useSelector } from 'react-redux';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
    const { darkMode } = useSelector((state) => state.theme);
    const { scrollY } = useScroll();
    
    // Parallax effect values for different sections
    const heroParallax = useTransform(scrollY, [0, 500], [0, -100]);
    const skillsParallax = useTransform(scrollY, [300, 800], [100, -100]);
    const educationParallax = useTransform(scrollY, [800, 1300], [100, -100]);

    const softSkills = [
        {
            title: "Team Communication",
            description: "Effective collaboration with cross-functional teams to achieve project goals and deliver results.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            title: "Problem Solving",
            description: "Analytical thinking and creative approach to tackle complex technical challenges and find optimal solutions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "Time Management",
            description: "Efficiently managing multiple projects and deadlines while maintaining high-quality standards.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Adaptability",
            description: "Quick learning and adaptation to new technologies, frameworks, and project requirements.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            )
        }
    ];

    const techSkills = [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase",
        "Tailwind CSS",
        "Bootstrap",
        "React Native",
        "Django",
        "C# Software Development",
        "REST APIs",
        "Git/GitHub",
        "Vercel/Netlify/Render",
        "JWT Authentication",
        "Cloudinary"
    ];

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} min-h-screen`}>
            {/* Hero Section */}
            <section className="relative mb-32">
                <motion.div 
                        style={{ 
                        y: heroParallax,
                        backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
                        backgroundAttachment: "fixed" 
                    }}
                    className={`w-full h-[400px] overflow-hidden bg-cover bg-center ${darkMode ? "bg-gray-800" : ""}`}
                >
                    <div className={`w-full h-full ${darkMode ? "bg-gradient-to-b from-gray-900/80 to-gray-900/95" : "bg-gradient-to-b from-gray-800/50 to-gray-900/80"} flex items-center justify-center`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                <Typewriter
                                    options={{
                                        strings: ["About Me", "My Background", "My Journey"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                                Passionate developer crafting digital experiences that make a difference
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className={`max-w-5xl mx-auto rounded-2xl shadow-2xl p-8 md:p-10 -mt-24 mb-16 ${
                            darkMode 
                                ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" 
                                : "bg-white border border-gray-100"
                        }`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                    >
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className="relative"
                                >
                                    {/* Animated gradient border */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-md opacity-70"></div>
                                    <img 
                                        className="h-52 w-52 rounded-full object-cover shadow-lg relative border-4 border-white dark:border-gray-800" 
                                        src="/tahir.png" 
                                        alt="Muhammad Tahir" 
                                    />
                                    
                                    {/* Experience badge */}
                                    <motion.div 
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                        className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 text-sm font-bold shadow-lg"
                                    >
                                        MERN + Webflow
                                    </motion.div>
                                </motion.div>
                            </div>
                            <div className="md:w-2/3 md:pl-10">
                                <motion.h2 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"}`}
                                >
                                    Muhammad Tahir
                                </motion.h2>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="text-lg mb-4"
                                >
                                    I'm a passionate Full Stack Developer from a middle-class background, turning complex problems into efficient, scalable solutions. With 2.5+ years of experience, I specialize in building dynamic applications using the MERN stack.
                                </motion.p>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="text-lg"
                                >
                                    I believe in continuous learning, delivering real value, and writing clean, maintainable code that helps businesses grow and succeed in the digital world.
                                </motion.p>
                                
                                {/* Skills tags */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="mt-6 flex flex-wrap gap-2"
                                >
                                    {["MERN Stack", "React", "Node.js", "MongoDB", "Express", "Next.js"].map((skill, index) => (
                                        <motion.span 
                                            key={index}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.7 + (index * 0.1) }}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                darkMode 
                                                    ? "bg-blue-900/30 text-blue-300 border border-blue-800" 
                                                    : "bg-blue-50 text-blue-700 border border-blue-100"
                                            }`}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <motion.section 
                style={{ y: skillsParallax }}
                className={`py-20 ${darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"}`}>Technical Skills</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg max-w-2xl mx-auto">
                            My expertise spans across various technologies in the web development ecosystem.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {techSkills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className={`p-5 rounded-xl text-center ${
                                    darkMode 
                                        ? "bg-gray-800 border border-gray-700 hover:border-blue-500" 
                                        : "bg-white hover:bg-blue-50 border border-gray-100 hover:border-blue-300"
                                } shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                                whileHover={{ 
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                {/* Decorative gradient corner */}
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rotate-45 transform scale-0 group-hover:scale-100 transition-transform duration-300 opacity-20"></div>
                                
                                <span className="block text-lg font-medium relative z-10">{skill}</span>
                                
                                {/* Skill level indicator */}
                                <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${70 + Math.floor(Math.random() * 30)}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 + (index * 0.05) }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute left-0 top-1/2 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
                </div>
            </motion.section>

            {/* Soft Skills Section */}
            <section className="py-20 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"}`}>Soft Skills</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg max-w-2xl mx-auto">
                            Beyond technical expertise, these qualities help me deliver exceptional results.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {softSkills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className={`p-8 rounded-2xl ${
                                    darkMode 
                                        ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700" 
                                        : "bg-white/80 backdrop-blur-sm border border-gray-100"
                                } shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group`}
                                whileHover={{ y: -8, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Decorative background gradient */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                
                                <div className={`mb-6 text-4xl ${darkMode ? "text-blue-400" : "text-blue-600"} group-hover:scale-110 transition-transform duration-300 transform`}>
                                    {skill.icon}
                                </div>
                                
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">{skill.title}</h3>
                                
                                <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
                                
                                {/* Animated underline on hover */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education & Certifications */}
            <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Education & Certifications</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            My formal education and ongoing learning journey.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            className={`p-6 rounded-lg mb-6 ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-xl font-bold">Bachelor of Computer Science</h3>
                            <p className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>Bahauddin Zakariya University Multan,Punjab Pakistan - 2021-2025</p>
                            <p>Focused on Software Engineering, Web Development,App Development, Algorithms, C#, Networking,Cyber Security, and Data Structures.</p>
                        </motion.div>

                        <motion.div
                            className={`p-6 rounded-lg mb-6 ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <h3 className="text-xl font-bold">Full Stack Web Development</h3>
                            <p className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>MERN Stack Specialization, Sept-2021 - March-2022</p>
                            <p>Comprehensive training in MongoDB, Express, React, and Node.js development from youtube and google started from <span className='font-bold text-blue-600'><a href="https://youtube.com/@codewithharry" target='_blank' rel='noopener noreferrer'>CodeWithHarry</a></span> and <span className='font-bold text-blue-600'><a href="https://youtube.com/@6packprogrammer" target='_blank' rel='noopener noreferrer'>SixPackProgrammer</a></span>.</p>
                        </motion.div>

                        <motion.div
                            className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg mb-6`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <h3 className="text-xl font-bold">React Native Mobile Development</h3>
                            <p className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>Mobile App Development, Feb-2023 - March-2024</p>
                            <p>Specialized training in building cross-platform mobile applications with React Native from youtube and google. Existing experience in React JS helped me to learn React Native quickly.</p>
                        </motion.div>
                        <motion.div
                            className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <h3 className="text-xl font-bold">Next JS - Web Development</h3>
                            <p className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>Next JS Website Development, June-2024 - July-2024</p>
                            <p>Specialized training in building websites with Next JS from youtube and google. Existing experience in React JS helped me to learn Next JS quickly. I learned from <a href="https://www.youtube.com/@sonnysangha" target='_blank' rel='noopener noreferrer' className='font-bold text-blue-600'>Sonny Sangha</a>, <a href="https://www.youtube.com/@cleverprogrammer" target='_blank' rel='noopener noreferrer' className='font-bold text-blue-600'>Clever Programmer</a> and <a href="https://www.youtube.com/@codewithharry" target='_blank' rel='noopener noreferrer' className='font-bold text-blue-600'>CodeWithHarry</a>.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Resume Download */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Download My Resume</h2>
                        <p className="text-lg mb-8">
                            Get a comprehensive overview of my skills, experience, and qualifications.
                        </p>

                        <a
                            href="Muhammad_Tahir_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center px-8 py-4 rounded-lg font-medium text-white transition-all transform hover:scale-105 ${darkMode
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Complete Resume
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;