const{nanoid}=require("nanoid");
const URL=require("../models/url");

async function handleGenerateNewShortURL(req,res){
    try {
        const body=req.body;
        if(!body.url){
            return res.status(400).json({err : "URL is required !"});
        }
        // Check if URL already exists
        const existingURL = await URL.findOne({ redirectURL: body.url });
        if (existingURL) {
            // Return existing short ID
            const allurls = await URL.find({});
            return res.render("home", { id: existingURL.shortId, urls: allurls });
        }
        // Generate new short ID
        const shortID = nanoid(8);
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        const allurls = await URL.find({});
        res.render("home", { id: shortID, urls: allurls });
    } catch (error) {
        console.error('Error generating short URL:', error);
        return res.status(500).send('Internal Server Error');
    }
};

async function handleGetAnalytics(req,res){
    try {
        const shortId=req.params.shortId;
        const result=await URL.findOne({shortId});
        if (!result) {
            return res.status(404).json({ error: 'Short ID not found' });
        }
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
};