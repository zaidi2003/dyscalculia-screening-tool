import React, { useState } from "react";

interface RatingEnjoymentProps {
  onAnswer: (answer: string) => void;
}

const RatingEnjoyment: React.FC<RatingEnjoymentProps> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const emojis = [
    { id: 1, symbol: "😄", label: "Very Happy" },
    { id: 2, symbol: "🙂", label: "Happy" },
    { id: 3, symbol: "😐", label: "Neutral" },
    { id: 4, symbol: "☹️", label: "Sad" },
    { id: 5, symbol: "😢", label: "Very Sad" },
  ];

  const handleSelect = (id: number) => {
    setSelected(id);
    onAnswer(String(id));
  };

  return (
    <div
      style={{
        borderRadius: "12px",
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <p style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
        Rate your experience
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        {emojis.map((emo) => (
          <div
            key={emo.id}
            onClick={() => handleSelect(emo.id)}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "12px",
              border: "3px solid",
              backgroundColor: selected === emo.id ? "#c8e6c9" : "#fff",
              borderColor: selected === emo.id ? "#4caf50" : "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "34px",
              transition: "0.2s background-color, 0.2s border-color",
            }}
          >
            {emo.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingEnjoyment;
