const express=require("express");
const mongoose=require("mongoose");
const multer=require('multer');
const path=require('path')

const nodemailer=require('nodemailer');
const Mailgen=require('mailgen');
const cors=require('cors');
const { type } = require("os");
require('dotenv').config()


const Email=process.env.Email;
const Password=process.env.Password;
const app=express();
const port=process.env.PORT||5000;
app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:3000",
        methods:["POST","GET"],
        credentials:true
    }
));
app.use(express.static('public'));

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname,"frontend","build")));
    res.sendFile(path.resolve(__dirname,"frontend", "build", "index.html"));
});
mongoose.connect(process.env.Mongo_url).then(()=>console.log("Connected to Database"))
.catch((err)=>console.log("Database Not Connected"));

let imagename='';

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/orderedImages')
    },
    filename:function(req,file,cb){
        imagename=file.fieldname+Date.now()+path.extname(file.originalname)
        cb(null,imagename)
    }
});
const upload=multer({ 
    storage:storage
});

const mySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true },
    email:{
         type:String, 
         required:true,    
        },
    address:{
        type:String,
        required:true},
    number:{
        type:Number,
        required:true,
        min:10
    },
    size:{
        type:String,
        required:true
    },
    medium:{
        type:String,
        required:true
    },
    face:{
        type:String,
        required:true
    },
    orderDate:{
        type:String,
        required:true
    },
    orderedImage : {
        type:String,
        required :true
    }
    }
 );
 const Mymodel=mongoose.models.artTest1 || mongoose.model("artTest1",mySchema);
 

 //posting data in database and sending email to the user.
 app.post('/data',upload.single("orderImage"),async(req,res)=>{
    const{name,email,address,number,size,medium,face,amount}=req.body;
    const orderDate=new Date().toLocaleString('en-GB', { ti }));
    
    const orderedImage=imagename;
    
    
  

    let config={
        service:'gmail',
        auth:{
            user:Email,
            pass:Password
        }
    }
    let transporter=nodemailer.createTransport(config);

    let MailGenerator=new Mailgen(
        {
            theme:"salted",
            product : {
                name:"Awesome Arts",
                link:'https://mailgen.js/'
            }
        }
    )
    const imageLink='https://awesomearts.onrender.com/orderedImages/'+imagename;
    let text = name;
    const myArray = text.split(" ");
    let first_name = myArray[0];
    let response={
        body:{
            name:first_name,
            intro:"Your Order has been Successfully Placed!",
            table:{
                data: [
                {
                    Item_Ordered : "Commissioned Artwork",
                    Medium:medium,
                    Size:size,
                    price:amount,
                    
                }
                ]
            },
            outro:"Thanks for Placing the Order."
        }
    }
    let mail=MailGenerator.generate(response);
    let message={
        from:Email,
        to:email,
        attachments:[{
            filename:imagename,
            path:imageLink,
        }],
        subject:"Order Placed",
        html:mail
    }

    
    if(name===''|| email===''|| address===''|| orderedImage=='' || number===''|| size===''|| medium===''||face==='')
    {
        res.status(422).json({ error :"Plz fill the field properly"});
    }
    else{
    try{
        
        const data=new Mymodel({name,email,address,number,size,medium,face,orderDate,orderedImage});
        data.save().then(()=>console.log("Order Placed")).catch((e)=>console.log(e));
        transporter.sendMail(message);
        res.status(201).json({message:"Order Successful"})   
    }
    catch(e)
    {
        console.log(e);
    }
    }
   }).listen(port,()=>{
    console.log(`Connection successful running at port ${port}`);
});
