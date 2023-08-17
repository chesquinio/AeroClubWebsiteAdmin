import mongoose from "mongoose";

export function mongooseConnect() {
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise()
    } else {
        const uri = process.env.MONGO_URI;
        console.log('Connected')
        return mongoose.connect(uri)
    }
}