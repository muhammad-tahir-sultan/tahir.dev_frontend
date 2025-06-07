import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Experience = () => {
    const { darkMode } = useSelector((state) => state.theme);

    const freelanceExperience = {
        position: "Freelance MERN Stack Developer",
        company: "Self-Employed",
        location: "Remote (Fiverr, LinkedIn)",
        period: "Sept 2022 - Present",
        description: "Working independently on diverse client projects, delivering full-stack web solutions while managing client relationships and project timelines.",
        responsibilities: [
            "Developing custom websites and web applications using the MERN stack",
            "Creating responsive, user-friendly interfaces with React.js and modern CSS frameworks",
            "Building scalable backend systems with Node.js, Express, and MongoDB",
            "Implementing secure authentication and authorization systems",
            "Collaborating directly with clients to understand requirements and deliver solutions",
            "Providing ongoing maintenance and support for completed projects",
            "Managing multiple projects simultaneously with effective time management",
            "Staying updated with the latest web technologies and best practices"
        ]
    };

    const jobExperiences = [
        {
            position: "MERN Stack Developer",
            company: "Hashtag Web",
            location: "Royal Orchard Multan",
            period: "Sept 2023 – Feb 2024",
            description: "Worked on various web development projects using the MERN stack, focusing on both frontend and backend development while collaborating with a team of developers.",
            responsibilities: [
                "Worked on frontend and backend web development using React.js, Node.js, and MongoDB",
                "Collaborated with a team to build dynamic and responsive web applications",
                "Gained experience in REST API integration and UI/UX enhancement",
                "Implemented responsive designs using Tailwind CSS and Material UI",
                "Participated in code reviews and agile development processes",
                "Troubleshooted and fixed bugs in existing applications",
                "Integrated third-party APIs and services",
                "Developed reusable components to improve code maintainability"
            ],
            achievement: "Successfully completed multiple client projects ahead of schedule, receiving positive feedback for attention to detail and clean code."
        },
        {
            position: "Jr. MERN Stack Developer",
            company: "Max Core Solutions",
            location: "Gulgasht Multan",
            period: "Feb 2022 - Aug 2022",
            description: "Contributed to the development of scalable web solutions using the MERN stack, focusing on optimizing backend logic and maintaining client projects.",
            responsibilities: [
                "Developing scalable web solutions using the MERN Stack",
                "Maintaining client projects and optimizing backend logic",
                "Participated in team sprints and code reviews",
                "Implemented responsive UI designs using modern CSS frameworks",
                "Built RESTful APIs using Express.js and MongoDB",
                "Collaborated on database design and optimization",
                "Assisted in deployment and continuous integration processes",
                "Created and maintained documentation for projects"
            ],
            achievement: "Optimized database queries that resulted in a 40% improvement in application performance for a client's e-commerce platform."
        }
    ];

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const renderExperienceCard = (item, index, isFreelance = false) => {
        return (
            <motion.article
                key={index}
                className={`mb-8 p-4 sm:p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                variants={cardVariants}
                aria-labelledby={`job-title-${index}`}
            >
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <div>
                        <h3 
                            id={`job-title-${index}`} 
                            className="text-xl sm:text-2xl font-bold"
                        >
                            {item.position}
                        </h3>
                        <p className={`text-base sm:text-lg ${darkMode ? "text-blue-300" : "text-blue-600"}`}>{item.company}</p>
                        <div className="flex items-center mt-1">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 mr-1 text-gray-500" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.location}</p>
                        </div>
                    </div>
                    <div className={`md:ml-auto mt-2 w-auto sm:w-56 md:mt-0 px-4 py-2 rounded-full text-sm font-medium ${
                        isFreelance ? (darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600") :
                        (darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600")
                    }`}>
                        <div className="flex items-center">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 mr-1" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span>{item.period}</span>
                        </div>
                    </div>
                </div>

                <p className="mb-4">{item.description}</p>

                <div>
                    <h4 className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>KEY RESPONSIBILITIES</h4>
                    <ul className="space-y-2" aria-label="Job responsibilities">
                        {item.responsibilities.map((responsibility, resIndex) => (
                            <li key={resIndex} className="flex items-start">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-500"}`} 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{responsibility}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`mt-6 px-4 py-3 rounded-lg ${
                    isFreelance ? (darkMode ? "bg-gray-700/60" : "bg-green-50") : 
                    (darkMode ? "bg-gray-700/60" : "bg-blue-50")
                }`}>
                    <div className="flex items-start">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 mt-0.5 mr-2 flex-shrink-0 ${
                                isFreelance ? (darkMode ? "text-green-400" : "text-green-500") :
                                (darkMode ? "text-blue-400" : "text-blue-500")
                            }`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812a3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm">
                            <span className="font-medium">Achievement: </span>
                            {isFreelance ? 
                                "Built and delivered over 15 successful client projects with a 90% client satisfaction rate and multiple 5-star reviews." : 
                                item.achievement
                            }
                        </p>
                    </div>
                </div>
            </motion.article>
        );
    };

    // Add console logging for debugging
    console.log("Experience component rendering");

    return (
        <section 
            id="experience-section" 
            className={`relative py-12 sm:py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`} 
            style={{position: 'relative', zIndex: 1}}
            aria-labelledby="experience-title"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 
                        id="experience-title"
                        className={`text-2xl sm:text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                    >
                        Professional Experience
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className="text-base sm:text-lg max-w-2xl mx-auto">
                        My journey as a professional developer, building real-world solutions and gaining valuable industry experience.
                    </p>
                </motion.div>

                <motion.div 
                    className="max-w-5xl mx-auto"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Freelance Experience (Full Width) */}
                    <div className="mb-8 sm:mb-12">
                        {renderExperienceCard(freelanceExperience, 'freelance', true)}
                    </div>

                    {/* Company Experiences (Side by Side in Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {jobExperiences.map((job, index) => (
                            <div key={index}>
                                {renderExperienceCard(job, index)}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience; 