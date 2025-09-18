import React, { useState} from "react";
// import Bird from "../../components/Bird"
import Pipes, {TPipePosition, TPipeSize} from "../../components/Pipes"
import "./style.css";

const GameScreen: React.FC = () => {
    const [pipes, setPipes] = useState([
        {size: 'large', position: 'top', coordX: 200},
        {size: 'short', position: 'bottom', coordX: 250},
        {size: 'large', position: 'top', coordX: 300},
        {size: 'short', position: 'bottom', coordX: 350},
        {size: 'large', position: 'top', coordX: 400},
        {size: 'short', position: 'bottom', coordX: 450},
    ])



    return (
        <div className="game-screen">
            {/* <Bird /> */}
            <div className="pipes-pare-wrapper">
                {pipes.map((pipe, index) => (
                    <Pipes key={index} position={pipe.position as TPipePosition} size={pipe.size as TPipeSize} coordX={pipe.coordX as number}/>
                ))}
            </div>
        </div>
    )
}   

export default GameScreen;