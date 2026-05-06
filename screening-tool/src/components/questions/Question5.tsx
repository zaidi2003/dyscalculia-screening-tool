import React, { useState } from "react";

interface Question5Props {
  onAnswer: (answer: string) => void;
}

const Question5: React.FC<Question5Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  return (
    <div>
      <style>{`
        .q5-wrapper {
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

        .q5-boxes {
          display: flex;
          gap: 40px;
          justify-content: center;
        }

        .q5-box {
          border-radius: 15px;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
        }

        .q5-img {
          width: 60px;
          height: 60px;
        }

        @media (max-width: 480px) {
          .q5-wrapper {
            padding: 15px;
          }

          .q5-boxes {
            gap: 15px;
            flex-direction: column;  /* ← stacks boxes vertically */
            align-items: center;
          }

          .q5-box {
            width: 200px;
            height: 200px;
          }

          .q5-img {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>

      <div className="q5-wrapper">
        <div className="q5-boxes">
          {/* Left box (shells) */}
          <div
            onClick={() => handleSelect("1")}
            className="q5-box"
            style={{
              backgroundColor: selected === "1" ? "#c8f7c5" : "#fff",
              border: selected === "1" ? "4px solid #4caf50" : "3px solid #ddd",
            }}
          >
            <img src="shell1.svg" alt="shell" className="q5-img" />
            <img src="shell2.svg" alt="shell" className="q5-img" />
            <img src="shell3.svg" alt="shell" className="q5-img" />
          </div>

          {/* Right box (leaves) */}
          <div
            onClick={() => handleSelect("2")}
            className="q5-box"
            style={{
              backgroundColor: selected === "2" ? "#c8f7c5" : "#fff",
              border: selected === "2" ? "4px solid #4caf50" : "3px solid #ddd",
              flexWrap: "wrap",
            }}
          >
            <img src="leaf.svg" alt="leaf" className="q5-img" />
            <img src="leaf.svg" alt="leaf" className="q5-img" />
            <img src="leaf.svg" alt="leaf" className="q5-img" />
            <img src="leaf.svg" alt="leaf" className="q5-img" />
            <img src="leaf.svg" alt="leaf" className="q5-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question5;