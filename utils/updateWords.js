const fs = require("fs");

//! PATH TO FILE USED BY API
const wordsFilePath = './data/words.json';

//! PATH TO FILE FOR NEW WORDS
let file = './newWords.json'

function smashToSet(...args) {
    return new Set(...args);
}

function sortToArray(set) {
    return Array.from(set).sort();
}

function updateWords(file) {
    const currentFile = fs.openSync(wordsFilePath, 'r+');
    const currentFileParsed = JSON.parse(fs.readFileSync(currentFile));
    const currentLength = currentFileParsed.length;
    console.log(`Opening current file from ${wordsFilePath}...`);
    console.log(`Current words: ${currentLength}`);

    const newFile = fs.openSync(file, 'r');
    const newFileParsed = JSON.parse(fs.readFileSync(newFile));
    console.log(newFileParsed.length)


    console.log(`Opening new file from ${file}...`);
    const smashed = smashToSet([...currentFileParsed, ...newFileParsed]);

    const FINAL = sortToArray(smashed);
    console.log(`${FINAL.length - currentLength} New words added.`);
    fs.writeSync(currentFile, FINAL);
    console.log('Written to file!');
    //currentFile.close();
}

updateWords(file)