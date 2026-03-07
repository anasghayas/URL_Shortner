const express=require("express");
const urlRoute=require("./routes/url");
const path=require("path");
const {connectToMongoDb}=require("./connect");
const URL=require("./models/url");
const staticRoute=require("./routes/staticRouter");
const PORT=8001;
const app=express();

connectToMongoDb("mongodb://localhost:27017/url-Shortner").then(()=>console.log("MongoDb Connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute);
app.use('/',staticRoute);

// app.get('/test',async (req,res)=>{
//     const allUrls=await URL.find({});
//     return res.render('home',{
//         urls : allUrls,
//     });
// });


app.get("/:shortId",async(req,res)=>{
    try {
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
        if (!entry) {
            return res.status(404).send('URL not found');
        }
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error redirecting:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT,()=>console.log(`SERVER STARTED at PORT : ${PORT}`));