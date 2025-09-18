import React, { ReactElement, useEffect, useState } from "react";
import './style.css';
import pipeBottom from "../../../public/assets/Pipe-bottom.svg";
import pipeUp from "../../../public/assets/Pipe-up.svg";

export type TPipePosition = "top" | "bottom";
export type TPipeSize = "short" | "large";

export interface PipeProps {
    position: TPipePosition;
    size: TPipeSize;
    styles?: React.CSSProperties;
    coordX?: number;
}

const Pipe: React.FC<PipeProps> = ({ position, size }: PipeProps): ReactElement => {
    const transformStyles = position === "top" ? { transform: 'rotate(0)' } : { transform: 'rotate(180deg)' };
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

const Pipes: React.FC<PipeProps> = ({ position, size, coordX = 0 }: PipeProps) => {
    const size2 = size === 'short' ? 'large' : 'short';
    const position2 = position === 'top' ? 'bottom' : 'top';
    const [move, setMove] = useState<number>(coordX);

    const nextStep = () => {
        
    }
    // const nextStep = () => {
    //     setTimeout(() => {
    //         setMove(move - 3), 50){
    //             if (move <= -300) {
    //                 return coordX;
    //             }
    //             return move - 3;
    //     }
    // }
// }

useEffect(() => {
    setTimeout(() => setMove(move - 3), 50);
})

return (
    <div
        className="pipes-container"
        style={{
            transform: `translateX(${move}px)`,
        }}
    >
        <Pipe size={size} position={position} />

        <Pipe size={size2} position={position2} />
    </div>
)
}

export default Pipes;