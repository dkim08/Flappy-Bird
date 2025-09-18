import React from "react";
import './style.css';

const LoadingScreen: React.FC = ({action} : MainMenuProps) => {

    setTimeout( () => {
        action('game')
    }, 3000)

    return(
        <div className="loading-screen">
            <div className="loader">
                <h1>Loading</h1>
            </div>
        </div>
    )
}

export default LoadingScreen;