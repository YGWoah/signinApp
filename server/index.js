const express = require('express')
const app = express()
const {dbConnect} = require('./database')
const bodyPsrser = require('body-parser')
const {auth} = require('./_middleware/auth')

//get all students
app.get("/students",(req,res)=>{
const connection = dbConnect('myDB')
    connection.connect((err)=>{
        if(err) throw err;
        connection.query("SELECT * FROM students",(err,result,feilds)=>{
            if(err) throw err
            result
            console.log(result)
            res.json({status:"succes",value:result})
            
        })
        connection.end()
    })
})

//get one single student
app.get("/student",(req,res)=>{
    const connection = dbConnect('myDB')
    let name=req.query.name
    connection.connect((err)=>{
        if(err) throw err;
        connection.query("SELECT * FROM students WHERE name = '"+name+"'",(err,result,feilds)=>{
            if(err) throw err        
            res.json({value:result})
            
        })
        connection.end()
    })
})

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(bodyPsrser.json())

app.post('/signin',(req,res)=>{
    const {name,lastname,email,password} = req.body
    console.log("request is hapening ");
    if(name.length==0||lastname.leangth==0){
        res.status(400).json({succese : false})
        return
    }else{
        const connection = dbConnect('myDB')
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`INSERT INTO users (name, lastname, email, password) VALUES ('${name}', '${lastname}', '${email}', '${lastname}')`,(err,result,feilds)=>{
                if(err) throw err
                res.status(200).json({succese : true})
                
            })
            connection.end()
        })
    }
})

app.post('/login',auth,(req,res)=>{
    console.log("The auth is done")
})

app.post('/getdata',(req,res)=>{
    const id = req.query.id
    if(id.length>0){
        const connection = dbConnect('myDB')
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`SELECT * FROM users WHERE id = '${id}'`,(err,result,feilds)=>{
                if(err) throw err
                let data = JSON.stringify(result)
                data = JSON.parse(data) 
                let response = {name:data[0].name,lastname:data[0].lastname,email:data[0].email}
                res.status(200).json({succes:true,data:response})
                
            })
            connection.end()
        })
    }else{
        res.status(404).json("the id is empty")
    }
})

app.listen(5500,()=>{
    console.log("the server is starting at 5500");
})