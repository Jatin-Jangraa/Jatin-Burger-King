import React, { useEffect, useState } from 'react'
import "./Item.css"
import { FaLeaf } from "react-icons/fa";
import { motion } from 'framer-motion'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { productapi } from '../../../Api';
import { useDispatch, useSelector } from 'react-redux'
import {addtocart}from '../../../Redux/OrderFeature.js'

const Item = () => {


  const dispatch = useDispatch();


   const itemlist =[
    {name: "Cold Drink",price :90},
    {name:"Chilli Souce" ,price :30},
    {name:"Additional Napkins" ,price :40},
  ]






  

  const order= useSelector((state) =>state.order)
console.log(order);


  const { id } = useParams()


  const [apidata, setapidata] = useState(null)

  console.log(apidata);


  const [addon, setaddon] = useState({
    size: "Medium",
    price:"",
    addon: [],
    totalprice:"",
  })

  console.log(addon);


  const navigate = useNavigate()

let added = 0
console.log(added);


  const addtocarthandler = () => {


  }




  const backtomenu = () => {
    navigate("/menu")
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


  const data = async () => {

    try {
      const res = await productapi.get(`/${id}`)

      setapidata(res.data)


      setaddon({...addon ,price:res.data.price})

    } catch (error) {

    }

  }


  const totalupdater = ()=>{

  
   

  const totaled = addon.addon.reduce((total ,item)=>total=total +item.price,0)

   console.log(totaled);

   setaddon({...addon , totalprice:totaled})
    
  }


  useEffect(() => {

totalupdater()


  }, [addon.addon])




  useEffect(() => {
    data()

totalupdater()


  }, [])



  const images = [
    '.././src/assets/samosa.webp',
    '.././src/assets/pasta.avif',
    '.././src/assets/sand.jpg',
    '.././src/assets/noodle.jpg'
  ];

  const text = `This Food Item Have These Some Ingredients  :   ${apidata ? apidata.ingredients : ""}`


  const styles = {
    container: {
      width: '70%',
      overflow: 'hidden',
      backgroundColor: '#f0f0f0',
      padding: '0px 0',
      // border: '1px solid #ccc',
      whiteSpace: 'nowrap',
    },
    scroller: {
      display: 'inline-block',
    },
    text: {
      fontSize: '1.1rem',
      paddingRight: '50px',
    },
  };



 




  return (
    <div className='itemmainbox'>



      <div className='itemmainheader'>



        <div className='pureveg'>

          <motion.button
            onClick={backtomenu}
            initial={{ x: "-100%" }} whileInView={{ x: "0" }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgb(131, 131, 131)", x: "-10%" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className='backbutton'>
            <FaArrowLeft />
          </motion.button>

          <div className=''>  <p className='vegpure'> <FaLeaf /> Pure Veg</p>

            <p className='vegsellername'>{apidata ? apidata.name : ""}</p>
          </div>
        </div>
        <div className='itemmainrating'>

          <p className='itemmainrate'>{parseFloat((Math.random() * (5 - 2 + 1)).toFixed(1))}★</p>




        </div>


      </div>


      <div className='ingridientsbox'>
        <div style={styles.container}>
          <motion.div
            style={styles.scroller}
            animate={{ x: ['100%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: 'linear'
            }}
          >
            <span style={styles.text}>{text}</span>
          </motion.div>
        </div>
      </div>




      <div className='itemamount'>
        <div className='itemamountimage'>


          <motion.div className="itemamountimag"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, backgroundColor: "transparent" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}

          >
            {apidata ? <div className="itemimage">
              {apidata.images.length > 1 ? <Slider {...settings}>
                {apidata.images.map((img, i) => (
                  <div key={i}  >
                    <img src={img} alt={`Slide ${i}`} style={{ width: '100%', padding: "0px 25px", height: "12rem" }} />
                  </div>
                ))}
              </Slider> : <img src={apidata.images[0]} alt={`Slide `} style={{ width: '100%', padding: "0px 25px", height: "12rem" }} />}
            </div>
              : ""}

            <div className="itemamountdetail">
              <div className="iteamountmdata">
                {/* <p className="itemamounttime">30min</p> */}
                <p className="itemamountseller">{apidata ? apidata.name : ""} </p>
                <p className="itemamountdiss">60% off</p>
              </div>

              <div className="itemamountright">
                <div className='square'> <div className='circle'><FaLeaf /></div></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className='itemsize'>



          <div className='bothdata'>
            <div className='itemsizeselect'>
              <p className='itemsizeselectp'>Size</p>


              <div className='itemsizeselecty'>

                <div className='itemsizeselect_1'>
                  <label>Small</label>
                  <div className='size_internal'>
                    <pre> ₹ {apidata?apidata.price - 30 :""}</pre> <input type="radio" value={apidata?apidata.price - 30 :""} onChange={(e) => { setaddon({ ...addon, size: "small", price: e.target.value }) }}
                      name='Size' />

                  </div>
                </div>


                <div className='itemsizeselect_1'>
                  <label>Medium</label>
                  <div className='size_internal'>
                    <pre>₹ {apidata?apidata.price:""}</pre> <input type="radio" defaultChecked value={apidata?apidata.price:""} onChange={(e) => { setaddon({ ...addon, size: "Medium", price: e.target.value }) }}
                      name='Size' />

                  </div>
                </div>


                <div className='itemsizeselect_1'>
                  <label>Large</label>
                  <div className='size_internal'>
                    <pre>₹ {apidata?apidata.price + 30 :""}</pre> <input type="radio" value={apidata?apidata.price + 30 :""} onChange={(e) => { setaddon({ ...addon, size: "Large", price: e.target.value }) }}
                      name='Size' />

                  </div>
                </div>




              </div>

            </div>

            <div className='itemaddon'>
              <p className='itemsizeselectp'>Add on</p>

              <div className='itemsizeselecty'>


{itemlist.map((itm) =>{
return(
<div className='itemsizeselect_1'>
                  <label>{itm.name}</label>
                  <div className='size_internal'>
                    <pre>{itm.price}</pre> <input type="checkbox"
                    
                    onChange={()=>{   setaddon(prev => {
      const exists = prev.addon.find(i => i.name === itm.name);
      const updatedAddon = exists
        ? prev.addon.filter(i => i.name !== itm.name) // remove
        : [...prev.addon, { name: itm.name, price: itm.price }]; // add

      return {
        ...prev,
        addon: updatedAddon,
      };
    });}}
                      name={itm.name} />

                  </div>
                </div>

)

})}


                






              </div>


            </div>
          </div>


          <div className='add_cart'>

            <motion.button className='cartbutton'
              onClick={() => {

                dispatch(addtocart({

                  productid: apidata._id,
                  name: apidata.name,
                  image: apidata.images[0],
                  quantity: 1,
                  size :addon.size,
                  
                  price:addon.price >0? Number(addon.price ) +Number( addon.totalprice )  :Number(addon.price ) + Number(addon.totalprice),
                  additional:addon.addon,
                }))


                navigate("/menu")

              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgb(134, 134, 134)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >Add to Cart</motion.button>

          </div>

        </div>
      </div>



    </div>
  )
}

export default Item







