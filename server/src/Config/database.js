import mongoose from 'mongoose'


const connectdb = async () =>{
try {
    mongoose.connect(process.env.DATABASE,{dbName:"burgerking"})


    console.log(`db connected successfully`);
    
} catch (error) {
    
}
}


export default connectdb