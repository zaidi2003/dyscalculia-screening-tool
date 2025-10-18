import React, { useState } from "react";

interface Question2Props {
  onAnswer: (answer: string[]) => void;
}

const Question2: React.FC<Question2Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const boxes = ["Car 1", "Car 2", "Car 3"];

  const toggleBox = (box: string) => {
    const newSelected = selected.includes(box)
      ? selected.filter((b) => b !== box)
      : [...selected, box];

    setSelected(newSelected);
    onAnswer(newSelected);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "40px" }}>
      {boxes.map((box) => (
        <div
          key={box}
          onClick={() => toggleBox(box)}
          style={{
            width: "100px",
            height: "100px",
            border: "4px solid #4caf50",
            backgroundColor: selected.includes(box) ? "#c8e6c9" : "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "12px",
            transition: "0.3s",
          }}
        >
          {box}
        </div>
      ))}
    </div>
  );
};

export default Question2;
