import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { darkMode } = useSelector((state) => state.theme);

  const originalText =
    "Transforming ideas into exceptional digital experiences with clean code and innovative solutions.";

  const [displayedText, setDisplayedText] = useState(originalText);

  useEffect(() => {
    const handleResize = () => {
      const newText =
        window.innerWidth <= 768
          ? originalText.substring(0, 120) + "..."
          : originalText;
      setDisplayedText(newText);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [originalText]);

  return (
    <section
      className={`${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } overflow-hidden`}
    >
      <div className="container mx-auto px-6 md:px-12 py-24 md:py-36 lg:py-40 relative">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hi, I’m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Muhammad Tahir
              </span>
            </h1>
            <div className="mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
              <Typewriter
                options={{
                  strings: [
                    "Full Stack Developer",
                    "Webflow Expert",
                    "MERN Stack Engineer",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
              {displayedText}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transform transition"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className={`px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transform transition ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="relative group w-full lg:w-1/2 flex justify-center"
          >
            {/* Gradient Glow Behind Image */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-pink-400/20 blur-2xl opacity-70 group-hover:opacity-90 transition"></div>

            {/* Hero Image */}
            <img
              src="/tahir.jpg"
              alt="Muhammad Tahir - Full Stack Developer"
              className="relative z-10 rounded-3xl shadow-xl object-cover w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto transform transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
            />

            {/* Floating Glass Badge (Experience) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -right-6 px-6 py-3 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/70 shadow-lg z-20"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-semibold">Available for Hire</p>
                  <p className="text-sm opacity-75">Full Stack Dev</p>
                </div>
              </div>
            </motion.div>

            {/* Tech Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-6 -left-6 px-5 py-2 rounded-xl backdrop-blur-md bg-white/80 dark:bg-gray-800/70 shadow-lg z-20"
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">MERN + Webflow</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className={`${darkMode ? "text-gray-800" : "text-white"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
