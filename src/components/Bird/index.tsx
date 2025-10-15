import React, {useEffect, useState, useRef, useCallback} from "react";
import flappyBird from '../../../public/assets/Flappy Bird.svg'
import './style.css';

interface BirdProps {
    onJump?: () => void;
    onGameStart?: () => void;
    onPositionUpdate?: (position: { x: number; y: number; width: number; height: number }) => void;
    gameStarted?: boolean;
    gameOver?: boolean;
    x?: number;
}

const Bird: React.FC<BirdProps> = ({
    onJump,
    onGameStart,
    onPositionUpdate,
    gameStarted = false,
    gameOver = false,
    x = 0
}) => {
    const [position, setPosition] = useState<number>(300); // Start at center of screen (600/2)
    const [velocity, setVelocity] = useState<number>(0);
    const [rotation, setRotation] = useState<number>(0);
    const [isFlapping, setIsFlapping] = useState<boolean>(false);
    const [isJumping, setIsJumping] = useState<boolean>(false);
    const animationRef = useRef<number>();
    const lastTimeRef = useRef<number>(0);

    const GRAVITY = 0.5;
    const JUMP_FORCE = -10;
    const MAX_ROTATION = 30;
    const MIN_ROTATION = -90;
    const MAX_VELOCITY = 15;

    const jump = useCallback(() => {
        if (!gameStarted || gameOver) return;

        setVelocity(JUMP_FORCE);
        setIsJumping(true);
        setIsFlapping(true);

        setTimeout(() => {
            setIsJumping(false);
            setIsFlapping(false);
        }, 200);

        onJump?.();
    }, [gameStarted, gameOver, onJump]);

    const handleClick = () => {
        if (!gameStarted) {
            onGameStart?.();
            return;
        }
        jump();
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.code === 'Space' || event.code === 'ArrowUp') {
                event.preventDefault();
                handleClick();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleClick]);

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const animate = (currentTime: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = currentTime;
            }

            const deltaTime = currentTime - lastTimeRef.current;
            lastTimeRef.current = currentTime;

            setPosition(prevPosition => {
                const newPosition = prevPosition + velocity * (deltaTime / 16);
                return newPosition;
            });

            setVelocity(prevVelocity => {
                const newVelocity = prevVelocity + GRAVITY * (deltaTime / 16);
                return Math.min(newVelocity, MAX_VELOCITY);
            });

            setRotation(prevRotation => {
                const targetRotation = Math.min(MAX_ROTATION, Math.max(MIN_ROTATION, velocity * 3));
                return prevRotation + (targetRotation - prevRotation) * 0.1;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [gameStarted, gameOver, velocity]);

    useEffect(() => {
        if (onPositionUpdate) {
            onPositionUpdate({
                x: x,
                y: position,
                width: 40,
                height: 40
            });
        }
    }, [position, x, onPositionUpdate]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            setPosition(300);
            setVelocity(0);
            setRotation(0);
            lastTimeRef.current = 0;
        }
    }, [gameStarted]);

    return (
        <div
            className="flappy-bird-container"
            style={{
                transform: `translateX(${x}px) translateY(${position}px) rotate(${rotation}deg)`,
                transition: gameStarted ? 'none' : 'transform 0.3s ease-out'
            }}
            onClick={handleClick}
        >
            <img
                className={`bird ${isFlapping ? 'flapping' : ''} ${isJumping ? 'jumping' : ''}`}
                src={flappyBird}
                alt="Flappy Bird"
                style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    width: '40px',
                    height: '40px'
                }}
            />
        </div>
    );
};

export default Bird;