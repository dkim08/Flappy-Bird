import React, { ReactElement, useEffect, useState } from "react";
import './style.css';
import pipeBottom from "../../../public/assets/Pipe-bottom.svg";
import pipeUp from "../../../public/assets/Pipe-up.svg";
// import { PIPES } from "../../screens/GameScreen";

export type TPipePosition = "top" | "bottom";
export type TPipeSize = "short" | "large";

export interface PipeProps {
    position: TPipePosition;
    size: TPipeSize;
    styles?: React.CSSProperties;
    coordX?: number;
}

const Pipe: React.FC<PipeProps> = ({ position, size }: PipeProps): ReactElement => {
    const transformStyles = position === "top" ? { transform: 'rotate(180deg)' } : { transform: 'rotate0)' };
    const imgSrc = size === "short" ? pipeUp : pipeBottom;

    return (
        <div
            className={`${size}-pipe-wrapper`}
            style={{
                ...transformStyles,
            }}
        >
            <img
                className={`${size}-pipe`}
                src={imgSrc}
                alt=""
            />
        </div>
    );
}

const Pipes: React.FC<PipeProps> = ({ position, size }: PipeProps) => {
    const size2 = size === 'short' ? 'large' : 'short';
    const position2 = position === 'top' ? 'bottom' : 'top';

    return (
        <div
            className="pipes-container"
        >
            <Pipe size={size} position={position} />
            <Pipe size={size2} position={position2} />
        </div>
    )
}

export default Pipes;