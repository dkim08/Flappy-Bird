import React from "react";
import {type ScreenProps} from "../../components/App";
import './style.css';

const LoadingScreen: React.FC<ScreenProps> = ({action} : ScreenProps) => {

    setTimeout( () => {
        action('game')
    }, 3000)

    return(
        <div className="loading-screen">
            <div className="loader">
            </div>
        </div>
    )
}

export default LoadingScreen;