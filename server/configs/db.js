import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected")
        );
        await mongoose.connect("mongodb+srv://jenbha402:rm0QkW8TFFNaPA4J@cluster0.xthxjpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        console.error(error.message);
    }
}


export default connectDB;