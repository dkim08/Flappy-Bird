import React, {useEffect, useRef, useState, useCallback} from "react";
import Bird from "../../components/Bird"
import Pipes from "../../components/Pipes";
import "./style.css";
import {ScreenProps} from "../../components/App";

const getRandomSize = (): 'short' | 'large' => {
    return Math.random() < 0.5 ? 'short' : 'large';
};

const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 600;
const PIPE_SPEED = 2;
const PIPE_GAP = 200;
const SPAWN_X = SCREEN_WIDTH + 100;
const REMOVE_X = -100;

interface BirdPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

const GameScreen: React.FC<ScreenProps> = ({action}) => {
    const [pipes, setPipes] = useState<Array<{ id: number, x: number, size?: 'short' | 'large' }>>([]);
    const nextIdRef = useRef(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [passedPipes, setPassedPipes] = useState<Set<number>>(new Set());

    const checkCollision = useCallback((bird: BirdPosition, pipes: Array<{ id: number, x: number, size?: 'short' | 'large' }>) => {
        if (bird.y < 0 || bird.y + bird.height > SCREEN_HEIGHT) {
            return true;
        }

        for (const pipe of pipes) {
            const pipeX = pipe.x;
            const pipeWidth = 66;

            if (bird.x < pipeX + pipeWidth && bird.x + bird.width > pipeX) {
                const topPipeHeight = pipe.size === 'short' ? SCREEN_HEIGHT * 0.3 : SCREEN_HEIGHT * 0.4;
                const bottomPipeHeight = pipe.size === 'short' ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.3;

                const topPipeBottom = topPipeHeight;
                const bottomPipeTop = SCREEN_HEIGHT - bottomPipeHeight;

                if (bird.y < topPipeBottom) {
                    return true;
                }

                if (bird.y + bird.height > bottomPipeTop) {
                    return true;
                }
            }
        }
        return false;
    }, []);

    const updateScore = useCallback((bird: BirdPosition, pipes: Array<{ id: number, x: number, size?: 'short' | 'large' }>) => {
        let newScore = 0;
        const newPassedPipes = new Set(passedPipes);

        for (const pipe of pipes) {
            if (bird.x > pipe.x + 66 && !newPassedPipes.has(pipe.id)) {
                newPassedPipes.add(pipe.id);
                newScore++;
            }
        }

        if (newScore > 0) {
            setPassedPipes(newPassedPipes);
            setScore(prev => prev + newScore);
        }
    }, [passedPipes]);

    const handleGameStart = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setPassedPipes(new Set());
    };

    const handleGameOver = () => {
        setGameOver(true);
        setGameStarted(false);
        setTimeout(() => action('main'), 3000);
    };

    const handleBirdPositionUpdate = (position: BirdPosition) => {
        if (gameStarted && !gameOver) {
            if (checkCollision(position, pipes)) {
                handleGameOver();
                return;
            }

            updateScore(position, pipes);
        }
    };

    useEffect(() => {
        const initialPipes = [];
        for (let i = 0; i < 3; i++) {
            initialPipes.push({
                id: i,
                x: SPAWN_X + i * PIPE_GAP,
                size: getRandomSize(),
            });
        }
        setPipes(initialPipes);
        nextIdRef.current = 3;
    }, []);

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const interval = setInterval(() => {
            setPipes(prevPipes => {
                let newPipes = prevPipes.map(pipe => ({
                    ...pipe,
                    x: pipe.x - PIPE_SPEED,
                }));

                newPipes = newPipes.filter(pipe => pipe.x > REMOVE_X);
                const rightmostX = Math.max(...newPipes.map(p => p.x), SPAWN_X - PIPE_GAP);
                if (rightmostX < SPAWN_X) {
                    newPipes.push({
                        id: nextIdRef.current++,
                        x: rightmostX + PIPE_GAP,
                        size: getRandomSize(),
                    });
                }

                return newPipes;
            });
        }, 16);

        return () => clearInterval(interval);
    }, [gameStarted, gameOver]);

    return (
        <div className="game-screen">
            {!gameStarted && !gameOver && (
                <div className="start-screen">
                    <p>Чтобы прыгать, нажмите пробел</p>
                </div>
            )}

            {gameOver && (
                <div className="game-over-screen">
                    <h2>Вы проиграли!</h2>
                    <p>Рекорд: {score}</p>
                </div>
            )}

            {gameStarted && !gameOver && (
                <div className="score">Рекорд: {score}</div>
            )}

            <Bird
                onGameStart={handleGameStart}
                onPositionUpdate={handleBirdPositionUpdate}
                gameStarted={gameStarted}
                gameOver={gameOver}
                x={50}
            />

            {pipes.map((pipe) => (
                <Pipes key={pipe.id} coordX={pipe.x} size={pipe.size}/>
            ))}
        </div>
    );
};

export default GameScreen;