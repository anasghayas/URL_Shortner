const express=require("express");
const PORT=8001;

const app=express();

app.listen(PORT,()=>console.log(`SERVER STARTED at PORT : ${PORT}`));