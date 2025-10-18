// src/components/questions/Question1.tsx
import React, { useState } from "react";

interface Question1Props {
  onAnswer: (answer: string[]) => void; // parent receives selected apples
}

const Question1: React.FC<Question1Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const apples = Array.from({ length: 10 }, (_, i) => `apple-${i + 1}`);

  const toggleApple = (apple: string) => {
    const newSelected = selected.includes(apple)
      ? selected.filter((a) => a !== apple)
      : [...selected, apple];

    setSelected(newSelected);
    onAnswer(newSelected); // send to parent
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 80px)",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        {apples.map((apple) => (
          <div
            key={apple}
            onClick={() => toggleApple(apple)}
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: selected.includes(apple)
                ? "#4caf50"
                : "#f44336",
              borderRadius: "50%",
              cursor: "pointer",
              transition: "0.2s",
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
