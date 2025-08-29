import React from 'react'
import ProjectCard from '../ProjectCard'
import Testimonials from '../Testimonials'
import HeroSection from '../layout/HeroSection'
import ServicesCard from '../ServicesCard'
import IndustryExperince from '../IndustryExperince'
// import Experience from '../Experience/Experience'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Home = () => {
  const { darkMode } = useSelector((state) => state.theme);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <main className={darkMode ? "bg-gray-900" : "bg-white"}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <HeroSection />
      </motion.div>
      
      
      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <Experience />
      </motion.div> */}
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <ProjectCard />
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <ServicesCard />
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <IndustryExperince />
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <Testimonials />
      </motion.div>
    </main>
  )
}

export default Home