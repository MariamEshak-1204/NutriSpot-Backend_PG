// import mongoose from "mongoose"
// import dotenv from "dotenv"

// dotenv.config()

// export function connectToDB (){
//     try{
//         mongoose.connect(process.env.DB_URL).then(()=>{
//             console.log(`connected to DB successfully`)
//         }).catch((e)=>{
//             console.log(`Error to Connect : ${e} `)
//         })
            
//     }catch(e){
//         console.log(`Error : ${e}`)

//     }
// }

import mongoose from "mongoose";

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected to DB");
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};