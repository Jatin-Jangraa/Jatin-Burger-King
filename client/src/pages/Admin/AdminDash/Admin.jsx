import React, { useEffect, useState } from 'react'
import "./Admin.css"

import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";


import Sidebar from '../../../components/Sidebar/Sidebar'
import { motion } from 'framer-motion';
import { dashapi } from '../../../Api';
import DualLineChart from '../../../components/Chart/Chart';



const Admin = () => {





  const [apidata, setapidata] = useState(null)
  console.log(apidata);




  const [data,setdata] = useState(null)



  console.log(data);
  
  const datafun = async () => {

    try {

      const res = dashapi.get("/stats")


      setapidata((await res).data.stats)

      setdata((await res).data.stats.chart)


    } catch (error) {

    }
  }


  useEffect(() => {

    datafun()



  }, [])



  const Widget = ({ heading, amount, percent, circle, color }) => {
    return (
      <>
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}

          className="item">
          <div className="left-item">
            <p className="heading">{heading}</p>
            <div className="amount">
              <p>{amount}</p>
            </div>

            {percent > 0 ? (
              <div className="percent">
                <p className="color">
                  <FaArrowTrendUp />
                </p>
                <p className="color">{percent}%</p>
              </div>
            ) : (
              <div className="percent">
                <p className="red">
                  <FaArrowTrendDown />
                </p>
                <p className="red">{percent}%</p>
              </div>
            )}
          </div>

          <div className="right-item">
            {percent > 0 ? (
              <div
                className="outer"
                style={{
                  background: `conic-gradient(
                  ${color} ${(Math.abs(percent) / 100) * 360}deg,
                  rgb(255,255,255)0

                )`,
                }}
              >
                <div className="graph">{percent}%</div>
              </div>
            ) : (
              <div className="outer">
                <div className="graph">
                  <p>{percent}%</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </>
    );
  };








  return (
    <div className='adminmain'>
      <Sidebar />

      <div className='adminbox'>

        <div className='adminstats'>

          {apidata ?

            <Widget heading={apidata.count.revenue.name}
              amount={apidata.count.revenue.amount}
              percent={(apidata.changePercent.revenue).toString().slice(0, 3)}
              color={'#FF6384'}
            />
            : ""}


             {apidata ?

            <Widget heading={apidata.count.product.name}
              amount={apidata.count.product.amount}
              percent={(apidata.changePercent.product).toString().slice(0, 3)}
              color={ '#FFCE56'}
            />
            : ""}


             {apidata ?

            <Widget heading={apidata.count.user.name}
              amount={apidata.count.user.amount}
              percent={(apidata.changePercent.user).toString().slice(0, 3)}
              color={'#4BC0C0'}
            />
            : ""}


             {apidata ?

            <Widget heading={apidata.count.transaction.name}
              amount={apidata.count.transaction.amount}
              percent={(apidata.changePercent.order).toString().slice(0, 3)}
              color={'#36A2EB'}
            />
            : ""}





        </div>



        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='adminchatrt'>
          
          

          {data?<DualLineChart  data={data}/>:<div>"Please Wait.."</div>}

        </motion.div>



      </div>
    </div>



  )
}

export default Admin