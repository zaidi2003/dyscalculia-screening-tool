import React, { useState } from "react";

interface Question7Props {
  onAnswer: (answer: string) => void;
}

const Question7: React.FC<Question7Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  const boxStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? "#c8e6c9" : "#fefaf2", // light green highlight
    border: `3px solid ${isSelected ? "#4caf50" : "#ddd"}`,
    boxShadow: isSelected ? "0 0 0 4px #4caf50 inset" : "none",
    borderRadius: "15px",
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.25s ease",
    color: "#1C3046",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fefaf2", // matches ScreenBorder theme
        border: "3px solid #4caf50",
        borderRadius: "12px",
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
        <div
          onClick={() => handleSelect("54")}
          style={boxStyle(selected === "54")}
        >
          54
        </div>
        <div
          onClick={() => handleSelect("45")}
          style={boxStyle(selected === "45")}
        >
          45
        </div>
      </div>
    </div>
  );
};

export default Question7;
