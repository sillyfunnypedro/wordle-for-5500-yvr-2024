import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let words: string[] = [];

function main() {
    try {
        const filePath = path.join(__dirname, '../resources/words.txt');
        const data = fs.readFileSync(filePath, 'utf-8');
        words = data.split(/\r?\n/);

        // tell the user how many words are in the file
        console.log(`There are ${words.length} words in the file.`);
        console.log("Hello world, it is time to play Wordle!");
        // You can use the words array as needed
    } catch (error) {
        console.error("Error reading the file:", error);
    }
}

function inputWord(callback: (word: string) => void) {
    function askQuestion() {
        rl.question('Please enter a 5-letter word: ', (answer) => {
            if (answer.length !== 5) {
                console.log('The word must be exactly 5 letters long.');
                askQuestion();
            } else if (!words.includes(answer)) {
                console.log('The word is not in the list.');
                askQuestion();
            } else {
                callback(answer);
            }
        });
    }
    askQuestion();
}

function wordle() {
    console.log("This is where we will play the game Wordle!");
    inputWord((word) => {
        console.log(`The word you entered is: ${word}`);
        rl.close();
    });
}

main();
wordle();