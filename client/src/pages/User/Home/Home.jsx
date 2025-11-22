import React from 'react'
import {motion}from 'framer-motion'
import "./Home.css"
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {


  const navigate = useNavigate()

const menuhandler = ()=>{
  navigate("/menu")
}


  const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};


  return (

    <div className='homemain'>

    <div className='homebox1'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
      className='homebox11'>
         <motion.h1
           initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
         >Commerce <span className='burger'>Burger</span>  Wala</motion.h1>
         <h3 
        >Give Yourself a tasty Burger</h3>
        <motion.button onClick={menuhandler}
       whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "#e97014" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
      > Explore Menu</motion.button>
      </motion.div>
      <div className='homebox12'>
      
    <motion.button
     onClick={menuhandler}
       initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}><img src="http://res.cloudinary.com/dhte80xl2/image/upload/v1749965972/m3mhy3rfcuyg4l4rggot.jpg" alt="" /></motion.button>
      </div>
    </div>



    <div className='homebox2'>
 <motion.button 
  onClick={menuhandler}
    initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
  whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}className='sandbutton'><img src="http://res.cloudinary.com/dhte80xl2/image/upload/v1752118773/kp18j2qesipqzgapuqmx.png" alt="" className='sandimage'/></motion.button>
   <motion.button 
    onClick={menuhandler}
     initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
   whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}className='sandbutton'><img src="http://res.cloudinary.com/dhte80xl2/image/upload/v1752118828/nxz39wtteafmum2zvhnn.webp" alt="" className='sandimage'/></motion.button> 
  <motion.button 
   onClick={menuhandler}
    initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
  whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}className='sandbutton'><img src="http://res.cloudinary.com/dhte80xl2/image/upload/v1752118860/hq13i8gwlxnd7iuvy3sm.jpg" alt="" className='sandimage'/></motion.button>
     <motion.button 
      onClick={menuhandler}
       initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
           whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}className='sandbutton'><img src="http://res.cloudinary.com/dhte80xl2/image/upload/v1752119073/yr3vlentsadfavvuqeim.jpg" alt="" className='sandimage'/></motion.button>
     <motion.button 
      onClick={menuhandler}
       initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
           whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}className='sandbutton'><img src="http://res.cloudinary.com/dhte80xl2/image/upload/v1752119104/ujz0jbmtqsgnjawyv08l.avif" alt="" className='sandimage'/></motion.button>
     <motion.button 
      onClick={menuhandler}
       initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
           whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}className='sandbutton'><img src="http://res.cloudinary.com/dhte80xl2/image/upload/v1752119137/lhogzlvc3x7slny28jai.jpg" alt="" className='sandimage' /></motion.button> 

    </div>
   
   
   </div>
  )
}

export default Home

