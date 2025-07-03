import React from 'react'
import Typewriter from 'typewriter-effect';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const About = () => {
    const { darkMode } = useSelector((state) => state.theme);

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
            <section className="relative mb-24">
                <div className={`w-full h-[300px] overflow-hidden bg-cover bg-center ${darkMode ? "bg-gray-800" : ""}`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}>
                    <div className={`w-full h-full ${darkMode ? "bg-gray-900/70" : "bg-gray-800/50"} flex items-center justify-center`}>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            <Typewriter
                                options={{
                                    strings: ["About Me", "My Background", "My Journey"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className={`max-w-4xl mx-auto rounded-lg shadow-xl p-8 -mt-20 mb-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                                <img className="h-48 w-48 rounded-full object-cover shadow-lg" src="/logo.png" alt="Muhammad Tahir" />
                            </div>
                            <div className="md:w-2/3 md:pl-8">
                                <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Muhammad Tahir</h2>
                                <p className="text-lg mb-4">
                                    I'm a passionate Full Stack Developer from a middle-class background, turning complex problems into efficient, scalable solutions. With 1.5+ years of experience, I specialize in building dynamic applications using the MERN stack.
                                </p>
                                <p className="text-lg">
                                    I believe in continuous learning, delivering real value, and writing clean, maintainable code that helps businesses grow and succeed in the digital world.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Technical Skills</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            My expertise spans across various technologies in the web development ecosystem.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {techSkills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className={`p-4 rounded-lg text-center ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-md transition-all duration-300`}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <span className="block text-lg font-medium">{skill}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Soft Skills Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Soft Skills</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            Beyond technical expertise, these qualities help me deliver exceptional results.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {softSkills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className={`mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                                <p>{skill.description}</p>
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