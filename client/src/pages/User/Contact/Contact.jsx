

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contact.css';
import { motion } from 'framer-motion';
import { FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';
import { contactapi } from '../../../Api';
import { useSelector } from 'react-redux';
import { FaSnapchat } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Contact = () => {

  const {user} = useSelector((state)=>state.user) 
  const [loading,setloading] = useState(false)

  const [formData, setFormData] = useState({ name: user?user.user.name:"", email: user? user.user.email:"", message: '' });

  const navigate = useNavigate()

  useEffect(() => {
   

    setFormData({...formData,name: user?user.user.name:"", email: user? user.user.email:""})

  }, [user])
  

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)

      if(!user){
         navigate("/login")
        toast.error("Please Login Before Contact .")
        }

    try {
      await contactapi.post("/", formData);

      toast.success('Message sent successfully!');
      setFormData({ ...formData, message: '' });
      setloading(false)
    } catch (error) {
      console.log(error);
      
      alert('Failed to send message.');
      setloading(false)

    }
  };

  return (
    <div className="contact-page">
      <div className="contactmainbox">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="contact-container"
        >
          <h2>CONTACT US</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name"  placeholder="Name" required value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            <textarea name="message" placeholder="Message..." rows="3" required value={formData.message} onChange={handleChange} />
            <button type="submit" disabled={loading}> {loading?"Sending ...":"Send"}</button>
          </form>
        </motion.div>
      </div>
 <motion.footer
       initial ={{y:50 ,opacity:0}}
       whileInView={{y:0, opacity:1}}
       transition={{duration:0.6}}
       className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Commerce Burger Wala</h2>
          <p>We are trying to give you the best taste possible.</p>
          <p><em>We give attention to genuine feedback.</em></p>
          <p className="rights">All rights received @jatin_burgerking</p>
        </div>

        <div className="footer-right">
          <h3>Follow Me .</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/jatin_jangr.a?igsh=MTE5enczdnZzeGVnNw%3D%3D&utm_source=qr"><FaInstagram /></a>
            <a href="https://snapchat.com/t/N6lsQfWe"><FaSnapchat /></a>
            <a href="https://github.com/Jatin-Jangraa?tab=repositories"><FaGithub /></a>
          </div>
        </div>
      </div>
    </motion.footer>
   
    </div>
  );
};

export default Contact;