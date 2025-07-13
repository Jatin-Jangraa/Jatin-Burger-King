import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Shipping.css";
import { useDispatch, useSelector } from "react-redux";
import { emptycart, updateorder } from "../../../Redux/OrderFeature";
import { confirmapi, locationapi, orderapi } from "../../../Api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import RazorpayButton from "../../../components/Payment";
const ShippingPage = () => {

  const naviagate = useNavigate()

    const dispatch = useDispatch()
  
    const paymentamount = useSelector((state) =>state.order.orderdata.total)
    console.log(paymentamount);

    

const shippinginfo = useSelector((state) =>state.order.orderdata.shippinginfo)

const paymenttype = useSelector((state) =>state.order.orderdata.paymentmode)

const orderdetails = useSelector((state) =>state.order.orderdata)
const email = useSelector((state) => state.user.user.user.email)
console.log(email);

console.log(orderdetails);



  const [address, setAddress] = useState({
    flat: shippinginfo.flat   || "",
    area: shippinginfo.address   || "",
    Contactno: shippinginfo.Contactno ||"",
    city: shippinginfo.city   || "",
    state: shippinginfo.state   || "",
    country: shippinginfo.country   || "",
  });


  const addressupdate = () =>{
  dispatch(updateorder({
    paymentmode:paymentMethod,
    shippinginfo:{
               flat:address.flat,
               address: address.area,
               Contactno:address.Contactno,
            city: address.city,
            state: address.state,
            country: address.country}}))

  }

  const [paymentMethod, setPaymentMethod] = useState(paymenttype || "Online Payment");

  const [loadingorder ,setloadingorder]= useState(false)

  useEffect(() => {
   addressupdate()
    

  }, [address , paymentMethod])
  


  const [loading, setLoading] = useState(false);

  const handleLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log(`lati =${latitude}  long = ${longitude}`);
        
        try {
          const res = await locationapi.get(`/?lat=${latitude}&lon=${longitude}`)
          
         
          const data= res.data;
           
console.log(data);



          const components = data.address;

          setAddress({
            flat: components.house_number || address.flat,
            area: components.suburb || components.neighbourhood || address.area,
            city: components.city || components.town ||components.state_district || components.village || "",
            state: components.state || components.state_district  ||"",
            country: components.country || "",
          });


             dispatch(updateorder({shippinginfo:{
               flat: components.suburb || components.neighbourhood || "",
               address: components.house_number || "",
            city: components.city || components.town || components.village || "",
            state:components.state || components.state_district  ||"",
            country: components.country||  "",
             }}))

        } catch (error) {
          alert("Failed to fetch address.");
          console.log(error);
          
        }
        setLoading(false);
      },
      () => {
        alert("Unable to fetch location");
        setLoading(false);
      }
    );
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    setloadingorder(true)

    const { flat, area, city, state, country ,Contactno} = address;
    if (!flat || !area || !city || !state ||!Contactno || !country || !paymentMethod) {
      alert("Please fill all fields.");
      return;
    }



    if(paymentMethod !== "Online Payment"){
        try {
          
          const res = await orderapi.post("/",orderdetails)
console.log(res.data);


          const smsres = await confirmapi.post("/",{email:email ,  orderId :res.data.savedorder._id,  orderitems :res.data.savedorder})

         
              toast.success("Successfully Ordered")
            dispatch(emptycart())
            naviagate("/profile")
            

           
          setloadingorder(false)


        } catch (error) {
          console.log(error);
          setloadingorder(false)
          
        }
    }
    


   
    
  };

  return (
    <motion.div className="shipping-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Shipping Information</h2>

      <form className="shipping-form" onSubmit={handleSubmit}>
        <button type="button" onClick={handleLocation} className="location-btn" disabled={loading}>
          {loading ? "Fetching..." : "Use Current Location"}
        </button>

        <label>Flat / Home / Building</label>
        <input type="text" name="flat" value={address.flat} onChange={handleChange} />

        <label>Area / Locality</label>
        <input type="text" name="area" value={address.area} onChange={handleChange} />

         <label>Contact No.</label>
        <input type="text" name="Contactno" value={address.Contactno} onChange={handleChange} />


        <label>City</label>
        <input type="text" name="city" value={address.city} onChange={handleChange} />

        <label>State</label>
        <input type="text" name="state" value={address.state} onChange={handleChange} />

        <label>Country</label>
        <input type="text" name="country" value={address.country} onChange={handleChange} />

        <label>Payment Method</label>
        <div className="payment-options">

          {paymentamount >600 ?"": <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>}

         
          <label>
            <input
              type="radio"
              name="payment"
              value="Online Payment"
              checked={paymentMethod === "Online Payment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment
          </label>
        </div>

        {paymentMethod === "Online Payment" ? 
          <RazorpayButton  amount={paymentamount} >  </RazorpayButton> 
           :
         <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="submit-btn" disabled={loadingorder}>
        {loadingorder ?"Please Wait ..." :`Confirm Order  ₹ ${paymentamount}`}
        </motion.button>}



       
      </form>
    </motion.div>
  );
};

export default ShippingPage;










