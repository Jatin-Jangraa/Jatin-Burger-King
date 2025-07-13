import React, { useEffect, useState } from 'react'
import "./Pie.css"
import { motion } from 'framer-motion'
import PieChart from '../../../../components/Chart/PieChart'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import PieComponent from '../../../../components/Chart/PieChart'
import { dashapi } from '../../../../Api'

const Pie = () => {



    
const sampleData = [
  { name: 'Electronics', number: 30 },
  { name: 'Clothing', number: 25 },
  { name: 'Groceries', number: 20 },
  { name: 'Books', number: 15 },
  { name: 'Others', number: 10 },
]


const [apidata ,setapidata] = useState(null)

console.log(apidata);


const getdata =async() =>{
 try {
  
  const res = await dashapi.get("pie")

  setapidata(res.data.charts)

 } catch (error) {
  
 }
}


useEffect(() => {
getdata()
}, [])

  

  return (
    <div className='adminmain'>
        <Sidebar/>
   




        <div className='adminbox adminboxflex'>


  {apidata? <div className='piechartbox'> 
      <h2 className='piechartheading'>Orders Status</h2>
     
      <PieComponent  apidata={{apidata:apidata.orderFullfillment,color: [ '#4BC0C0','#36A2EB', '#FF6384','#FFCE56','#FFCE56','#9966FF',]}}/>
    </div>:""}



  


   
    {apidata? <div className='piechartbox'> 
      <h2 className='piechartheading'>Items Availablity</h2>
      <PieComponent apidata={{apidata:apidata.stockAvailablity,color: ['#9966FF','#36A2EB','#4BC0C0','#FF6384',  '#FFCE56','#FFCE56',]}}/>
    </div>:""}

    {apidata? <div className='piechartbox'> 
      <h2 className='piechartheading'>Revenue Distribution</h2>
      <PieComponent apidata={{apidata:apidata.revenueDistribution,color: [ '#FF6384','#4BC0C0','#36A2EB','#9966FF','#FFCE56']}}/>
    </div>:""}


    {apidata? <div className='piechartbox'> 
      <h2 className='piechartheading'>User Data</h2>
      <PieComponent apidata={{apidata:apidata.adminCustomer,color: [' #4BC0C0','#36A2EB', '#FF6384','#FFCE56','#9966FF']}}/>
    </div>:""}
       


        </div>


      </div>
  )
}

export default Pie