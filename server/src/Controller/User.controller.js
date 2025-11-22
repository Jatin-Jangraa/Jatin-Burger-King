import UserData from "../Models/User.models.js";





export const login = async (req, res) => {

    
  const { name, uid, photo ,email} = req.body;

  try {
    const existinguser = await UserData.findOne({ uid });

    if (existinguser) {
      res.status(201).json({ user: existinguser });
    }

    if (!existinguser) {
      try {
        const user = new UserData({ name, uid, photo,email });
        const saveduser = await user.save();

        res.status(201).json({
          user: saveduser,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    
  }
};







export const allusers = async (req , res)=>{

  try {
    
    const alluser = await UserData.find({})

    return(
      res.status(201).json({
        alluser
      })
    )

  } catch (error) {
    console.log(error);
    
  }


}



export const deleteuser = async (req,res) =>{

  try {
    
    const deleteuser =await UserData.findOne({uid:req.params.uid})

    await deleteuser.deleteOne()

    res.json({
      message:"User Deleted Successfully"
    })


  } catch (error) {
    console.log(error);
    
  }

}