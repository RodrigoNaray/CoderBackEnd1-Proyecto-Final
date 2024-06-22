import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try{
    mongoose.connect("")
    console.log("MongoDb connected successfully!");
  }catch(error){
    console.log(`Error conectando a MongoDB: ${error}`);
  }
}