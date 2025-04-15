import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now },
  });

const Contact = mongoose.models.address || mongoose.model('contact', contactSchema)
  
export default Contact