import React from "react";
import './style.css';
import {ScreenProps} from "../../components/App";

const LoadingScreen: React.FC<ScreenProps> = ({action} : ScreenProps) => {

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