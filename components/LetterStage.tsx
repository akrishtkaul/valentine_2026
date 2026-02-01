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
      <div className="relative max-w-2xl w-full overflow-hidden rounded-3xl p-12 sm:p-16 shadow-2xl bg-white/70 backdrop-blur-xl border border-white/40">
        {/* soft glow */}
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-pink-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-red-300/40 blur-3xl" />

        <div className="relative space-y-6">
          {/* letter header decoration */}
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-red-400 to-transparent" />
          </div>

          {/* letter content */}
          <div className="space-y-4 min-h-96">
            {LETTER_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`transition-all duration-1000 ease-in-out ${
                  idx < letterStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                {line === '' ? (
                  <div className="h-3" />
                ) : (
                  <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
                    {line}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* letter footer decoration */}
          <div className="flex justify-center mt-8">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-red-400 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
