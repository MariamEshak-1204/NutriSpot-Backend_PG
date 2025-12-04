import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export function connectToDB (){
    try{
        mongoose.connect(process.env.DB_URL).then(()=>{
            console.log(`connected to DB successfully`)
        }).catch((e)=>{
            console.log(`Error to Connect : ${e} `)
        })
            
    }catch(e){
        console.log(`Error : ${e}`)

    }
}
