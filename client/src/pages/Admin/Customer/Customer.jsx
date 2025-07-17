import React from 'react'
import "./Customer.css"
import Sidebar from '../../../components/Sidebar/Sidebar'
import { motion } from 'framer-motion'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from 'react';
import { userapi } from '../../../Api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { data } from 'react-router-dom';
const Customer = () => {




  const {user} = useSelector((state)=>state.user.user) 



  const [users,setusers] = useState(null);

console.log(users);

  const alluser = async ()=>{
  try {
      const res = await userapi.post("/alluser",{userid:user._id})


      setusers(res.data.alluser)

  } catch (error) {
    
  }


  }



  useEffect(() => {
    alluser()
  
   
  }, [])
  


  const deletehandler = async (uid) =>{
    
    try {
      const confirm = window.confirm("Are You Sure to Delete User Permanentally")


    if(confirm){
      const res = await userapi.delete(`/delete/${uid}`,{data:{userid:user._id}})

      alluser()

    }
    } catch (error) {
     console.log(error);
      
    }

  }




  return (
    <div className='adminmain'>
        <Sidebar/>
   
        <div className='adminbox'>







    <div className="table-container">
      <h2 className="title">Customer List</h2>
      <div className="table-header">
        <span>Photo</span>
        <span>Name</span>
        <span>Role</span>
        <span>Action</span>
      </div>

      {users?users.map((user, index) => (
        <motion.div
          key={user.id}
          className="table-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <img src={user.photo} alt="profile" onError={(e)=>{e.target.onError = null; e.target.src ="http://res.cloudinary.com/dhte80xl2/image/upload/v1751449436/ryske7khyuovbrrer6jf.png"}} className="profile-pic" />
          <span className='usersname' >{user.email}</span>
          <span>{user.role}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="userdelete-btn"
            onClick={()=>deletehandler(user.uid)  }
            style={{justifySelf:"end"}}
          >
            <MdOutlineDeleteOutline/>
          </motion.button>


        </motion.div>
      )):""}
    </div>
  



       
        </div>


      </div>
  )
}

export default Customer