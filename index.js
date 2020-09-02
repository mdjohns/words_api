const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 80;

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
// Without query params return 1 word
app.get('/', (req, res) => {
    res.send({ 'message': 'Welcome to the Random Words API' })
})
app.get('/word', async (req, res) => {
    let numWords = 0;
    req.query.n ? numWords = req.query.n : numWords = 1
    const resp = getWordsFromFile(5, './data/words.json');
    res.send(resp);

})
// With query params return n words


app.listen(port, () => {
    console.log(`Server listening on port ${$PORT}`)
})