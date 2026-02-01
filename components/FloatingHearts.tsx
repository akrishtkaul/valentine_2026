'use client';

import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHearts(
      [...Array(20)].map((_, i) => ({
        id: i,
        left: Math.random() * 90,
        delay: Math.random() * 1.5,
        duration: Math.random() * 4 + 8,
        size: Math.random() * 40 + 40,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-70"
          style={{
            left: `${heart.left}%`,
            bottom: `-100px`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            backgroundImage: `url('/pixel_heart.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            animation: `float-up ${heart.duration}s infinite linear`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            bottom: -100px;
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            bottom: 110vh;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}