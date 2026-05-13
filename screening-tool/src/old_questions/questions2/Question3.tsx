import React, { useState } from "react";

interface Question3Props {
  onAnswer: (answer: number) => void; // 🔹 number instead of string
}

const Question3: React.FC<Question3Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [7, 5, 1, 2]; // 🔹 numeric options

  const handleSelect = (opt: number) => {
    setSelected(opt);
    onAnswer(opt); // 🔹 send numeric value
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "30px",
      }}
    >
      {/* 🖼️ Left Side Image */}
      <div style={{ flex: "1 1 200px", textAlign: "center" }}>
        <img
          src="/butterflies2.svg"
          alt="butterflies"
          style={{
            width: "400px",
            height: "400px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* 🔢 Right Side Options */}
      <div
        style={{
          flex: "1 1 200px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 120px)",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {options.map((opt) => (
          <div
            key={opt}
            onClick={() => handleSelect(opt)}
            style={{
              backgroundColor: selected === opt ? "#4caf50" : "#fff8dc",
              border: "3px solid #8bc34a",
              borderRadius: "15px",
              padding: "30px 0",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow:
                selected === opt
                  ? "0 5px 15px rgba(76,175,80,0.5)"
                  : "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question3;
