import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGODB Connected!");
    } catch(error){
        console.log(error);
    }
}

export default connectDB;