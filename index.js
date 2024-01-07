import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiURL = "https://v2.jokeapi.dev/joke/Any";

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", async (req,res) => {
    try {
    const result = await axios.get (apiURL);
    const jokeData = result.data;

    if (jokeData.type === 'twopart') {
        // Two-part joke
        res.render("index.ejs", { content: `${jokeData.setup} ${jokeData.delivery}` });
    } else {
        // One-part joke
        res.render("index.ejs", { content: jokeData.joke });
    }
} catch (error) {
    console.error('Error fetching joke:', error.message);
    res.render("index.ejs", { content: "It's a joke, there's no joke!" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
