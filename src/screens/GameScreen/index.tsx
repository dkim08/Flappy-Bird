import React from "react";
import Bird from "../../components/Bird"
import Pipes from "../../components/Pipes"
import "./style.css";

const GameScreen: React.FC = ({action} : MainMenuProps) => {
    return (
        <div className="game-screen">
            {/* <Bird /> */}
            <Pipes />
        </div>
    )
}   

export default GameScreen;