import React from "react";
import './style.css';
// import loadingIcon from "../../../public/assets/Loading.svg";

const LoadingScreen: React.FC = ({action} : MainMenuProps) => {

    setTimeout( () => {
        action('main')
    }, 3000)

    return(
        <div className="loading-screen">
            {/* <img className="loadingIcon" src={loadingIcon} alt="" /> */}
            <div className="loader"></div>
        </div>
    )
}

export default LoadingScreen;