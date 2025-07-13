import React from 'react'
import "./Bar.css"
import { motion } from 'framer-motion'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import BarChart from '../../../../components/Chart/BarChart'
import { useState } from 'react'
import { useEffect } from 'react'
import { dashapi } from '../../../../Api'
const Bar = () => {


  const [apidata ,setapidata] = useState(null)
console.log(apidata);


const chartdata = {
  label: ['Food', 'Rent', 'Travel', 'Shopping', 'Others'],
  number:[3000, 12000, 50, 7000, 2000,1000]
}




  const datafun = async () => {
  
      try {
  
        const res = dashapi.get("/bar")
  
  
        setapidata((await res).data.charts)
  
  
  
      } catch (error) {
  
      }
    }
  
  
    useEffect(() => {
  
      datafun()
  
  
  
    }, [])





  return (
    <div className='adminmain'>
        <Sidebar/>
   
        <div className='adminbox '>

  {apidata ?   <div className='barbox' style={{background: '#f9f9f9'}}>
      <h2 style={{ textAlign: 'center' }}>Orders</h2>
      <BarChart chartdata={{label :apidata.months ,number:apidata.orders,color: [ '#36A2EB', '#FFCE56','#FFCE56','#4BC0C0','#9966FF','#FF6384',]}} />
    </div>:""}



{apidata ?   <div className='barbox' style={{background: '#f9f9f9'}}>
      <h2 style={{ textAlign: 'center' }}>Users</h2>
      <BarChart chartdata={{label :apidata.months ,number:apidata.users,color: [ '#36A2EB','#FF6384','#4BC0C0','#9966FF','#FFCE56','#FFCE56']}} />
    </div>:""}
 

      {apidata ?   <div className='barbox' style={{background: '#f9f9f9'}}>
      <h2 style={{ textAlign: 'center' }}>Food Items</h2>
      <BarChart chartdata={{label :apidata.months ,number:apidata.products,color: [ '#FF6384', '#FFCE56','#4BC0C0','#9966FF','#FFCE56','#36A2EB', ]}} />
    </div>:""}  

  



        </div>

      </div>
  )
}

export default Bar;













