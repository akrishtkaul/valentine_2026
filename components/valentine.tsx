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
    "That's the wrong answer! 😘",
    "Come on, really? 🥺",
    "You're breaking my heart... 💔",
    "Please reconsider... 🥺💕",
    "Last chance! 😭",
  ];

  const yesFontSize = Math.min(16 + noCount * 8, 48);
  const recipientLine = LETTER_LINES[0] ?? 'Dear you,';

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden"
      onClick={handleStartAudio}
    >
      <audio ref={audioRef} src="/grentperez.mp3" loop preload="auto" />
      <FloatingHearts />

      {stage === 'initial' && (
        <div className="text-center cursor-pointer z-10" onClick={handleInitialClick}>
          <div className="relative max-w-lg w-full overflow-hidden rounded-3xl p-10 sm:p-12 shadow-2xl bg-white/70 backdrop-blur-xl border border-white/40">
            <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-pink-300/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-red-300/40 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mb-6">
                <span className="text-4xl">💌</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                Important Question
              </h1>
              <p className="mt-3 text-lg sm:text-xl text-gray-700">
                The person who sent you this has a really important question to ask...
              </p>
              <p className="mt-6 text-sm text-gray-600">Click anywhere to continue</p>
            </div>
          </div>
        </div>
      )}

      {stage === 'letter' && <LetterStage letterStep={letterStep} />}

      {stage === 'question' && (
        <div className="text-center z-10">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {recipientLine} 💕
            </h2>
            <p className="text-3xl font-semibold text-white drop-shadow-lg">
              Will you be my Valentine?
            </p>
          </div>

          <div className="flex items-center justify-center gap-12 h-32">
            <button
              onClick={handleYes}
              style={{ fontSize: `${yesFontSize}px` }}
              className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-110 whitespace-nowrap shadow-lg"
            >
              Yes ❤️
            </button>

            <div
              style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
              className="transition-transform duration-200"
            >
              <button
                onClick={handleNo}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg whitespace-nowrap shadow-lg"
              >
                No 💔
              </button>
            </div>
          </div>

          {noCount > 0 && (
            <p className="text-white font-semibold mt-6 text-lg drop-shadow-lg animate-bounce">
              {noMessages[noCount - 1]}
            </p>
          )}
        </div>
      )}

      {stage === 'fine' && (
        <div className="text-center z-10 w-full flex items-center justify-center px-4">
          <div className="relative max-w-lg w-full overflow-hidden rounded-3xl p-10 sm:p-12 shadow-2xl bg-white/70 backdrop-blur-xl border border-white/40">
            <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-pink-300/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-red-300/40 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mb-6">
                <span className="text-4xl">😭</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                OK FINE
              </h1>

              <p className="mt-3 text-lg sm:text-xl text-gray-700">
                You win. I give up. 😭
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReplay}
                  className="px-6 py-3 rounded-xl font-semibold bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  Try Again 😈
                </button>

                <button
                  onClick={handleYes}
                  className="px-6 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Fine, Yes 💘
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'yes' && (
        <div className="text-center z-10 w-full flex items-center justify-center px-4">
          <div className="relative max-w-lg w-full overflow-hidden rounded-3xl p-10 sm:p-12 shadow-2xl bg-white/70 backdrop-blur-xl border border-white/40">
            <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-pink-300/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-red-300/40 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mb-6">
                <span className="text-4xl">💘</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                It’s a date.
              </h1>

              <p className="mt-3 text-lg sm:text-xl text-gray-700">
                You just made my whole week. 💞
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReplay}
                  className="px-6 py-3 rounded-xl font-semibold bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  Replay 😈
                </button>

                <button
                  onClick={() => setShowScript(true)}
                  className="px-6 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Text me “Yes” 💬
                </button>
              </div>

              {showScript && (
                <div className="mt-6 rounded-2xl bg-black/80 text-rose-100 p-4 text-left text-sm sm:text-base font-mono shadow-lg border border-white/10">
                  <p className="text-rose-200">$ echo &quot;Text this to Akrisht Kaul:&quot;</p>
                  <p className="mt-2">
                    <span className="text-rose-200">$ </span>
                    <span className="text-rose-50">
                      echo &quot;Akrisht Kaul, aka the best boyfriend in the whole wide world, I&apos;d love to be your valentine.&quot;
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-10 flex items-center justify-center gap-3 text-3xl">
                <span className="animate-bounce [animation-delay:0ms]">💗</span>
                <span className="animate-bounce [animation-delay:120ms]">💞</span>
                <span className="animate-bounce [animation-delay:240ms]">💓</span>
                <span className="animate-bounce [animation-delay:360ms]">💖</span>
              </div>

              <p className="mt-6 text-sm text-gray-600">(You can’t take it back now.)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
