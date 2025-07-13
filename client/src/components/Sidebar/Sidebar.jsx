import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { IoBarChart } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
// import { FaChartLine } from "react-icons/fa";
// import { FaStopwatch } from "react-icons/fa6";
// import { FaBitcoin } from "react-icons/fa";
// import { IoTicketOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { IoMenu } from "react-icons/io5";


import { Link, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = () => {


const Sidebarbuttons = ()=>{
  return(
    <> <div className='adminbuttoncom'>
          <h4>Main</h4>

          <div className='buttongroup'>






            <motion.button
            onClick={()=>{navigate("/admin/dashboard")}}

              // initial={{ x: -100, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              className={`${location.pathname.includes("/admin/dashboard") ? "box" : "dashbutton"}`}>
              <MdDashboard />Dasboard
            </motion.button>

          </div>
        </div>

        <div className='adminbuttoncom'>
          <h4>Manage</h4>

          <div className='buttongroup'>



            <motion.button
            onClick={()=>{navigate("/admin/orders")}}

              // initial={{ x: -100, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              className={`${location.pathname.includes("/admin/orders") ? "box" : "dashbutton"}`}>
              <GrTransaction />Orders
            </motion.button>

            <motion.button
            onClick={()=>{navigate("/admin/product")}}

              // initial={{ x: -100, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              className={`${location.pathname.includes("/admin/product") ? "box" : "dashbutton"}`}>
              <AiOutlineProduct />Product
            </motion.button>

            
            <motion.button
            onClick={()=>{navigate("/admin/customer")}}
              // initial={{ x: -100, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              className={`${location.pathname.includes("/admin/customer") ? "box" : "dashbutton"}`}
              
              >
              <FaUser />Customer
            </motion.button>

          </div>
        </div>


        <div className='adminbuttoncom'>
          <h4>Charts</h4>

          <div className='buttongroup'>





            <motion.button
            onClick={()=>{navigate("/admin/bar")}}

              // initial={{ x: -100, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              className={`${location.pathname.includes("/admin/bar") ? "box" : "dashbutton"}`}>
              <IoBarChart />Bar
            </motion.button>

            <motion.button
            onClick={()=>{navigate("/admin/pie")}}

              // initial={{ x: -100, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              className={`${location.pathname.includes("/admin/pie") ? "box" : "dashbutton"}`}>
              <FaChartPie />Pie
            </motion.button>
          </div>
        </div></>
  )
}


  const navigate = useNavigate()


  

   const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };


  const location = useLocation()




  return (
    <>

 {isMobile ? (





<div>

 {isMobile && (





        <div className="menu-button">
         <div className='adminheader'>
           <button   className='menubtn' onClick={() => setIsOpen(true)}>
            <IoMenu/>
           </button>
            <p>Dashboard</p>
         </div>

          <motion.div
          className=" mobile"
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="close-button" onClick={() => setIsOpen(false)}>
            ✕
          </div>
          <Sidebarbuttons/>
        </motion.div>
        </div>
      )}
      





</div>




 ):( <div className="sidebar">

        


        

       <Sidebarbuttons/>


       



      </div>)}



    

    </>

  )
}



export default Sidebar;