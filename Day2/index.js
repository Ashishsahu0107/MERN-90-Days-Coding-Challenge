const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send({starus:1,message : "this is my first api"})
})

app.get("/news", (req, res) => {
    res.json({starus:1,message : "news"})
})

app.post("/login", (req, res) => {
    console.log(req.body);
    res.json({message :"Login api",data:res.body})
})

app.listen("8000");