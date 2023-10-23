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