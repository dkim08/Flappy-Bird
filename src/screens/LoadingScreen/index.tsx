import React from "react";
import './style.css';

const LoadingScreen: React.FC = ({action} : MainMenuProps) => {

    setTimeout( () => {
        action('game')
    }, 3000)

    return(
        <div className="loading-screen">
            <div className="loader"></div>
        </div>
    )
}

export default LoadingScreen;