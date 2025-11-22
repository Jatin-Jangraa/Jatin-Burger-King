import React, { useEffect, useState } from "react";
import "./Menu.css";
import {Link}from 'react-router-dom'
import {motion} from 'framer-motion'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { productapi } from "../../../Api";
import {useDispatch} from 'react-redux'
import toast from "react-hot-toast";
const Menu = () => {


  const dispatch = useDispatch();


  const [apidata ,setapidata]  = useState([])

console.log(apidata);


  const data = async () =>{
    
   try {
     const res = await productapi.get("/")

     setapidata(res.data)

    res.json(res.data)
   } catch (error) {
    console.log(error);
    
   }

  }


  useEffect(() => {
    data()
  }, [])
  

  const notavailable = ()=>{
   toast.error("Currently Not Available")
    
  }


 const settings = {
    // dots: true,            // Dots navigation
    infinite: true,        // Looping
    speed: 500,            // Transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,        // Auto slide
    autoplaySpeed: 3000,   // Every 3 seconds
    arrows: false,          // Left/Right buttons
    swipe: true,           // Touch swipe
  };


 


  return (
    <div className="menumain">
      <div className="menucate">


      

    

       <motion.button 
         initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
       className="catedetail">
        <div className="cateimage">
                 <img src="https://res.cloudinary.com/dvkfvgzlp/image/upload/v1751526768/products/pju548nvb96kwzra7tdr.png" alt="" />

        </div>
        <h3 className="catename">Pizza</h3>
       </motion.button>

       <motion.button 
         initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
       className="catedetail">
        <div className="cateimage">
                 <img src="https://res.cloudinary.com/dvkfvgzlp/image/upload/v1751526768/products/pju548nvb96kwzra7tdr.png" alt="" />

        </div>
        <h3 className="catename">Pizza</h3>
       </motion.button>

       <motion.button 
         initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
       className="catedetail">
        <div className="cateimage">
                <img src="https://res.cloudinary.com/dvkfvgzlp/image/upload/v1751526768/products/pju548nvb96kwzra7tdr.png" alt="" />

        </div>
        <h3 className="catename">Pizza</h3>
       </motion.button>

       <motion.button 
         initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
       className="catedetail">
        <div className="cateimage">
          <img src="https://res.cloudinary.com/dvkfvgzlp/image/upload/v1751526768/products/pju548nvb96kwzra7tdr.png" alt="" />
        </div>
        <h3 className="catename">Pizza</h3>
       </motion.button>

       <motion.button 
         initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
       className="catedetail">
        <div className="cateimage">
                  <img src="https://res.cloudinary.com/dvkfvgzlp/image/upload/v1751526768/products/pju548nvb96kwzra7tdr.png" alt="" />

        </div>
        <h3 className="catename">Pizza</h3>
       </motion.button>
       
      
      </div>




      <div className="menuitem">


{apidata &&  apidata.map((itm)=>{

const Itemcontainer =(
      <motion.div className="itembox"
        whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
      
      >

          <div className="itemimage" >
{itm.images.length > 1?<Slider {...settings}>
        {itm.images.map((img, i) => (
          <div key={i}  >
            <img src={img} alt={`Slide ${i}`} style={{width: '100%',padding:"0px 25px",height:"12rem" }} />
          </div>
        ))}
      </Slider>: <img src={itm.images[0]} alt={`Slide `} style={{width: '100%',padding:"0px 25px",height:"12rem" }} />}
          </div>

          <div className="itemdetail">
           <div className="itemdata">
            <p className="itemtime">30min</p>
            <p className="itemseller">{itm.name}</p>
            <p className="itemdiss">60% off</p>
            </div>

            <div className="itemright">
             <div> <p>{parseFloat((Math.random()*5).toFixed(1))}★</p></div>
            </div>
             </div>
        </motion.div>
)

  return(

<>
{itm.available ? (<Link className="itemlink" to={`/menu/${itm._id}`}>{Itemcontainer}</Link>) :(<div  onClick={notavailable} className="itemlink">{Itemcontainer}</div>)}
</>


      
  )
})}

   


      </div>
    </div>
  );
};

export default Menu;




