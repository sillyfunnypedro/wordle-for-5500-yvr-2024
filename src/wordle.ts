import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let words: string[] = [];

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
 * @returns A promise that resolves to a valid 5-letter word
 */
async function inputWord(): Promise<string> {
    while (true) {
        const answer = await new Promise<string>((resolve) => {
            rl.question('Please enter a 5-letter word: ', resolve);
        });

        if (answer.length !== 5) {
            console.log('The word must be exactly 5 letters long.');
        } else if (!words.includes(answer)) {
            console.log('The word is not in the list.');
        } else {
            return answer;
        }
    }
}

/**
 * Function to generate feedback for the guessed word.
 * @param targetWord - The word to be guessed
 * @param word - The word guessed by the user
 * @returns Feedback string
 */
function generateAnswer(targetWord: string, word: string): string {
    let result = '@@@@@'

    return result;
}

/**
 * Function to check if the guessed word matches the target word.
 * @param targetWord - The word to be guessed
 * @param word - The word guessed by the user
 * @returns Success message if the word matches, otherwise feedback string
 */
function checkWord(targetWord: string, word: string): string {
    if (targetWord === word) {
        return "You guessed the word! Congratulations!";
    } else {
        return generateAnswer(targetWord, word);
    }
}

/**
 * Main game function to play Wordle.
 * Selects a random target word and allows the user to guess it.
 */
async function wordle() {
    console.log("This is where we will play the game Wordle!");
    const targetWord = words[Math.floor(Math.random() * words.length)];
    let triesLeft = 10;

    while (triesLeft > 0) {
        const word = await inputWord();
        console.log(`The word you entered is: ${word}`);
        const feedback = checkWord(targetWord, word);
        console.log(feedback);
        if (feedback === "You guessed the word! Congratulations!") {
            console.log(`The word was ${targetWord}. You guessed it!`);
            break;
        }
        triesLeft--;
    }

    if (triesLeft === 0) {
        console.log(`You've run out of tries. The word was ${targetWord}.`);
    }

    rl.close();
}

// Initialize the game
main();
// Start the Wordle game
wordle();