import { useCallback, useEffect, useState } from "react";
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

  const addGuess = useCallback((key: string) => {
    if (guesses.includes(key)) return
    setGuesses(guesses => [...guesses, key])
  }, [guesses])

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


  return (
    <div style={returnStyle}>
      <div style={outcomeStyle}>
        Lose
        Win
      </div>
      <HangmanDrawing numberOfGuesses={wrongGuesses.length} />
      <HangmanWord guesses={guesses} wordToGuess={wordToGuess}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard 
          activeLetters={guesses.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={wrongGuesses}
          addGuess={addGuess}/>
      </div>
    </div>
  )
}

export default App
