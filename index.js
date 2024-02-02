const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const username = process.env.mongodb_username;
const password = process.env.password ;

mongoose.connect("mongodb+srv://jainildani_1931:vidushi%40007@cluster0.fcpnalj.mongodb.net/?retryWrites=true&w=majority", 
{
    useNewUrlParser : true,
    useUnifiedTopology: true
});

const registrationSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
});
const Registration = mongoose.model("REGISTRATION",registrationSchema)
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res) => {
    res.sendFile(__dirname +  '/pages/index.html ');
})
app.post('/register',async(req,res) => {
    try {
        const{username, email, password} = req.body;
        const existingUser = await Registration.findOne({email:email});
        if(!existingUser){
            const regisrationData = new Registration({
            username,
            email,
            password
        })
        
        
         await regisrationData.save();
         res.redirect("/sucess");
    }
     else {
        console.log("user already exist");
        res.redirect("/error.html")
    }

    }
    
    catch{
        console.log(error);
        res.redirect("error");

    }
})
app.get("/sucess",(req,res) => {
    res.sendFile(__dirname +  "/pages/success.html ");
})

app.get("/error",(req,res) => {
    res.sendFile(__dirname +  "/pages/error.html ");
})

    app.listen(port,()=>{
    console.log(`server is running on PORT ${port}`);
})