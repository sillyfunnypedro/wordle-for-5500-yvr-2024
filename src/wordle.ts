import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Create an interface for reading input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let words: string[] = [];

// Success message to be displayed when the user guesses the word correctly
const successString = "You guessed the word! Congratulations!";

/**
 * Main function to initialize the game.
 * Reads the words from the file and stores them in the words array.
 */
function main() {
    try {
        const filePath = path.join(__dirname, '../resources/words.txt');
        const data = fs.readFileSync(filePath, 'utf-8');
        words = data.split(/\r?\n/);

        // Tell the user how many words are in the file
        console.log(`There are ${words.length} words in the file.`);
        console.log("Hello world, it is time to play Wordle!");
    } catch (error) {
        console.error("Error reading the file:", error);
    }
}

/**
 * Function to prompt the user for a 5-letter word.
 * Repeats until a valid word is entered.
 * @param callback - Function to call with the valid word
 */
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

/**
 * Function to generate feedback for the guessed word.
 * Currently returns a placeholder string.
 * @param targetWord - The word to be guessed
 * @param word - The word guessed by the user
 * @returns Feedback string
 */
function generateAnswer(targetWord: string, word: string): string {
    return "XXXXX"; // Placeholder implementation
}

/**
 * Function to check if the guessed word matches the target word.
 * @param targetWord - The word to be guessed
 * @param word - The word guessed by the user
 * @returns Success message if the word matches, otherwise feedback string
 */
function checkWord(targetWord: string, word: string): string {
    if (targetWord === word) {
        return successString;
    } else {
        return generateAnswer(targetWord, word);
    }
}

/**
 * Main game function to play Wordle.
 * Selects a random target word and allows the user to guess it.
 */
function wordle() {
    console.log("This is where we will play the game Wordle!");
    const targetWord = words[Math.floor(Math.random() * words.length)];
    // console.log(`The target word is: ${targetWord}`);
    let triesLeft = 10;

    // Loop to allow the user multiple attempts to guess the word
    while (triesLeft > 0) {
        inputWord((word) => {
            console.log(`The word you entered is: ${word}`);
            // Check the word and give feedback
            if (checkWord(targetWord, word) === successString) {
                console.log(`The word was ${targetWord}. You guessed it!`);
                rl.close();
            } else {
                console.log(checkWord(targetWord, word));
            }
        });
        triesLeft--;
    }
}

// Initialize the game
main();
// Start the Wordle game
wordle();