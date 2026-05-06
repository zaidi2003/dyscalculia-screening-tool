import React, { useState } from "react";

interface Question6Props {
  onAnswer: (answer: string) => void;
}

const Question6: React.FC<Question6Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  return (
    <div>
      <style>{`
        .q5b-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f4;
          border: 3px solid #b6e3b8;
          border-radius: 12px;
          padding: 30px;
          max-width: 700px;
          margin: 0 auto;
        }

        .q5b-boxes {
          display: flex;
          gap: 40px;
          justify-content: center;
        }

        .q5b-box {
          border-radius: 15px;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
        }

        @media (max-width: 480px) {
          .q5b-wrapper {
            padding: 15px;
          }

          .q5b-boxes {
            gap: 15px;
            flex-direction: column;
            align-items: center;
          }

          .q5b-box {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>

      <div className="q5b-wrapper">
        <div className="q5b-boxes">
          {/* Left box (cat) */}
          <div
            onClick={() => handleSelect("1")}
            className="q5b-box"
            style={{
              backgroundColor: selected === "1" ? "#c8f7c5" : "#fff",
              border: selected === "1" ? "4px solid #4caf50" : "3px solid #ddd",
            }}
          >
            <img src="cat.svg" alt="cat" style={{ width: "100px", height: "100px" }} />
          </div>

          {/* Right box (fish) */}
          <div
            onClick={() => handleSelect("2")}
            className="q5b-box"
            style={{
              backgroundColor: selected === "2" ? "#c8f7c5" : "#fff",
              border: selected === "2" ? "4px solid #4caf50" : "3px solid #ddd",
              flexWrap: "wrap",
            }}
          >
            <img src="fishes.svg" alt="fish" style={{ width: "160px", height: "160px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question6;