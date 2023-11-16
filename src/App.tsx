import { useCallback, useEffect, useState } from "react";
import words from './chicagoWordList.json';
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import styles from './app.module.css';

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guesses, setGuesses] = useState<string[]>([])

  const wrongGuesses = guesses.filter((letter) => !wordToGuess.includes(letter))

  const gameLost = wrongGuesses.length >= 6

  const gameWon = wordToGuess.split('').every(letter => guesses.includes(letter))

  const addGuess = useCallback((key: string) => {
    if (guesses.includes(key) || gameLost || gameWon) return
    setGuesses(guesses => [...guesses, key])
  }, [guesses, gameLost, gameWon])

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
    <div className={styles.returnStyle}>
      <HangmanDrawing numberOfGuesses={wrongGuesses.length} />
      <HangmanWord guesses={guesses} wordToGuess={wordToGuess} gameLost={gameLost}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard 
          activeLetters={guesses.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={wrongGuesses}
          addGuess={addGuess}/>
      </div>
      <div className={styles.outcomeStyle}>
        <div className={`${gameLost ? styles.loss : ""} ${gameWon ? styles.win : ""}`} />
        <div className={`${gameLost || gameWon ? styles.resultText : ""}`}>
          {gameLost ? 'You Lost' : gameWon ? 'You Won!' : ""}
          <div className={styles.tryagain}>
            {gameWon || gameLost ? "Refresh or Press Enter to Play Again" : ""}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
