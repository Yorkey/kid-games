"use client";
import React, { useEffect, useState } from "react";
import LetterGame, { Letter } from "./logic";
import { playAudio } from "../utils/audio";

const LetterChallenge = () => {
  const [game, setGame] = useState<LetterGame | null>(null);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newGame = new LetterGame(3000, 50, window.innerWidth, window.innerHeight);
    setGame(newGame);
    newGame.start();
    newGame.pause();

    const intervalId = setInterval(() => {
      setLetters([...newGame.letters]);
      setScore(newGame.score);
    }, 100);

    return () => {
      clearInterval(intervalId);
      newGame.reset();
    };
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (game) {
      const score = game.handleKeyPress(event.key);
      if (score) {
        playAudio('score');
        if (game.score % 10 === 0){
          playAudio('congrats');
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [game]);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 p-4 z-10">
        <button className="btn-primary btn mr-2" onClick={() => game?.resume()} disabled={!game?.isPaused()}>开始</button>
        <button className="btn-primary btn mr-2" onClick={() => game?.pause()} disabled={game?.isPaused()}>暂停</button>
        <button className="btn-primary btn" onClick={() => game?.reset()}>重置</button>
      </div>
      <div className="absolute top-4 right-4 p-4 z-10 bg-white shadow-lg rounded-lg">
        <span className="text-4xl font-bold text-primary">得分: {score}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <h1 className="text-4xl font-bold mb-8 text-center">字母挑战</h1>
      </div>
      <div className="absolute inset-0 z-0 bg-green-200">
        {letters.map((letter, index) => (
          <div
            key={letter.char + index}
            className={`absolute text-6xl font-bold text-shadow-lg transition-all duration-1000 ease-out ${letter.disappearing ? 'opacity-0 transform scale-150' : 'opacity-100 transform scale-100'}`}
            style={{ top: `${letter.y}px`, left: `${letter.x}px`, color: letter.color }}
          >
            {letter.char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterChallenge;
