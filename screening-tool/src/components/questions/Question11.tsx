import React, { useState } from "react";

interface Question11Props {
  onAnswer: (answer: string) => void;
}

const Question11: React.FC<Question11Props> = ({ onAnswer }) => {
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
        .q11-wrapper {
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

        .q11-boxes {
          display: flex;
          gap: 40px;
          justify-content: center;
        }

        @media (max-width: 480px) {
          .q11-wrapper {
            padding: 15px;
          }

          .q11-boxes {
            gap: 15px;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="q11-wrapper">
        <div className="q11-boxes">
          <div onClick={() => handleSelect("11")} style={boxStyle(selected === "11")}>
            11
          </div>
          <div onClick={() => handleSelect("101")} style={boxStyle(selected === "101")}>
            101
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question11;