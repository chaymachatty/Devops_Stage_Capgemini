const express= require("express");
const cors=require("cors");
const mysql=require("mysql");

const app = express();
app.use(express.json());
app.use(cors())

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud3"
})
app.get("/",(req,res)=>{
    const sql = "SELECT * from student";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
});

app.post('/create' ,(req,res) => {
    const sql = "INSERT INTO `student` (`Name`, `Email`)  VALUES (?)"; 
    const values =[
        req.body.name,
        req.body.email
    ]
    db.query(sql,[values],(err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.put('/update/:id' ,(req,res) => {
    const sql = "UPDATE student set `Name` = ?, `Email` = ? where ID = ? "; 
    const values =[
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;
    db.query(sql,[...values, id],(err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.delete('/student/:id' ,(req,res) => {
    const sql = " DELETE fROM student WHERE ID = ? "; 
    const id = req.params.id;
    db.query(sql,[id],(err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.listen(8081, ()=>{
    console.log("listening");
})