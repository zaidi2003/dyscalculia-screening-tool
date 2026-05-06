import React, { useState } from "react";

interface Question1Props {
  onAnswer: (answer: number) => void;
}

const Question1: React.FC<Question1Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const apples = Array.from({ length: 10 }, (_, i) => `apple-${i + 1}`);

  const toggleApple = (apple: string) => {
    const newSelected = selected.includes(apple)
      ? selected.filter((a) => a !== apple)
      : [...selected, apple];
    setSelected(newSelected);
    onAnswer(newSelected.length);
  };

  return (
    <div>
      <style>{`
        .apple-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(8px, 2vw, 15px);
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 450px) {
          .apple-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 200px;
          }
        }
      `}</style>

      <div className="apple-grid">
        {apples.map((apple) => (
          <img
            key={apple}
            src="apple.svg"
            alt="apple"
            onClick={() => toggleApple(apple)}
            style={{
              width: "100%",
              height: "auto",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              transform: selected.includes(apple) ? "scale(1.3)" : "scale(1)",
              filter: selected.includes(apple)
                ? "drop-shadow(0px 0px 8px #4caf50)"
                : "none",
            }}
          />
        ))}
      </div>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Selected: {selected.length}
      </p>
    </div>
  );
};

export default Question1;
