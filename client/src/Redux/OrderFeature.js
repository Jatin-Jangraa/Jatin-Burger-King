// import {createSlice} from '@reduxjs/toolkit'
// import toast from 'react-hot-toast'

// const initialState ={

  
  
  

//     cartItems: [], // array of { id, name, price, quantity, image, etc. }
//   shippingInfo: {
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//   },
//   paymentMethod: "", // "cash" or "online"
//   orderSummary: {
//     subTotal: 0,
//     tax: 0,
//     shippingCharges: 0,
//     total: 0,
//   },
  
//   }  

// const calculateSummary = (cartItems) => {
//   const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const tax = subTotal * 0.18; // 18% GST
//   const shippingCharges = subTotal > 1000 ? 0 : 50;
//   const total = subTotal + tax + shippingCharges;

//   return { subTotal, tax, shippingCharges, total };
// };



// const orderslice = createSlice({
//     name :'order',
//     initialState,
//     reducers:{

//      addToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.cartItems.find((i) => i.id === item.id);

//       if (existingItem) {
//         existingItem.quantity += item.quantity;
//       } else {
//         state.cartItems.push(item);
//       }

//       state.orderSummary = calculateSummary(state.cartItems);
//     },

//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
//       state.orderSummary = calculateSummary(state.cartItems);
//     },

//     updateShippingInfo: (state, action) => {
//       state.shippingInfo = { ...state.shippingInfo, ...action.payload };
//     },

//     setPaymentMethod: (state, action) => {
//       state.paymentMethod = action.payload; // "cash" or "online"
//     },

//     clearCart: (state) => {
//       state.cartItems = [];
//       state.orderSummary = {
//         subTotal: 0,
//         tax: 0,
//         shippingCharges: 0,
//         total: 0,
//       };
       
//     }
//     }
// })


// export const {
//   addToCart,
//   removeFromCart,
//   updateShippingInfo,
//   setPaymentMethod,
//   clearCart,
// } = orderslice.actions;


// export default orderslice.reducer;












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


















