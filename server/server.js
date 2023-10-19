const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/MyCRUD2').then(()=>{

 console.log('conneted to mongoDB')
}).catch((err)=>{console.log(err)})


const customerSchema = new mongoose.Schema({
   name:String,
   email:String,
   age:String,
   phone: String,
   location: String,
   occupation:String 
}, {timestamps:true})
const Customer = mongoose.model("customer", customerSchema)


app.get("/receive", async(req, res)=>{
   try {
     const customer = await Customer.find({})
      res.status(200).json({success:true, customer:customer})
   } catch (error) {
    res.json(error)
   }
})

app.post("/posts", async(req, res)=>{
    try {
      const newCustomer = new Customer(req.body)
       await newCustomer.save()
       res.status(200).json({ success:true, message:"customer created sucessfully", newCustomer:newCustomer})
    } catch (error) {
     res.json(error)
    }
 })
 
 app.put("/update", async(req, res)=>{
    const {_id, name, email, phone, age, location, occupation}=req.body
    try {
      const customer = await Customer.findByIdAndUpdate({_id:_id},{name, email, phone, age, location, occupation})
       const data = await customer.save()
       res.json({ success:true, message:"customer data updated sucessfully", data:data})
    } catch (error) {
     res.json(error)
    }
 })

 app.delete("/delete/:id", async(req, res)=>{
    
    try {
    const {id}=req.params
    const data = await Customer.findByIdAndDelete(id)
    res.json({ sucess:true, message:"customer data deleted sucessfully", data:data})
    } catch (error) {
     res.json(error)
    }
 })

app.listen(9000, ()=>{
    console.log('server is running on port 9000')
})
