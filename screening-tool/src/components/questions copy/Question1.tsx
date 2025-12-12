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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 100px)",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        {apples.map((apple) => (
          <img
            key={apple}
            src="apple.svg" 
            alt="apple"
            onClick={() => toggleApple(apple)}
            style={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              transform: selected.includes(apple)
                ? "scale(1.3)" 
                : "scale(1)",
              filter: selected.includes(apple)
                ? "drop-shadow(0px 0px 8px #4caf50)"
                : "none", // optional glow
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
