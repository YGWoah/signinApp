const {dbConnect} = require('../database')

const auth = (req,res,next)=>{
    try{
        const {email,password} = req.body
        const connection = dbConnect('myDB')
        connection.query(`SELECT * FROM users WHERE email = '${email}'`,(err,result,feilds)=>{
            if(err) throw err
            let data = JSON.stringify(result)
            data = JSON.parse(data)
            console.log(data[0].id)
            res.json({status:"succes",id:data[0].id})
            next()
        })
    }catch{

    }
}

module.exports ={auth}