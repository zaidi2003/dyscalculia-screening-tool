import React, { useState } from "react";

interface Question8Props {
  onAnswer: (answer: string) => void;
}

const Question8: React.FC<Question8Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  const boxStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? "#c8e6c9" : "#fefaf2",
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
    <div>
      <style>{`
        .q8-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #fefaf2;
          border: 3px solid #4caf50;
          border-radius: 12px;
          padding: 30px;
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .q8-boxes {
          display: flex;
          gap: 40px;
          justify-content: center;
        }

        @media (max-width: 480px) {
          .q8-wrapper {
            padding: 15px;
          }

          .q8-boxes {
            gap: 15px;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="q8-wrapper">
        <div className="q8-boxes">
          <div onClick={() => handleSelect("13")} style={boxStyle(selected === "13")}>
            13
          </div>
          <div onClick={() => handleSelect("30")} style={boxStyle(selected === "30")}>
            30
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question8;