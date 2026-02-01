'use client';

// Shared with valentine.tsx
export const LETTER_LINES = [
  "Dear Cheryl Wong,",
  "",
  "I would love if you could join me on February 14, 2026 for a day together.",
  "",
  "The plan includes:",
  "Cooking something fun together",
  "Sushi",
  "Legos and crafts",
  "Watching shows",
  "Gift exchange",
  "",
  "A simple day, well spent, with plenty of time to enjoy each other's company.",
  "",
  "In other words, will you be my Valentine? :]",
  "",
  "From,",
  "Akrisht Kaul",
];

interface LetterStageProps {
  letterStep: number;
}

export default function LetterStage({ letterStep }: LetterStageProps) {
  return (
    <div className="text-center z-10 w-full flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
      
      <div className="relative max-w-2xl w-full p-8 sm:p-12" style={{
        border: '4px solid #ff10f0',
        boxShadow: 'inset 0 0 0 2px #00ffff, 0 0 20px rgba(255, 16, 240, 0.5)',
        backgroundColor: '#000',
      }}>
        <div className="relative space-y-4">
          <div className="text-center mb-8">
            <div className="font-['Press_Start_2P'] text-xs text-[#00ff00]">
              ▓▓▓ LETTER ▓▓▓
            </div>
          </div>

          <div className="space-y-3 min-h-96">
            {LETTER_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`transition-all duration-1000 ease-in-out ${
                  idx < letterStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                {line === '' ? (
                  <div className="h-2" />
                ) : (
                  <p className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[#00ffff] leading-relaxed">
                    {line}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="font-['Press_Start_2P'] text-[8px] text-[#ffff00] animate-pulse">
              [ CONTINUE ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
