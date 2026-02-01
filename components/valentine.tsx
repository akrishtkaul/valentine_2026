'use client';

import { useRef, useState, useEffect } from 'react';
import FloatingHearts from './FloatingHearts';
import LetterStage, { LETTER_LINES } from './LetterStage';

type Stage = 'initial' | 'letter' | 'question' | 'fine' | 'yes';

export default function Valentine() {
  const [stage, setStage] = useState<Stage>('initial');
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const [showScript, setShowScript] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [letterStep, setLetterStep] = useState(0);

  // letter reveal progression
  useEffect(() => {
    if (stage !== 'letter') return;

    // Finished revealing the letter → move on.
    if (letterStep >= LETTER_LINES.length) {
      const done = setTimeout(() => {
        setStage('question');
        setLetterStep(0);
      }, 700);
      return () => clearTimeout(done);
    }

    const timer = setTimeout(() => setLetterStep((s) => s + 1), 800);
    return () => clearTimeout(timer);
  }, [stage, letterStep]);

  const handleStartAudio = async () => {
    if (audioStarted) return;
    try {
      await audioRef.current?.play();
      setAudioStarted(true);
    } catch {
      // ignore autoplay block; user can click again
    }
  };

  const handleInitialClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await handleStartAudio();
    setStage('letter');
    setLetterStep(0);
  };

  const handleYes = () => {
    setStage('yes');
  };

  const handleReplay = () => {
    setStage('letter');
    setLetterStep(0);
    setNoCount(0);
    setNoPosition({ x: 0, y: 0 });
    setShowScript(false);
  };

  const handleNo = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 5) {
      setStage('fine');
      return;
    }

    const randomX = Math.random() * 500 - 100;
    const randomY = Math.random() * 400 - 100;
    setNoPosition({ x: randomX, y: randomY });
  };

  const noMessages = [
    "WRONG ANSWER! 😘",
    "TRY AGAIN! 🥺",
    "GAME OVER? 💔",
    "LAST LIFE! 🥺💕",
    "FINAL ATTEMPT! 😭",
  ];

  const yesFontSize = Math.min(16 + noCount * 8, 48);
  const recipientLine = LETTER_LINES[0] ?? 'Dear you,';

  return (
    <div
      className="min-h-screen bg-black p-4 relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '50px 50px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixel-text {
          font-family: 'Press Start 2P', cursive;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        
        .pixel-border {
          border: 4px solid #ff10f0;
          box-shadow: inset 0 0 0 2px #00ffff;
        }
        
        .pixel-button {
          font-family: 'Press Start 2P', cursive;
          border: 3px solid currentColor;
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
          transition: all 0.1s;
        }
        
        .pixel-button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.5);
        }
        
        .pixel-button:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .scanline {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(255, 16, 240, 0.3);
          animation: scan 8s linear infinite;
          pointer-events: none;
          z-index: 50;
        }
      `}</style>
      
      <div className="scanline" />
      <audio ref={audioRef} src="/grentperez.mp3" loop preload="auto" />
      <FloatingHearts />

      {stage === 'initial' && (
        <div className="text-center cursor-pointer z-10" onClick={handleInitialClick}>
          <div className="pixel-border bg-black p-8 sm:p-12 max-w-lg w-full relative">
            <div className="pixel-text text-xl sm:text-2xl text-[#00ffff] mb-6 leading-relaxed">
              ▓▓▓ QUEST START ▓▓▓
            </div>
            <div className="pixel-text text-xs sm:text-sm text-[#ff10f0] mb-6 leading-loose">
              Someone has sent you<br/>
              A special message<br/>
              Will you accept?
            </div>
            <div className="pixel-text text-[10px] text-[#00ff00] animate-pulse">
              [ CLICK ANYWHERE TO BEGIN ]
            </div>
          </div>
        </div>
      )}

      {stage === 'letter' && <LetterStage letterStep={letterStep} />}

      {stage === 'question' && (
        <div className="text-center z-10 w-full px-4">
          <div className="mb-8 pixel-border bg-black p-8 max-w-2xl mx-auto">
            <div className="pixel-text text-sm sm:text-lg text-[#ff10f0] mb-4 leading-loose">
              FINAL BOSS QUESTION
            </div>
            <div className="pixel-text text-xs text-[#00ffff] leading-loose">
              Will you be my Valentine?
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
            <button
              onClick={handleYes}
              style={{ fontSize: `${Math.min(yesFontSize, 24)}px` }}
              className="pixel-button bg-[#00ff00] text-black font-bold py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap"
            >
              YES ❤️
            </button>

            <div
              style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
              className="transition-transform duration-150"
            >
              <button
                onClick={handleNo}
                className="pixel-button bg-[#ff10f0] text-black font-bold py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap"
              >
                NO 💔
              </button>
            </div>
          </div>

          {noCount > 0 && (
            <div className="mt-8 pixel-border bg-black p-4 max-w-xl mx-auto">
              <p className="pixel-text text-[10px] sm:text-xs text-[#ffff00] animate-pulse">
                {noMessages[noCount - 1]}
              </p>
            </div>
          )}
        </div>
      )}

      {stage === 'fine' && (
        <div className="text-center z-10 w-full px-4">
          <div className="pixel-border bg-black p-8 sm:p-12 max-w-xl mx-auto">
            <div className="pixel-text text-lg sm:text-2xl text-[#ffff00] mb-6 leading-loose">
              GAME OVER
            </div>
            <div className="pixel-text text-xs text-[#00ffff] mb-8 leading-loose">
              You have defeated me<br/>
              I give up 😭
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <button
                onClick={handleReplay}
                className="pixel-button bg-[#ff10f0] text-black font-bold py-3 px-4"
              >
                TRY AGAIN
              </button>

              <button
                onClick={handleYes}
                className="pixel-button bg-[#00ff00] text-black font-bold py-3 px-4"
              >
                FINE YES 💘
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'yes' && (
        <div className="text-center z-10 w-full px-4">
          <div className="pixel-border bg-black p-8 sm:p-12 max-w-xl mx-auto">
            <div className="pixel-text text-lg sm:text-2xl text-[#00ff00] mb-6 leading-loose">
              YOU WIN!
            </div>
            <div className="pixel-text text-xs text-[#00ffff] mb-8 leading-loose">
              Level Complete 💞<br/>
              Date: FEB 14 2026
            </div>

            <div className="flex flex-col gap-3 justify-center mb-8">
              <button
                onClick={handleReplay}
                className="pixel-button bg-[#ff10f0] text-black font-bold py-3 px-4"
              >
                REPLAY
              </button>

              <button
                onClick={() => setShowScript(true)}
                className="pixel-button bg-[#00ff00] text-black font-bold py-3 px-4"
              >
                SEND TEXT
              </button>
            </div>

            {showScript && (
              <div className="pixel-border bg-black text-[#00ff00] p-4 text-left text-[8px] sm:text-[10px] font-mono">
                <p className="mb-2">$ TEXT TO: AKRISHT</p>
                <p className="text-[#ffff00]">&gt; Akrisht, I&apos;d love to be</p>
                <p className="text-[#ffff00]">&gt; your Valentine! You&apos;re</p>
                <p className="text-[#ffff00]">&gt; the best player 2 ever.&quot;</p>
              </div>
            )}

            <div className="mt-8 pixel-text text-xs text-[#ff10f0] animate-pulse">
              ★ CONGRATULATIONS ★
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
