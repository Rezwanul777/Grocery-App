import mongoose from "mongoose";

const mongodbUrl= process.env.DB_URL

if(!mongodbUrl){
    throw new Error("Mongodb url is not defined")
}

let cache= global.mongoose

if(!cache){
  cache=  global.mongoose= {conn: null, promise: null}
}

const connectToDatabase= async ()=>{
    if(cache.conn){
        return cache.conn
    }

    if(!cache.promise){
        cache.promise =  mongoose.connect(mongodbUrl).then((conn)=>conn.connection)
    }

    try {
        const conn= await cache.promise
        return conn
    } catch (error) {
        console.error("Database connection failed", error)
    }
}

export default connectToDatabase;