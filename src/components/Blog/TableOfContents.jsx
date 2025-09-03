import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TableOfContents = ({ blog, darkMode }) => {
    const [tableOfContents, setTableOfContents] = useState([]);
    const [showTableOfContents, setShowTableOfContents] = useState(false);
    const [activeHeading, setActiveHeading] = useState(null);
    
    // Extract headings for table of contents
    useEffect(() => {
        if (blog?.content) {
            // Use a temporary div to parse the HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = blog.content;
            
            // Find all heading elements
            const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
            
            // Extract heading information
            const toc = Array.from(headings).map((heading, index) => {
                // Create an ID if none exists
                const id = heading.id || `heading-${index}`;
                if (!heading.id) heading.id = id;
                
                return {
                    id,
                    text: heading.textContent,
                    level: parseInt(heading.tagName.charAt(1))
                };
            });
            
            setTableOfContents(toc);
            
            // Only show table of contents if there are at least 3 headings
            setShowTableOfContents(toc.length >= 3);
        }
    }, [blog?.content]);
    
    // Track active heading on scroll
    useEffect(() => {
        if (!showTableOfContents) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -80% 0px' }
        );
        
        // Observe all headings
        tableOfContents.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });
        
        return () => {
            tableOfContents.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) observer.unobserve(element);
            });
        };
    }, [tableOfContents, showTableOfContents]);
    
    // Smooth scroll to heading when clicked
    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Scroll to element with offset for fixed header
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    
    if (!showTableOfContents) {
        return null;
    }
    
    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Table of Contents
            </h3>
            
            <ul className="space-y-3">
                {tableOfContents.map((heading, index) => (
                    <motion.li 
                        key={index} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ 
                            paddingLeft: `${(heading.level - 1) * 0.75}rem`,
                            fontSize: `${1 - (heading.level - 1) * 0.05}rem`
                        }}
                    >
                        <button 
                            onClick={() => scrollToHeading(heading.id)}
                            className={`block text-left w-full hover:text-blue-500 transition-colors ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                            } ${heading.level === 1 ? "font-semibold" : ""} ${
                                activeHeading === heading.id ? "text-blue-500 font-medium" : ""
                            }`}
                        >
                            {heading.text}
                        </button>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;
