const KEYS: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function Keyboard() {
    return (
        <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(2em, 1fr))", gap: "0.25em",
        }}>
            {KEYS.map(key => {
                return (
                    <button key={key}>
                        {key}
                    </button>
                )
            })}
        </div>
    )
}