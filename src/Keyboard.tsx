import styles from './Keyboard.module.css';

const KEYS: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function Keyboard() {
    return (
        <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(2.5em, 1fr))", gap: "0.25em",
        }}>
            {KEYS.map(key => {
                return (
                    <button key={key} className={styles.btn} >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}