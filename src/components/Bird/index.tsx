import React from "react";
import './style.css';
import flappyBird from '../../../public/assets/Flappy Bird.svg'

const Bird: React.FC = () => {
    return(
        <div className="flappy-bird-container">
            <img className="bird" src={flappyBird} alt="" />
        </div>
    )
}

export default Bird;