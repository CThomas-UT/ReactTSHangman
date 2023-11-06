type HangmanWordProps = {
    guesses: string[]
    wordToGuess: string
}

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