const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 80;
const wordsFilePath = './data/words.json';

//TODO: if we're feeling crazy, cache found words to avoid duplicates >:)

function getWordsFromFile(numWords, filePath) {
    const file = fs.readFileSync(filePath);
    const parsed = JSON.parse(file);
    const len = parsed.length;
    let results = new Array(numWords);

    while (numWords--) {
        let x = Math.floor(Math.random() * len);
        results[numWords] = parsed[x];
    }

    return results;
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //TODO: update me
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', (req, res) => {
    res.send('Welcome to my Random Words API. \n Accepts GET requests to /word with query param n for number of words to return')
})

app.get('/word', async (req, res) => {
    let numWords = 0;
    req.query.n ? numWords = req.query.n : numWords = 1
    const resp = getWordsFromFile(numWords, wordsFilePath);
    res.send(resp);

})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})