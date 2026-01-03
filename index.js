import express from "express";
import axios from "axios";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const API_URL = "https://v2.jokeapi.dev/joke/";

app.get("/",async (req,res)=>{
    res.render("index.ejs", {
        partone:"",
        parttwo:"",
    })
});

app.post("/joke", async (req, res) => {
    const { category } = req.body;
    const chosen = (typeof category === 'string' && category.trim()) ? category.trim() : 'Any';
    const url = API_URL + chosen +"?blacklistFlags=nsfw";
    try {
        const resp = await axios.get(url);
        const data = resp.data;
        if (data.type === 'single') {
            return res.render('index.ejs', { partone: data.joke || '', parttwo: '' });
        }
        return res.render('index.ejs', { partone: data.setup || '', parttwo: data.delivery || '' });
    } catch (err) {
        console.error('Joke API error:', err?.message || err);
        return res.render('index.ejs', { partone: 'Sorry, could not fetch a joke.', parttwo: '' });
    }
});

app.listen(3000,()=>{
    console.log("Listening to port 3000.");
})