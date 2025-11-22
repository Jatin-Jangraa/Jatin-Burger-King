import React, { useEffect, useState } from 'react'
import {IoFastFoodOutline} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import {FiShoppingCart,FiLogIn}from 'react-icons/fi'
import {FaUser}from 'react-icons/fa'
import {motion} from 'framer-motion'
import "./Header.css"
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import toast from 'react-hot-toast'
const Header = () => {



  const {user} = useSelector((state)=>state.user) 
   console.log(user);
    const {orderitems}= useSelector((state) =>state.order.orderdata)

  const [data ,setdata] = useState([])



console.log(length);


  useEffect(() => {
   
    setdata(orderitems)
 

  }, [orderitems])
  

  return (
    <nav>
        <motion.div className='left' initial={{x:"-100%"}} whileInView={{x:"0"}}>
            <IoFastFoodOutline/>
        </motion.div>

        <div className='right'>
            <Link to ="/">Home</Link>
            <Link to ="/contact">Contact</Link>
            <Link to ="/menu">Menu</Link>
         

            {data.length >0 ?

             <Link to ="/cart" className='linklength'><FiShoppingCart/><span className='lengthspan'>{data.length}</span></Link> :<button  onClick={()=>toast.error("Cart Is Empty")}><FiShoppingCart/></button>}
<Link to={user?"/profile":"/login"}>

{user?<img src={user.user.photo} alt="Profile" onError={(e)=>{e.target.onError = null; e.target.src ="http://res.cloudinary.com/dhte80xl2/image/upload/v1751449436/ryske7khyuovbrrer6jf.png"}} className="profile-pic" /> : <FiLogIn/> }

</Link>

        </div>
    </nav>
  )
}

export default Header


