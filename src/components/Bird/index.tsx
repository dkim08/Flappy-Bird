import React, { useEffect, useState } from "react";
import './style.css';
import flappyBird from '../../../public/assets/Flappy Bird.svg'

const Bird: React.FC = () => {
    const [move, setMove] = useState<number>(0);

    useEffect(() => {
        const interval = setTimeout(() => {
            setMove(move + 10)
        }, 100);

        return () => clearTimeout(interval);
    }, [move]);

    return (
        <div
            className="flappy-bird-container"
            style={{ transform: `translateY(${move}px)` }}
        >
            <img className="bird" src={flappyBird} alt="" />
        </div>
    )
}

export default Bird;