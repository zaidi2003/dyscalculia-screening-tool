import React, { useState } from "react";

interface RatingQuestionProps {
  onAnswer: (answer: string) => void;
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const icons = [
    { id: 1, name: "sentiment_very_dissatisfied", color: "#d32f2f" },
    { id: 2, name: "sentiment_dissatisfied", color: "#f57c00" },
    { id: 3, name: "sentiment_neutral", color: "#fbc02d" },
    { id: 4, name: "sentiment_satisfied", color: "#7cb342" },
    { id: 5, name: "sentiment_very_satisfied", color: "#388e3c" },
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
      <p style={{ fontSize: "22px", fontWeight: "bold" }}>Rate your experience</p>

      <div style={{ display: "flex", gap: "25px" }}>
        {icons.map((icon) => (
          <div
            key={icon.id}
            onClick={() => handleSelect(icon.id)}
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "12px",
              border: "3px solid",
              borderColor: selected === icon.id ? icon.color : "#ddd",
              backgroundColor: selected === icon.id ? "#eef7ee" : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "0.25s",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "48px",
                color: selected === icon.id ? icon.color : "#999",
                transition: "0.25s",
              }}
            >
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingQuestion;
