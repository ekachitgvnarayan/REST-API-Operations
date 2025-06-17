const express = require("express");
const app=express();
const port = 3000;
const path = require("path");
const { v4: uuid } = require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("sourceLink.ejs");
})

const data = [{
    id:uuid(),
    username:"ekachit",
    desc:"Happy coding:)"
    },{
    id:uuid(),
    username:"Random",
    desc:"I am a working employee"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{data:data});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts/new",(req,res)=>{
    console.log(req.body);
    let {user,desc}=req.body;
    let id=uuid();
    data.push({id,username:user,desc});
    console.log(id);
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){
            res.render("show.ejs",{data:data[i]});
            break;
        }
    };
})
app.get("/posts/edit/:id",(req,res)=>{
    let {id}=req.params;
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){
            res.render("edit.ejs",{data:data[i]});
            break;
        }
    };
})
app.patch("/posts/edit/:id",(req,res)=>{
    let {user,desc}=req.body;
    let {id} = req.params;
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){
            data[i].username=user;
            data[i].desc=desc;
            break;
        }
    };
    res.redirect("/posts");
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){
            data.splice(i,1);
            break;
        }
    };
    res.redirect("/posts");
})
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`app is listening on port ${port}`);
    }
})
