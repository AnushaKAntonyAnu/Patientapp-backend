const express=require("express")
const mongoose=require("mongoose")
const  cors=require("cors")
const bcrypt=require("bcrypt")
const loginModel = require("./models/admin")
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://anusha:anusha13@cluster0.hyxpaoy.mongodb.net/patientsDB?retryWrites=true&w=majority&appName=Cluster0")


app.get("/test",(req,res)=>{
    res.json({"status":"success"})
})

app.post("/adminSignup",(req,res)=>{
    let input=req.body
    let hashedpassword=bcrypt.hashSync(input.password,10)
    //console.log(hashedpassword)
    input.password=hashedpassword
    console.log(input)
    let result = new loginModel(input)
    result.save()
    res.json({"status":"success"})

})

app.post("/adminSignin",(req,res)=>{
    let input=req.body
    let result=loginModel.find({username:input.username}).then(
    (response)=>{
        if(response.length>0){
            const validator=bcrypt.compareSync(input.password,response[0].password)
            if(validator){
                res.json({"status":"success"})
            }
            else{
                res.json({"status":"worng password"})
            }
        }
        else{
            res.json({"status":"username dosen't exist"})
        }
    }
    )
})
app.listen(5050,()=>{
    console.log("Server Started")
})