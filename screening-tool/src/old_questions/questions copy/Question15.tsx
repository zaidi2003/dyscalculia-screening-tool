import React, { useState } from "react";

interface Question10Props {
  onAnswer: (answer: string) => void;
}

const Question10: React.FC<Question10Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const options = ["1/2", "1/3", "2/3", "1/4"];

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onAnswer(opt); // send answer to parent immediately
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
          src="water.png"
          alt="fruits"
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

export default Question10;
