




import React, { useEffect, useState } from 'react';
import './Transaction.css';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { orderapi } from '../../../Api';

const Transaction = () => {
  const statusOptions = ["Delivered", "Shipped", "Processing"];


 
  

  const initialData = [
    {
      id: 1,
      customername: "Jatin",
      amount: 520,
      status: "Processing",
      _id: "686a64d2609b10986c187b23",
      customerId: "KEuaNSkl0fegkepGvHIZqckSOpA3",
      orderitems: [
        {
          name: "Pizza",
          size: "Large",
          quantity: 1,
          price: 350,
          image: "https://res.cloudinary.com/dvkfvgzlp/image/upload/v1751526768/products/pju548nvb96kwzra7tdr.png",
          additional: [
            { name: "Cold Drink", price: 90 },
            { name: "Chilli Souce", price: 30 }
          ]
        },
         {
          name: "Pizza",
          size: "Large",
          quantity: 1,
          price: 350,
          image: "https://res.cloudinary.com/dvkfvgzlp/image/upload/v1751526768/products/pju548nvb96kwzra7tdr.png",
          additional: [
            { name: "Cold Drink", price: 90 },
            { name: "Chilli Souce", price: 30 }
          ]
        }
      ],
      paymentmode: "COD Payment",
      shippingcharges: 20,
      shippinginfo: {
        Contactno: "8898989",
        flat: "hanuman mandir",
        address: "bhodia khera",
        city: "Fatehabad",
        state: "Haryana",
        country: "India"
      },
      subtotal: 350,
      tax: 63,
      total: 520,
      createdAt: "2025-07-06T11:58:10.152+00:00",
      updatedAt: "2025-07-06T11:58:10.152+00:00"
    },
    
    // Add more items if needed
  ];

  

  const [data, setData] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const updateStatus = async (_id, newStatus) => {
    const updated = data.map(item =>
      item._id === _id ? { ...item, status: newStatus } : item
    );
    setData(updated);
    setActiveDropdown(null);

    try {
      
      const res = await orderapi.put(`/${_id}`,{status :newStatus})

    } catch (error) {
      
    }

  };

  const toggleExpand = (_id) => {
    setExpandedRow(prev => (prev === _id ? null : _id));
  };


  const getdata = async () =>{

    const res = await orderapi.get("/all")

setData(res.data.allorder)
// setData(initialData)


  }



  useEffect(() => {
   getdata()



  }, [])




console.log(data);







  return (
    <div className='adminmain'>
      <Sidebar />

      <div className='adminbox'>
        <div className="transaction-grid-container">
          <h2 className="table-title">Transactions</h2>

          <div className="grid-table">
            <div className="grid-header">
              <div>Customer</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {data?data.map((item, index) => (
              <motion.div
                className="grid-row"
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className='transactionname'>{item.customername}</div>
                <div>₹{item.total}</div>
                <div className={`status-tag ${item.status.toLowerCase()}`}>
                  {item.status}
                </div>
                <div className="action-cell">
                  <button className="btn manage" onClick={async() => {

                        const confirm = window.confirm("Confirm Delete Order")


                        if(confirm){

                       await orderapi.delete(`/${item._id}`);
                         getdata();
                        }
                      }}>
                    <MdOutlineDeleteOutline />
                  </button>
                  <button className="btn update" onClick={() =>
                    setActiveDropdown(prev =>
                      prev === item._id ? null : item._id
                    )
                  }>
                    Update
                  </button>
                  <button className="btn info" onClick={() => toggleExpand(item._id)}>
                    <FaInfoCircle />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item._id && (
                      <motion.div
                        className="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {statusOptions.map(status => (
                          <div
                            key={status}
                            className="dropdown-item"
                            onClick={() => updateStatus(item._id, status)}
                          >
                            {status}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Expanded Info Section */}
                <AnimatePresence>
                  {expandedRow === item._id && (
                    <motion.div
                      className="transaction-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>Order Info</h4>
                      <div><strong>Order ID:</strong> {item._id}</div>
                      <div><strong>Payment Mode:</strong> {item.paymentmode}</div>
                      <div><strong>Shipping Charges:</strong> ₹{item.shippingcharges}</div>
                      <div><strong>Subtotal:</strong> ₹{item.subtotal}</div>
                      <div><strong>Tax:</strong> ₹{item.tax}</div>
                      <div><strong>Total:</strong> ₹{item.total}</div>
                      <div><strong>Date & Time :</strong> {new Date(item.createdAt).toLocaleString()}</div>

                      <h4 style={{ marginTop: "10px" }}>Shipping Info</h4>
                      <div><strong>Contact No:</strong> {item.shippinginfo?.Contactno}</div>
                      <div><strong>Flat:</strong> {item.shippinginfo?.flat}</div>
                      <div><strong>Address:</strong> {item.shippingInfo?.address}</div>
                      <div><strong>City:</strong> {item.shippinginfo?.city}</div>
                      <div><strong>State:</strong> {item.shippinginfo?.state}</div>
                      <div><strong>Country:</strong> {item.shippinginfo?.country}</div>

                      <h4 style={{ marginTop: "10px" }}>Ordered Items</h4>
                      {item.orderitems?.map((product, idx) => (
                        <div key={idx} className="ordered-product">
                          <img src={product.image} alt={product.name} className="product-img" />
                          <div><strong>Name:</strong> {product.name}</div>
                          <div><strong>Size:</strong> {product.size}</div>
                          <div><strong>Quantity:</strong> {product.quantity}</div>
                          <div><strong>Price:</strong> ₹{product.price}</div>

                          {product.additional?.length > 0 && (
                            <div className="additional-section">
                              <strong>Additional Items:</strong>
                              <ul>
                                {product.additional.map((add, i) => (
                                  <li key={i}>
                                   {add.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )):""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;