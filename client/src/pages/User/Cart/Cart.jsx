import React, { useEffect } from 'react'
import "./Cart.css"
import { FaLeaf } from "react-icons/fa";
import { FaPlus ,FaMinus} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {increase,decrease, remove_from_cart, updateorder} from '../../../Redux/OrderFeature.js'
import toast from 'react-hot-toast';

const Cart = () => {

  const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.user)
    const {orderitems}= useSelector((state) =>state.order.orderdata)
    const orderinfo = useSelector((state) =>state.order.orderdata)
console.log(orderinfo);

    const[data , setadata] = useState([])
     const [price, setprice] = useState(null)

    console.log(data);
    console.log(price);
    
    


    const updatame = ()=>{


      setadata(orderitems)


       let estimate = 0;
    let num = 0

    for (let i = 0; i < orderitems.length; i++) {
      const item = orderitems[i];

      estimate += item.price * item.quantity
      num += item.quantity
    }


     setprice({
      subtotal: Number(estimate), tax: Number(Math.round(estimate * 0.18)), shippingcharges:Number( num * 20), total: Number((estimate) +  Number(Math.round(estimate * 0.18)) +Number( num * 20))
    })


    

    }


    useEffect(() => {
    

      
      updatame()



    }, [orderitems])
    
  

    


  const navigate = useNavigate()


  return (

<>

{data.length > 0 ? (

    
   <div className='cartmain'>
    <div className='cartleft'>

  {data? data.map((itm) =>{

return (

    <motion.div className='cartdatabox' 
     initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}>
      <div  className='cartdataboximage'><img src={itm.image} alt="" /></div>
      <div className='cartdataboxdata'>
        <div className=''> 
           <p className='vegpure'> <FaLeaf/> Pure Veg</p>
           </div>
           

           <div className='cartitemsellername'><p>{itm.name}</p></div>
           </div>
      <div className='cartdataboxadd'>


      <div className='cartdataboxaddbutton'> 

         <button  onClick={()=>{
          {
                          itm.quantity > 1 ? dispatch(decrease({
                            productid: itm.productid,
                            newnumber: {
                              quantity: itm.quantity - 1
                            }
                          }))
                            : ""
                        }
        }}><CiSquareMinus/></button>
       
        <p className='itemcount'>{itm.quantity}</p>
       
         <button onClick={ () =>{

 dispatch(increase({
                            productid: itm.productid,
                            newnumber: {
                              quantity: itm.quantity + 1
                            }
                          }))

         }}><CiSquarePlus/></button>
        </div>

        <button className='cartdeletebtn' onClick={()=>{
             dispatch(remove_from_cart({
                          productid: itm.productid
                        }))
        }}><MdDelete/></button>
      </div>
    </motion.div>

)

  }):""}
   

 


    </div>




    <div className='cartright'>
      <motion.div
        initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
      className='cartrightbox'>
        <div className='cartrightboxheader'>
          <p>Bill Summary</p>
        </div>
        <div className='cartrightboxmid'>
            <div className='cartmidprice'><p>Item Total</p><p>{price.subtotal}</p></div>
            <div className='cartmidprice'><p>Delivery Charger</p><p>{price.shippingcharges}</p></div>
            <div className='cartmidprice'><p>Tax</p><p>{price.tax}</p></div>
            <div className='cartmidprice  carttotalborder' ><p className='carttotal'>Total</p><p className='carttotal'>{price.total}</p></div>
           
        </div>
        <div className='cartrightboxbottom'>
          <motion.button 
           whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, backgroundColor: "#e97014" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className='cartcheckoutbutton'
          onClick={()=>{

            if(!user){ navigate("/shipping")
              toast.error("Please Login before Order.")
            }

            dispatch(updateorder({total:price.total,subtotal:price.subtotal,tax:price.tax, customername:user.user.name,customerid:user.user.uid ,shippingcharges
:price.shippingcharges}))

            {data.length>0 ?

           navigate("/shipping")
:toast.error("Please Add Items")}
          }}
          >Check Out</motion.button>
        </div>

      </motion.div>
    </div>
   </div>):""
    }

</>
  )
}

export default Cart