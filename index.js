const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bodyparser = require('body-parser')
const nodemailer = require('nodemailer')
const dotenv = require("dotenv")
dotenv.config()

const app = express();
app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,"./views/public")))
hbs.registerPartials(path.join(__dirname,"./views/partials"))

var encoder = bodyparser.urlencoded()
const from = process.env.MAILSENDER
var transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    prot:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:from,
        pass:process.env.PASSWORD
    }
})

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/gallery',(req,res)=>{
    res.render('gallery')
})
app.get('/faq',(req,res)=>{
    res.render('faq')
})
app.get('/services',(req,res)=>{
    res.render('services')
})
app.get('/contact',(req,res)=>{
    res.render('contact',{show:false})
})
app.post('/contact',encoder,(req,res)=>{
    mailOption ={
        from:from,
        to:from,
        subject:'Query Received ! Team FitnessPro',
        text:`
        Name: ${req.body.name}
        Email: ${req.body.email}
        Phone: ${req.body.phone}
        Subject: ${req.body.subject}
        Message: ${req.body.message}
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error)
    })
    mailOption ={
        from:from,
        to:req.body.email,
        subject:'Thanks To Share Your Query With Us ! Team FitnessPro',
        text:`
        Thank You For Sharing Your Query With Us! Our Team Will Contact Soon
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error)
    })
    res.render('contact',{show:true})
})
app.listen(process.env.PORT||8000,()=>console.log("Server is Running at Port 8000"))

//12/10 21:57part1