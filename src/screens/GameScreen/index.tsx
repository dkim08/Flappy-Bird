import React, { useEffect, useState } from "react";
import Bird from "../../components/Bird"
import Pipes, { PipeProps } from "../../components/Pipes";
import "./style.css";

export const PIPES: PipeProps[] = [
    { size: 'large', position: 'bottom', coordX: 200 },
    { size: 'short', position: 'bottom', coordX: 400 },
    { size: 'large', position: 'bottom', coordX: 400 },
    {size: 'short', position: 'bottom', coordX: 500},
    {size: 'large', position: 'bottom', coordX: 600},
    {size: 'short', position: 'bottom', coordX: 700},
]

const SCREEN_WIDTH = 250;
const PIPE_SPEED = 6;

const GameScreen: React.FC = () => {
    const [move, setMove] = useState<number[]>([0, SCREEN_WIDTH]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMove((prev) =>
                prev.map((pos) =>
                    pos <= -SCREEN_WIDTH ? SCREEN_WIDTH : pos - PIPE_SPEED
                )
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);


    return (

        <div className="game-screen">
            <Bird />
            {move.map((pos, screenIndex) => (
                <div
                    key={screenIndex}
                    className="pipes-pare-wrapper"
                    style={{ transform: `translateX(${pos}px)` }}
                >
                    {PIPES.map((pipe, index) => (
                        <Pipes
                            key={index}
                            position={pipe.position}
                            size={pipe.size}
                            coordX={pipe.coordX}
                        />
                    ))}
                </div>

                
            ))}
        </div>
    );


}

export default GameScreen;