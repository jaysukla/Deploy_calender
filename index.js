const express = require("express");
const mongoose = require('mongoose')
var cors = require('cors')
const connection = mongoose.connect('mongodb+srv://JayShukla:jayshukla@cluster0.9zippbx.mongodb.net/MYCAL?retryWrites=true&w=majority')
const app= express();
app.use(cors())
app.use(express.json())
 let Dbmodel ;
let email;
// Creating new user collection  step 2 
function CDB(nameofcollection){
email=nameofcollection;
const DBCmodel = mongoose.model(nameofcollection,mongoose.Schema({
    title:String,
    discription:String,
    startdate:String,
    enddate:String,
    starttime:String,
    endtime:String,
    email:String
}))

Dbmodel=DBCmodel 
return 1
}
// Creating new user collection step 2








app.get("/",(req,res)=>{
    res.send("Server is Active ")
})

// Creating new user collection step 1
app.post("/regis",(req,res)=>{

    let data= req.body;

    if(email==data.email){

    }else{

let x= CDB(data.email)

res.send({"msg":"usercollection is created "+x})
    }
});
// Creating new user collection step 1

// new event creating 
app.post("/newevent", async(req,res)=>{
    let collection = req.headers.collection
let data = req.body;
if(email==collection){

}else{
    CDB(collection)
}
console.log(collection)

let d= await Dbmodel.aggregate([{$match:{"startdate":data.startdate, "starttime":data.starttime}}])
console.log(data.startdate)

let m= await Dbmodel.aggregate([{$match:{"startdate":data.startdate}}])

let c= 0;
for(let i=0;i<m.length;i++){
    if (m[i].endtime>=data.starttime){
        c++
    }
}
// console.log(d)
if(d.length>0){
    res.send({"msg":"TIME sLOT IS NOT AVAILABLE"})
} 



  
else if(c>0){
    res.send({"msg":"TIME sLOT IS NOT AVAILABLE"})
}else{
  
        Dbmodel.insertMany([data])
    res.send({"msg":"new event added "})
    
    
}




})

// new event creating 

app.get("/allevents",async(req,res)=>{
let collection= req.headers.collection
if(email==collection){

}else{
    CDB(collection)
}

    let data = await Dbmodel.find()

res.send({"msg":"le bhai data","Data":data})

})



app.delete("/delete",async (req,res)=>{
let data = req.body;
if(email==data.email){

}else{
    CDB(data.email)
}
 
let d= await Dbmodel.findOneAndDelete({_id:data.id})


    res.send({"msg":"deleted"})



})









app.listen(8000,()=>{

try {
    connection;
    console.log("Connection to db successful")
} catch (error) {
    
}

    console.log("Listning to port 8000")
})

