
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptycart } from "../Redux/OrderFeature";
import { confirmapi, orderapi } from "../Api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
function RazorpayButton({ amount }) {



  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderdetails = useSelector((state) =>state.order.orderdata)
  const email = useSelector((state) => state.user.user.user.email)
  

  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_PAYMENT_link;
    script.async = true;
    document.body.appendChild(script);
  }, []);


  const [loading,setloading] = useState(false)


  const handlePayment =  async () => {

    setloading(true)

    const options = {
      key:"rzp_test_lxf9brpVOj4KUj" , // Replace with your Razorpay key ID
    
      // key: import.meta.env.VITE_PAYMENT, // Replace with your Razorpay key ID
      amount: amount * 100, // Razorpay amount is in paise
      currency: "INR",
      name: "Jatin's Burger King",
      description: " Payment ",
      handler:async function  (response) {
        console.log(response);

        if (response) {
         

          try {

           const res =  await orderapi.post("/",orderdetails)

           const smsres = await confirmapi.post("/",{email:email ,  orderId :res.data.savedorder._id,  orderitems :res.data.savedorder})
           
          
           
  toast.success("Successfully Ordered")
 dispatch(emptycart())
  navigate("/profile")
 
setloading(false)

          } 
          
          
        


          catch (error) {
setloading(false)
          }

        }

      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <motion.button disabled={loading} style={{width:"100%" ,height:"100%"}} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="submit-btn "onClick={handlePayment}>{loading?"Please Wait ...":`Pay  Online ₹${amount}`}</motion.button>;
}

export default RazorpayButton;