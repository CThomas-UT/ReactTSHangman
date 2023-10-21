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
