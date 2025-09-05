import React from "react";
import './style.css';
import pipeBottom from "../../../public/assets/Pipe-bottom.svg";
import pipeUp from "../../../public/assets/Pipe-up.svg";

const Pipes:
    React.FC = () => {
        return (
            <div className="pipes-container">
                <div className="pipe-bottom-content">
                    <img className="pipe-bottom" src={pipeBottom} alt="" />
                </div>
                <div className="pipes-spacing">
                    
                </div>
                <div className="pipe-up-content">
                    <img className="pipe-up" src={pipeUp} alt="" />
                </div>
            </div>
        )
    }

export default Pipes;