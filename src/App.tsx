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

  const wrongGuesses = guesses.filter((letter) => !wordToGuess.includes(letter))

  const returnStyle = {
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
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
      <HangmanDrawing numberOfGuesses={wrongGuesses.length} />
      <HangmanWord guesses={guesses} wordToGuess={wordToGuess}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard />
      </div>
    </div>
  )
}

export default App
