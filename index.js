const express=require("express");
const urlRoute=require("./routes/url");
const {connectToMongoDb}=require("./connect");
const URL=require("./models/url");
const PORT=8001;
const app=express();

connectToMongoDb("mongodb://localhost:27017/url-Shortner").then(()=>console.log("MongoDb Connected"));

app.use(express.json());
app.use("/url",urlRoute);

app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {$push:{
            visitHistory : {
                timestamp:Date.now(),
            },
        },
    },
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT,()=>console.log(`SERVER STARTED at PORT : ${PORT}`));