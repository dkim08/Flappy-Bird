import React, {type ReactElement} from "react";
import shortPipe from "../../../public/assets/shortPipe.svg";
import LargePipe from "../../../public/assets/LargePipe.svg";
import './style.css';

export type TPipeDirection = "to-bottom" | "to-top";
export type TPipeSize = "short" | "large";

export interface PipeProps {
    size?: TPipeSize;
    direction?: TPipeDirection;
    styles?: React.CSSProperties;
    coordX?: number;
}

export const Pipe: React.FC<PipeProps> = ({size, direction}: PipeProps): ReactElement => {
    const imgSrc = size === "short" ? shortPipe : LargePipe;
    return (
        <div
            className={`${direction}-pipe-wrapper`}
        >
            <img
                className={`pipe`}
                src={imgSrc}
                alt=""
            />
        </div>
    );
}

const Pipes: React.FC<PipeProps> = ({size, coordX}: PipeProps) => {
    const secondPipeSize = size === 'short' ? 'large' : 'short';

    return (
        <div
            className="pipes-container"
            style={{transform: `translateX(${coordX}px)`}}
        >
            <Pipe size={size} direction={'to-bottom'}/>
            <Pipe size={secondPipeSize} direction={'to-top'}/>
        </div>
    )
}

export default Pipes;