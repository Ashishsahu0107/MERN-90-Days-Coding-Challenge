import express from 'express'

const app = express();

app.get("/", (req, res) => {
    res.json("Home page");
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`start server ${port}`);
});