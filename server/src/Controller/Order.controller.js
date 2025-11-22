import OrderData from "../Models/Order.model.js";

export const neworder = async (req, res) => {


  const {shippinginfo,paymentmode,customername,customerid,subtotal, tax,shippingcharges,total,orderitems} = req.body;


  try {
    
    const order = new OrderData({ shippinginfo,paymentmode,customername,customerid,subtotal, tax,shippingcharges,total,orderitems});
    
    const  savedorder = await order.save()


        res.status(201).json({
          savedorder,
  })

  } catch (error) {
    
  }


};





export const allorder = async (req,res) =>{


    try {
      
      const allorder = await OrderData.find({}).sort({createdAt :-1})
  
      return(
        res.status(201).json({
          allorder
        })
      )
  
    } catch (error) {
      console.log(error);
      
    }


}


export const updateorder = async (req,res) =>{

   try {
    const {  status  } = req.body;

    const updated = await OrderData.findByIdAndUpdate(
      req.params.id,
      {  status : status  },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.log(error);
  }


}


export const  deleteorder = async (req,res) =>{

    try {
      await OrderData.findByIdAndDelete(req.params.id);
      res.json({ message: "Product Deleted" });
    } catch (error) {
      console.log(error);
    }

}


export const ordersbyID = async (req,res) =>{

  try {
    
    const myorders = await OrderData.find({customerid:req.params.id}).sort({createdAt :-1}).limit(6)

    res.json(myorders)

  } catch (error) {
    
  }

}