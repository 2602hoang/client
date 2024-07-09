
import React, { useEffect, useState } from 'react';


function ProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = () => {
    const windowH = window.innerHeight;
    const documentH = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;
    const scrolled = (scrollY / (documentH - windowH)) * 100;
    setScrollPercent(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const progressBarStyle = {
    height: window.innerWidth >= 768 ?"5px" :`${scrollPercent}%`,
    width: window.innerWidth >= 768 ? `${scrollPercent}%` : '4px', // Adjust width based on screen size
    backgroundColor: "#121212",
  
  };

  return (
    <div 
    className='
    md:w-full md:h-[5px] md:items-center md:top-0 z-50 
    h-full w-1  fixed top-0 left-0 bottom-0'>
      <div style={progressBarStyle}></div>
    </div>
  );
}

export default ProgressBar;