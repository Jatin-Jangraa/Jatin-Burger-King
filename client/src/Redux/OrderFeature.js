

import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState ={

  
 orderdata:{
    shippinginfo:{
        flat:"",
        address:"",
        contactno :"",
        city:"",
        state:"",
        country:"",
    },
    paymentmode:"",
    customerid:"",
    customername:"",
    subtotal:"",
    tax:"",
    shippingcharges:"",
    total:"",
    orderitems:[] }

}

const orderslice = createSlice({
    name :'order',
    initialState,
    reducers:{

  
        updateorder :(state,action)=>{
            state.orderdata = {...state.orderdata,...action.payload}

        },
       
        addtocart:(state,action)=>{

            const index = state.orderdata.orderitems.find((i)=>i.productid ===action.payload.productid)

            if(index ) {
                toast.error("Item Already in Cart")
            }
            else{toast.success("Added to Cart")
            state.orderdata.orderitems.push(
         
              action.payload
             
            )}
 
        },

        increase:(state,action)=>{

            const {productid,newnumber}= action.payload

          const item = state.orderdata.orderitems.find((i)=>i.productid===productid)

          if(item){toast.success("Increase 1 Quantity")
            Object.assign(item,newnumber)
          }
          

        }
        ,decrease:(state,action)=>{

            const {productid,newnumber}= action.payload

          const item = state.orderdata.orderitems.find((i)=>i.productid===productid)

          if(item){toast.success("Decreased 1 Quantity")
            Object.assign(item,newnumber)
          }
          
          

        }

,
        remove_from_cart :(state,action)=>{

            const {productid} = action.payload
            state.orderdata.orderitems =state.orderdata.orderitems.filter((i)=>i.productid !== productid)

        },


      emptycart:(state)=>{

        state.orderdata.orderitems =[]
      }

       
        
    }
})


export const  {updateorder,addtocart,remove_from_cart,increase,decrease,totalcalculation,updatepayment,emptycart}  = orderslice.actions;

export default orderslice.reducer;


















