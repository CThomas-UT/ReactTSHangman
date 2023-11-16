# ReactTS Hangman

---

> Creating a simple hangman game utilizing typescript and react
> 

# Project Setup

## Working with Vite

```bash
C: npm create vite
Need to install the following packages:
create-vite@4.4.1
Ok to proceed? (y) y
√ Project name: ... ReactTSHangman
√ Package name: ... react
? Select a framework: » - Use arrow-keys. Return to submit.
>   Vanilla
    Vue
√ Select a framework: » React
√ Select a variant: » TypeScript

Scaffolding project in C:

Done. Now run:

  cd ReactTSHangman
  npm install
  npm run dev
```

The above code uses NPM and vite to create a react/typescript app

Then running the following code sets up all dependencies:

```bash
npm i
(or run npm install)
```

---

## Eliminating unnecessary files

Get rid of the css files for styling to be a bit more bare bones

then change **App.tsx** to look like the following (will expand in the future):

```tsx
function App() {

  return (
    <h1>Hi</h1>
  )
}

export default App
```

Subsequently get rid of the styling elements in the main file, so **main.tsx** looks as follows:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

# Deciding Features

### Memory:

remembering what characters players have guessed

### Input methods:

clicking the letters on screen

entering on their keyboard

### Letters on screen:

have all characters on screen as buttons

have spaces above them which are filled in with correct guesses or if they’re out of attempts will complete

based on ******memory****** change styling of buttons to not be accessible and look like they’ve been clicked

### Current Word:

randomly pull a new word at start

track the word and compare its letters to those guessed in *memory* 

have tracking of what letters haven’t been guessed thus far

### Guess counter:

increment the guesses for each incorrect guess

implement displaying hangman pieces for each time it’s incremented

if all guesses are consumed, display remaining letters from ************current word************ in red on the display pieces

### Word list:

use some data structure to store a large list of potential words

on refresh, pull randomly from the list and make that ****current word****

### Endgame screen:

if they win, give congratulations, and inform them to refresh to restart

if they lose, display the word, say sorry, and inform them to refresh to restart

---

# Planning Features

### Get a list of words to use

Here I used chat gpt to create a list of words in a json file, all of which had to do with chicago, the prompt was:

> Can you create a list object that contains 100 words that are all lowercase letters and they revolve around the city of chicago and its culture
> 

It created the following list object which was stored in a file called ********************chicagoWordList.json********************

```tsx
["windy",
"lakefront",
"deepdish",
"blues",
"jazz",
"architecture",
"skyscrapers",
"pizza",
"museums",
"art",
"sports",
"cubs",
"whitesox",
"bulls",
"blackhawks",
"food",
"hotdog",
"neighborhoods",
"river",
"el",
"loop",
"magnificentmile",
"millenniumpark",
"navypier",
"chinatown",
"pilsen",
"hydepark",
"wrigleyville",
"southloop",
"northside",
"garfieldpark",
"lincolnpark",
"logansquare",
"greektown",
"maxwellstreet",
"goldcoast",
"wickergard",
"streetart",
"lakeshore",
"waterfront",
"theater",
"comedy",
"improv",
"steppenwolf",
"secondcity",
"grantpark",
"buckinghamfountain",
"artinstitute",
"sculptures",
"murals",
"history",
"cultural",
"publicart",
"beaches",
"parks",
"botanicgarden",
"lincolnparkzoo",
"shedd",
"fieldmuseum",
"planetarium",
"nature",
"wildlife",
"birds",
"trail",
"running",
"biking",
"festivals",
"tasteofchicago",
"lollapalooza",
"airandwatershow",
"bluesfest",
"tastefest",
"chicagodogs",
"craftbeer",
"speakeasy",
"coffeeshops",
"foodtrucks",
"foodie",
"breweries",
"farmersmarket",
"sausage",
"polish",
"italianbeef",
"tamales",
"fireworks",
"parades",
"kingday",
"pride",
"stpatricks",
"tastebuds",
"soul",
"jazzclubs",
"riverwalk",
"magnoliacafe"]
```

---

### Setting up word to guess:

changed App.tsx to the following:

```tsx
import { useState } from "react";
import words from './chicagoWordList.json'

function App() {
	const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  return (
    <h1>Hi</h1>
  )
}

export default App
```

The changes included above import the useState hook from react and then also it includes an import of the words from our list above. 

In order to get a new word every time the page is reloaded, inside of the useState call, the following function is run:

```tsx
useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
```

What this function does is it will calculate a random float from 0-1 then multiply that by the length of our word list, taking the floor of that will round the number down, and based on 0 based indexing that will allow us to calculate a random index every time the page is reloaded.

This index is then passed into our words list which will return the random word at that location

---

### Setting up guessed letters functionality

All this requires is to create an array of strings using the following code:

```tsx
const [guesses, setGuesses] = useState<string[]>([])
```

The <string[]> is typescript functionality that allows us to set the type to an array of strings

---

## Final look at App.tsx after updating some states required for planned features

```tsx
import { useState } from "react";
import words from './chicagoWordList.json'

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guesses, setGuesses] = useState<string[]>([])

  return (
    <h1>Hi</h1>
  )
}

export default App
```

---

## Starting in on JSX for styling

### Styling on all elements

Here we have to wrap everything inside of a div to provide styling to everything in our return statement, that styling is below

```tsx
const returnStyle = {
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    margin: "0 auto", 
    alignItems: "center"
  }
```

We setup another style object, this time for the text that will show at the end of the game, which sets up the text styling:

```tsx
const outcomeStyle = {
    fontSize: "2rem",
    textAlign: "center"
  }
```

Then we need to setup the custom components for the drawing, the word, and the keyboard, where we make files with the following names:

1. HangmanDrawing.tsx
2. HangmanWord.tsx
3. Keyboard.tsx

All of these contain a simple export function statement in order to enable importing of their respective functions

After all of this is added, here is what our App.tsx file looks like

```tsx
import { useState } from "react";
import words from './chicagoWordList.json';
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guesses, setGuesses] = useState<string[]>([])

  const returnStyle = {
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    margin: "0 auto", 
    alignItems: "center"
  }

  const outcomeStyle = {
    fontSize: "2rem",
    textAlign: "center"
  }

  return (
    <div style={returnStyle}>
      <div style={outcomeStyle}>
        Lose
        Win
      </div>
      <HangmanDrawing />
      <HangmanWord />
      <Keyboard />
    </div>
  )
}

export default App
```

---

## Creating Custom Components

### Hangman Drawing implementation

Inside of HangmanDrawing.tsx, we have to render all of the components of the gallows before dynamically adding in the drawing of the body

The gallows rendering is only 4 lines, displayed in the return statement of the hangman drawing function below:

```tsx
export function HangmanDrawing() {
    return (
        <div style={{position: "relative"}}>
            {/* render hangman pole */} 

            {/* Render rope */}
            <div style={{ 
                height: "50px", 
                width: "10px", 
                background: "black", 
                position: "absolute",
                top: "0px",
                right: "0px"}}/>

            {/* Render top of pole */}
            <div style={{ 
                height: "10px", 
                width: "200px", 
                background: "black", 
                marginLeft: "120px", 
                }}/>

            {/* render pole */}
            <div style={{ 
                height: "400px", 
                width: "10px", 
                background: "black", 
                marginLeft: "120px"}}/>

            {/* Render bottom of pole */}
            <div style={{ 
                height: "10px", 
                width: "250px", 
                background: "black"}}/>

        </div>
    )
}
```

### Hangman body rendering

To render the body, we’re going to create the components outside of the return, and then call them when needed, so those each will look like the following:

```tsx
const HEAD = (
    <div style={{ 
        height: "50px", 
        width: "50px", 
        background: "black", 
        borderRadius: "50%",
        border: "10px solid black",
        position: "absolute",
        top: "50px",
        right: "-30px"}}/>
)

const BODY = (
    <div style={{ 
        height: "120px", 
        width: "10px", 
        background: "black", 
        position: "absolute",
        top: "120px",
        right: "0px"}}/>
)

const LLEG = (
    <div style={{ 
        height: "90px", 
        width: "10px", 
        background: "black", 
        position: "absolute",
        transform: "rotate(45deg)",
        transformOrigin: "top right",
        top: "240px",
        right: "0px"}}/>
)

const RLEG = (
    <div style={{ 
        height: "90px", 
        width: "10px", 
        background: "black", 
        position: "absolute",
        transform: "rotate(-45deg)",
        transformOrigin: "top left",
        top: "240px",
        right: "0px"}}/>
)

const LARM = (
    <div style={{ 
        height: "90px", 
        width: "10px", 
        background: "black", 
        position: "absolute",
        transform: "rotate(130deg)",
        transformOrigin: "top right",
        top: "180px",
        right: "10px"}}/>
)

const RARM = (
    <div style={{ 
        height: "90px", 
        width: "10px", 
        background: "black", 
        position: "absolute",
        transform: "rotate(-130deg)",
        transformOrigin: "top left",
        top: "180px",
        right: "-10px"}}/>
)
```

The components are relatively self explanatory, but the only thing that tripped me up was that the rotation occurs from the center of the object and thus changing the transformOrigin to the top left and top right allows us to move to those points and then have the rotation occur about that point

***********Note:*********** while working on these, it’s good to add the below code and check on the development server through vite to make small adjustments to your liking

Make sure it’s in the HangmanDrawing function like below while you test:

```tsx
<div style={{position: "relative"}}>
            
            {/* render hangman body */}
            {HEAD}
            {BODY}
            {LLEG}
            {RLEG}
            {LARM}
            {RARM}
</div>
```

### Rendering the hangman word

First, need to setup the styling of the letters, which will be in the style element of the returned div:

```tsx
export function HangmanWord() {
		const word = "Hello"
    return (
        <div style={{
            display: "flex",
            gap: "0.25em",
            fontSize: "6em",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace"
        }}>
				{word}
        </div>
    )
}
```

The word here will help you style using Vite, but prior to adding functionality where it changes with the word to guess, it will represent it.

We don’t want the word to be all one word, we want it split by the letters, so we’ll use *word.split(””)*   and then map each letter with an index to set up the keys and individual letters, thus we have to change it to as follows:

```tsx
export function HangmanWord() {
    const word = "hello"
    const guessedLetters = ["h", "l"]
    return (
        <div style={{
            display: "flex",
            gap: "0.25em",
            fontSize: "6em",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace"
        }}>
        {word.split("").map((letter, index) => (
            <span style={{borderBottom: "0.1em solid black"}} key={index}>
                {letter}
            </span>
        ))}
        </div>
    )
}
```

The border bottom here will allow us to show how many letters there are in the word when all of the letters are blank

To then add that functionality, we have to wrap the letter within another span and change the visibility based on if it’s in an array of guessed letters

To visualize what that looks like, we add a temporary array of guessed letters and end up with the HangmanWord.tsx file looking like below:

```tsx
export function HangmanWord() {
    const word = "hello"
    const guessedLetters = ["h", "l"]
    return (
        <div style={{
            display: "flex",
            gap: "0.25em",
            fontSize: "6em",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace"
        }}>
        {word.split("").map((letter, index) => (
            <span style={{borderBottom: "0.1em solid black"}} key={index}>
                <span style={{visibility: guessedLetters.includes(letter) ? "visible" : "hidden"}}>
                    {letter}
                </span>
            </span>
        ))}
        </div>
    )
}
```

### Rendering the keyboard

We first need an array containing all letters of the english alphabet, which can be done with the following:

```tsx
const KEYS: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
```

We now need to setup the rendered function, which we’ll start with making the display a grid in order to have our keys be able to move around as we resize the window

```tsx
export function Keyboard() {
    return (
        <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(2em, 1fr))", gap: "0.25em",
        }}>

        </div>
    )
}
```

Now we can loop through our letters in the KEYS variable and render each out individually, to do so, we need to map each key to a div of its own

```tsx
const KEYS: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function Keyboard() {
    return (
        <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(2em, 1fr))", gap: "0.25em",
        }}>
            {KEYS.map(key => {
                return (
                    <div>
                        {key}
                    </div>
                )
            })}
        </div>
    )
}
```

To make it look a bit better, change the divs inside of the mapping to button, each with a key of the key

```tsx
<button key={key}>
		{key}
</button>
```

In Vite, you may have noticed that the letters are all vertical in the middle, which is a result of the styling we setup in the **app.tsx** file, in order to specifically style our keys, we’ll have to wrap our Keyboard in a div that is styled to stretch the items to the width of the container, which is done with the following updated return statement:

```tsx
// In app.tsx
return (
    <div style={returnStyle}>
      <div style={outcomeStyle}>
        Lose
        Win
      </div>
      <HangmanDrawing />
      <HangmanWord />
      <div style={{alignSelf: "stretch"}}>
        <Keyboard />
      </div>
    </div>
  )
```

The *alignSelf* allows us to have the elements inside of it set to stretch, which will spread out our keys

### Styling the buttons

Since we want to add interactivity with hover and such, we have to use className and an external css file to do the styling, so first we have to make a Keyboard.module.css file and then import styles from that file in the keyboard.tsx file like below:

```tsx
import styles from './Keyboard.module.css';

<button key={key} className={`${styles.btn}`} >
    {key}
</button>
```

In the keyboard.module.css file, the following styling is added

```tsx
.btn {
    width: 100%;
    border: 3px solid #000;
    background: none;
    aspect-ratio: 1/1;
    font-size: 2.5rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    padding: 1rem 0em;
    transition: all 0.3s ease;
    text-align: center;
}

.btn:hover:not(:disabled),.btn:focus:not(:disabled) {
    background: #555;
    color: #fff;
}

.btn.active {
    transform: scale(0.9);
    background: #333;
    color: #fff;
}

.btn.inactive{
    opacity: 0.5;
}
```

The above code sets the following:

1. Full width (100%).
2. A 3-pixel black border.
3. No background color (transparent).
4. A square aspect ratio of 1:1.
5. Large font size (2.5 rem).
6. Uppercase text with bold font weight.
7. Black text color (#000).
8. A hand cursor when hovered.
9. Padding of 1 rem (top and bottom) and 0 em (left and right).
10. Smooth transition effect over 0.3 seconds.
11. Center-aligned text.

Additionally, it defines styles for button states:

- When hovered or focused (not disabled), the background color changes to #555, and the text color changes to white (#fff).
- When in the "active" state, the button is scaled down to 90% of its size, and the background becomes #333 with white text.
- When in the "inactive" state, the button's opacity is reduced to 0.5, making it semi-transparent.

## Implementing gameplay functionality

********************************************************************First dealing with hangman drawing********************************************************************

We need a prop to hold the number of incorrect guesses (since that’s the thing that impacts what body parts have been drawn)

In order to do that, we can get an array of the incorrect letters and then feed the length of that array to our hangman drawing, that code is added below inside of the App() function within App.tsx

```tsx
const wrongGuesses = guesses.filter((letter) => !wordToGuess.includes(letter))

<HangmanDrawing numberOfGuesses={wrongGuesses.length} />
```

The above code sets a wrongGuesses const to be constituted as a filtered portion of the array guesses. The filter takes only letters that are not included in the wordToGuess

Then the prop numberOfGuesses is sent to the hangman drawing which is just the calculated length of incorrect letters guessed array

---

Inside of the hangmandrawing.tsx file, we need to handle the passed prop, which is done with the following:

```tsx
export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps)
```

But the HangmanDrawingProps type needs to be declared to satisfy typescript, which we can do by including the following  prior to the exported function

```tsx
type HangmanDrawingProps = {
    numberOfGuesses: number
}
```

Then to be able to render the body sequentially, we need an array of the BODY_PARTS, setup in the correct order to be able to display them based on index position:

```tsx
const BODY_PARTS = [HEAD, BODY, LLEG, RLEG, LARM, RARM]
```

This array can then be paired with slice to include from the 0 array to the number of incorrect number of guesses as such:

```tsx
{/* render hangman body */}
{BODY_PARTS.slice(0, numberOfGuesses)}
```

This wraps up the drawing of the hangman, but handling the word to guess and correct guesses follow a similar path

---

******************************For HangmanWord******************************

We need to use the guesses array and the wordToGuess as props like below:

```tsx
<HangmanWord guesses={guesses} wordToGuess={wordToGuess}/>
```

But within the hangmanword file, we need to handle the props typing again

This can be done the same way as before with the following code:

```tsx
type HangmanWordProps = {
    guesses: string[]
    wordToGuess: string
}

export function HangmanWord({ wordToGuess, guesses }: HangmanWordProps)
```

and within the hangmanWord function, we can get rid of our temporary word and guessedLetters that were used for testing

> Make sure to change the associated variable names we used before to the correct imported variable names
> 

```tsx
export function HangmanWord({ wordToGuess, guesses }: HangmanWordProps) {
    return (
        <div style={{
            display: "flex",
            gap: "0.25em",
            fontSize: "6em",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace"
        }}>
        {wordToGuess.split("").map((letter, index) => (
            <span style={{borderBottom: "0.1em solid black"}} key={index}>
                <span style={{visibility: guesses.includes(letter) ? "visible" : "hidden"}}>
                    {letter}
                </span>
            </span>
        ))}
        </div>
    )
}
```

The updated HangmanWord function is above

---

******************************************************************************************************Now we need to implement the keyboard functionality******************************************************************************************************

For using the actual keyboard as input, we need to set up an event listener. (*********useEffect*********)

The useEffect is given below:

```tsx
function addGuess(key: string) {
		if (guesses.includes(key)) return
		setGuesses(guesses => [...guesses, key])
}

useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (!key.match(/^[a-z]$/)) return

      event.preventDefault()
      addGuess(key)
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])
```

1. ****************************************The handler function****************************************
    1. This is to handle keyboard events, inside of it, it takes a KeyboardEvent, event, which is anything input on the keyboard.
    2. It then sets that key to a lowercase letter and stores it in the key variable
2. ********************************************the  addGuess function********************************************
    1. The function add guess is then defined, which takes in a key with type string and checks if it’s in the guesses already, if it is, it just returns, otherwise it adds the key to the guesses array
3. ********************************************************Remaining parts of useEffect********************************************************
    1. outside of the addguess function, it makes sure the key is alphabetical (it will just return if not) and then will prevent default (which can be wonky) for the keypress and then uses the addguess function to add the key pressed to the guesses
    2. Then the handler function is registered as a keydown event on the document
    3. The final return to remove the event listener is just for cleanup when it is unmounted

---

There is still an issue present caused by useEffect, which makes it so multiple presses of the same wrong key adds more than one element to the drawing

This is caused by the useEffect only being run once while mounting which means the handler only uses the empty guesses array each time

Changing the empty array at the end of the useEffect hook to include guesses will technically solve the problem

```tsx
useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (!key.match(/^[a-z]$/)) return

      event.preventDefault()
      addGuess(key)
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [guesses])
```

This solution will rerender the whole function as well, so we can useCallback on the addGuess function with the guesses as dependency again to resolve that!

```tsx
const addGuess = useCallback((key: string) => {
    if (guesses.includes(key)) return
    setGuesses(guesses => [...guesses, key])
  }, [guesses])
```

---

*********************************************************************************************************************************************************************************Now we need to work on the on screen keyboard functionality*********************************************************************************************************************************************************************************

For this we need to add the props again like we did for the previous files, in App.tsx, that looks like the following:

```tsx
					<Keyboard 
          activeLetter={guesses.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={wrongGuesses}
          addGuess={addGuess}/>
```

The inactiveLetters we generated already for our hangman drawing, the addGuess function we developed for the keyboard interactivity, and then our activeLetter prop is just a filter for the correct guesses that we’ve made

Inside of our keyboard file, we again have to pass the props and then set their type to keyboardprops as follows:

```tsx
type KeyboardProps = {
    activeLetter: string[],
    inactiveLetters: string[],
    addGuess: (key: string) => void
}

export function Keyboard({ activeLetter, inactiveLetters, addGuess }: KeyboardProps)
```

Then inside of our keyboard function, we want to add the guess when we click on the button which is a simple onClick addition to our button as follows:

```tsx
<button onClick={() => addGuess(key)} key={key} className={`${styles.btn}`} >
```

Then we need to add the styling that we made for active and inactive buttons, which we should first generate the arrays of correct and incorrect guesses (as isActive and isInactive)

```tsx
const isActive = activeLetters.includes(key)
const isInactive = inactiveLetters.includes(key)
```

With this, inside of our className call in the button object, we can pass this info and use inline TF statements to style them!

```tsx
className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
```

The final thing to do is to disable those buttons which is simply adding a disabled parameter in our button, like below:

```tsx
<button onClick={() => addGuess(key)} key={key} disabled = {isInactive || isActive} className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} >
```

This makes our final Keyboard file look like the following:

```tsx
import styles from './Keyboard.module.css';

const KEYS: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

type KeyboardProps = {
    activeLetters: string[],
    inactiveLetters: string[],
    addGuess: (key: string) => void
}

export function Keyboard({ activeLetters, inactiveLetters, addGuess }: KeyboardProps) {
        
    
    return (
        <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(2.5em, 1fr))", gap: "0.25em",
        }}>
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)

                return (
                    <button onClick={() => addGuess(key)} key={key} disabled = {isInactive || isActive} className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} >
                        
                        {key}
                    </button>
                )
            })}
        </div>
    )
}
```

---

### Win Conditions and Display!

First we need to have variables that store whether the game is won or lost!

For a game that’s lost, it’s rather easy, we just have to check whether the array of wrongGuesses is equal to or longer than 6

For a game that’s won, it takes some more code, but we essentially have to split the wordToGuess into an array and then use the *****every***** function to check if every letter in the split wordToGuess is included in our guesses array

These two are done in the following code snippet:

```tsx
const gameLost = wrongGuesses.length >= 6

const gameWon = wordToGuess.split('').every(letter => guesses.includes(letter))
```

To see how this logic works, we can simply add in the following code as a replacement for our lines that just read win or loss:

```tsx
<div style={outcomeStyle}>
        {gameLost && <div className={styles.loss}>You lost!</div>}
        {gameWon && <div className={styles.win}>You won!</div>}
</div>
```

This will check if the game lost variable is true and then style a div element based on the loss class, or it will do the same but for the game won variable

So like we did with the keyboard, we’re changing up the styling to be from an outside module, in this case, it’s going to be called app.module.css, so we have to import that as well

```tsx
import styles from './app.module.css';
```

I also removed the const styles we had earlier and migrated them to the css file, and then also moved down the outcome div, so the app return looks like the following:

```tsx
return (
    <div className={styles.returnStyle}>
      <HangmanDrawing numberOfGuesses={wrongGuesses.length} />
      <HangmanWord guesses={guesses} wordToGuess={wordToGuess}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard 
          activeLetters={guesses.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={wrongGuesses}
          addGuess={addGuess}/>
      </div>
      <div className={styles.outcomeStyle}>
        {gameLost && <div className={styles.loss}>You Lost!</div>}
        {gameWon && <div className={styles.win}>You Won!</div>}
      </div>
    </div>
 )
```

This is okay so far, but we want to add more text and have a smooth animation

To do so, we need the module file:

 

```css
.loss {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8rem;
    font-weight: bold;
    color: #fff;
    transition: all 2s ease;
}

.win {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: green;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    font-weight: bold;
    color: #fff;
    transition: all 2s ease;
}

.outcomeStyle {
    font-size: 2rem;
    text-align: center;
    color: #000;
}

.returnStyle {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin: 0 auto; 
    align-items: center;
}

.resultText {
    font-size: 6rem;
    width: 100%;
    text-align: center;
    color: white;
    position: absolute;
    left: 0%;
    font-weight: bold;
    transition: all 2s ease;

}
```

To then have the game change for win or loss, we change to the following code inside of the outcome div:

```tsx
<div className={styles.outcomeStyle}>
        <div className={`${gameLost ? styles.loss : ""} ${gameWon ? styles.win : ""}`} />
        {gameWon || gameLost ? "To Try Again, Refresh" : ""}
        <div className={`${gameLost || gameWon ? styles.resultText : ""}`}>
          {gameLost ? 'You Lost' : gameWon ? 'You Won!' : ""}
        </div>
</div>
```

This will show only on game won or lost and will style accordingly and allow the transitions to occur

Though the div on top prevents you from being able to click on more keys after winning or losing, you can still type: The way to fix this is to change our addGuess function to just return if the game is lost or won, which looks like the following:

```tsx
const addGuess = useCallback((key: string) => {
    if (guesses.includes(key) || gameLost || gameWon) return
    setGuesses(guesses => [...guesses, key])
  }, [guesses, gameLost, gameWon])
```

```tsx
<span style={{
         visibility: guesses.includes(letter) ? "visible" : gameLost ? "visible" : "hidden",
         color: gameLost ?  !guesses.includes(letter) ? "red" : "black" : ""
          }}>
        {letter}
</span>

```

The above code changed up some stuff to the color. It essentially checks if the game is lost, and in that case it looks for if the letter isn’t in the guesses, it’s going to be red and if it is then it’ll be black. And then it also does a check on visibility and if the game is lost, then it will be visible otherwise hidden

To add in the functionality where it will refresh when we press enter, we essentially have to recreate the event handler, but modify to look like the below code:

```tsx
useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key
      if (key !== "Enter") return

      event.preventDefault()
      setWordToGuess(getWord())
        
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])
```

This calls on a function “getWord()” which we haven’t created, so we can make that right below the imports, which it will look like the following:

```tsx
function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}
```

If you notice, this is the exact same as our initial function in the useState of our Word, so we can replace that with getWord() like so:

```tsx
const [wordToGuess, setWordToGuess] = useState(getWord())
```

This still isn’t fully working because we need to now set our guessed letters back to an empty array to avoid the letters we’ve guessed affect our new guessing word, which you can see all we’ve added is setGuesses([])

```tsx
useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key
      if (key !== "Enter") return

      event.preventDefault()
      setGuesses([])
      setWordToGuess(getWord())
        
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])
```

To add cleanliness to the code, you can combine this with the first event handler, which is shown below:

```tsx
useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (!key.match(/^[a-z]$/)) return

      event.preventDefault()
      addGuess(key)
        
    }
    const enterHandler = (event: KeyboardEvent) => {
      const key = event.key
      if (key !== "Enter") return

      event.preventDefault()
      setGuesses([])
      setWordToGuess(getWord())
        
    }

    document.addEventListener('keydown', handler)
    document.addEventListener('keydown', enterHandler)

    return () => {
      document.removeEventListener('keydown', handler)
      document.removeEventListener('keydown', enterHandler)
    }
  }, [guesses])
```

## That’s a wrap!

I may come back and implement more, but this is a functioning game now with some interesting styling!

There was some funkiness which I forgot to document, but you can get the full codebase from the [GitHub Repository](https://github.com/CThomas-UT/ReactTSHangman)!