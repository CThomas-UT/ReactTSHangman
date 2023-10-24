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



export function HangmanDrawing() {
    return (
        <div style={{position: "relative"}}>
            
            {/* render hangman body */}
            {HEAD}
            {BODY}
            {LLEG}
            {RLEG}
            {LARM}
            {RARM}

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