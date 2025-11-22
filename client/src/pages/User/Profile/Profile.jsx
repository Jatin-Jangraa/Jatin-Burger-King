
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase.js";
import { setUserinfo } from "../../../Redux/UserFeature";
import { orderapi } from "../../../Api.js";
import { FaInfoCircle } from "react-icons/fa";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apidata = async () => {
    try {
      const res = await orderapi.get(`/orders/${user ? user.user.uid : ""}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    apidata();
  }, []);

  const handleLogout = () => {
    const confirm = window.confirm("Confirm Logout");
    if (confirm) {
      signOut(auth);
      dispatch(setUserinfo(null));
      navigate("/login");
    }
  };

  const userdata = {
    role: `${user ? `${user.user.role}` : "user"}`,
    name: `${user ?` ${user.user.name}` : "User"}`,
    email: `${user ?` ${user.user.email}` : ""}`,
    profilePic: `${
      user ?` ${user.user.photo}` : "././src/assets/USer_Icon.png"
    }`,
  };

  return (
    <div className="body">
      <motion.div
        className="profile-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Profile Header */}
        <motion.div
          className="profile-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <img
            src={userdata.profilePic}
            alt="Profile"
            onError={(e) => {
              e.target.onError = null;
              e.target.src =
                "http://res.cloudinary.com/dhte80xl2/image/upload/v1751449436/ryske7khyuovbrrer6jf.png";
            }}
            className="profile-pic"
          />
          <div className="adminsection">
            <div>
              <h2>{userdata.name}</h2>
              <p>{userdata.email}</p>
            </div>

            {userdata.role === "admin" ? (
              <motion.button
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1, backgroundColor: "#3498db" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3>Admin</h3>
              </motion.button>
            ) : (
              ""
            )}
          </div>
        </motion.div>



              {orders.length >0 ?"":""}


        {/* Orders Section */}
        <motion.div
          className="orders-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3>My Orders</h3>
        
        {orders.length >0 ?  <ul>
            {orders &&
              orders.map((order) => (
          

<li
  key={order._id}
  className={`order-card ${selectedOrderId === order._id ? "expanded" : ""}`}
>
<div className="order-top">
  <div className="order-column order-items">
    {order.orderitems.map((itm, idx) => (
      <span key={idx} className="order-item-name">
        {itm.name}
      </span>
    ))}
  </div>

  <div className={`order-column order-status ${order.status.toLowerCase()}`}>
    {order.status}
  </div>

  <div className="order-column order-icon">
    <FaInfoCircle
      className="info-icon"
      onClick={() =>
        setSelectedOrderId(selectedOrderId === order._id ? null : order._id)
      }
    />
  </div>
</div>

  {/* Inside the same div, reveal more info if selected */}
  <motion.div
    className="order-extra-info"
    initial={{ height: 0, opacity: 0 }}
    animate={{
      height: selectedOrderId === order._id ? "auto" : 0,
      opacity: selectedOrderId === order._id ? 1 : 0,
    }}
    transition={{ duration: 0.3 }}
  >
    {selectedOrderId === order._id && (
      <>
        <p><strong>Payment:</strong> {order.paymentmode}</p>

        <p className="strongp"><strong>Order ID:</strong> {order._id}</p>
        <p className="strongp"><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p className="strongp"><strong>Total Items:</strong> {order.orderitems.length}</p>
        <p className="strongp"><strong>Total Price:</strong> ₹{order.total}</p>
        <p className="strongp"><strong>tax :</strong> ₹{order.tax}</p>
        <p className="strongp"><strong>Delivery Charges:</strong> ₹{order.shippingcharges}</p>
        {order.orderitems.map((itm, idx) => (
          <div key={idx} className="info-item">
            <p className="strongp"><strong>Item:</strong> {itm.name}</p>
            <p className="strongp"><strong>Price:</strong> ₹{itm.price}</p>
          </div>
        ))}
      </>
    )}
  </motion.div>
</li>


              ))}
          </ul>:<><div className="noorder">No Orders Items Yet !</div></>}


        </motion.div>

        {/* Logout Button */}
        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          whileTap={{ scale: 0.99 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1, backgroundColor: "#e5230d" }}
          transition={{ type: "spring", stiffness: 400, damping: 5 }}
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Profile;