import UserData from "../Models/User.models.js";

export const checkadmin = async (req,res,next) =>{

    const {userid} = req.body 

    try {
        
        const user = await UserData.findById(userid)

        if(!user) {
            return res.status(404).json({message:"User not Found"})
        }

        if(user.role !=="admin"){
            return res.status(403).json({message:"You are not Admin"})
        }

        
       if(user.role ==="admin"){
           next()
        }

       

    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }

}