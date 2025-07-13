import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Home from './pages/User/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import Menu from './pages/User/Menu/Menu.jsx'
import Item from './pages/User/Item/Item.jsx'
import Cart from './pages/User/Cart/Cart.jsx'
import Login from './pages/User/Login/Login.jsx'
import Contact from './pages/User/Contact/Contact.jsx'
import Profile from './pages/User/Profile/Profile.jsx'
import Admin from './pages/Admin/AdminDash/Admin.jsx'
import Customer from './pages/Admin/Customer/Customer.jsx'
import Transaction from './pages/Admin/Transaction/Transaction.jsx'
import Product from './pages/Admin/Product/Product.jsx'
import PieChart from './components/Chart/PieChart.jsx'
import Pie from './pages/Admin/Chart/Pie/Pie.jsx'
import Bar from './pages/Admin/Chart/Bar/Bar.jsx'
import Shipping from './pages/User/Shipping/Shipping.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './Firebase.js'
import { userapi } from './Api.js'
import { setUserinfo } from './Redux/UserFeature.js'
import { Toaster } from "react-hot-toast";

const App = () => {


  const dispatch = useDispatch()

    const {orderitems}= useSelector((state) =>state.order.orderdata)
  
    const [data ,setdata] = useState([])
  
    
  
    useEffect(() => {
     
      setdata(orderitems)
  
    }, [orderitems])

  
  const {user} = useSelector((state)=>state.user)


  const userrole = `${user?user.user.role:"user"}`

  console.log(userrole);
  

  useEffect(() => {
    
  
    const unscribe = auth.onAuthStateChanged(async(firebaseuser) => {
      if(firebaseuser){
        const {name , photo , email , role , uid} = firebaseuser


        const res = await userapi.post("/login",{
          name:name,
          uid:uid,
          email:email,
          photo:photo,
          role:role,
            
        })

        dispatch(setUserinfo(res.data))
      }
    })


    return()=>unscribe()

  
  }, [dispatch])
  



  return (
   <Router>
 <Toaster position="bottom-center" />
    <Header/>

    <Routes>

  <Route path='/' element={<Home/>}/>
  <Route path='/menu' element={<Menu/>}/>
  <Route path='/menu/:id' element={<Item/>}/>
 
  {data.length >0 ? <Route path='/cart' element={<Cart/>}/> :<Route path='/cart' element={<Menu/>}/> }
  {data.length >0 ?<> {user?( <Route path='/shipping' element={<Shipping/>}/>):<Route path='/shipping' element={<Login/>}/>}</>:<Route path='/shipping' element={<Menu/>}/> }

  <Route path='/login' element={<Login/>}/>

  
{user?(<Route path='/contact' element={<Contact/>}/>):<Route path='/contact' element={<Login/>}/>}


{user?( <Route path='/Profile' element={<Profile/>}/>):<Route path='/Profile' element={<Login/>}/>}
{user?( <Route path='/shipping' element={<Shipping/>}/>):<Route path='/shipping' element={<Login/>}/>}



 


{userrole === "admin"  ?( <Route path='/admin/dashboard' element={<Admin/>}/>):<Route path='/admin/dashboard' element={<Login/>}/>}
{userrole === "admin"  ?( <Route path='/admin/orders' element={<Transaction/>}/>):<Route path='/admin/orders' element={<Login/>}/>}
{userrole === "admin"  ?( <Route path='/admin/product' element={<Product/>}/>):<Route path='/admin/product' element={<Login/>}/>}
{userrole === "admin"  ?( <Route path='/admin/pie' element={<Pie/>}/>):<Route path='/admin/pie' element={<Login/>}/>}
{userrole === "admin"  ?( <Route path='/admin/bar' element={<Bar/>}/>):<Route path='/admin/bar' element={<Login/>}/>}
{userrole === "admin"  ?( <Route path='/admin/customer' element={<Customer/>}/>):<Route path='/admin/customer' element={<Login/>}/>}

 








    </Routes>

   </Router>
  )
}

export default App














