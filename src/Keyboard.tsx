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
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(2.5em, 1fr))", gap: "0.25em"
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