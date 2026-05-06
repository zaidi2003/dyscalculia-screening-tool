import React, { useState } from "react";

interface Question17Props {
  onAnswer: (answer: string) => void;
}

const Question17: React.FC<Question17Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const options = ["5/5", "4/5", "1/5", "2/5"];

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onAnswer(opt);
  };

  return (
    <div>
      <style>{`
        .q17-wrapper {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
        }

        .q17-image {
          width: 400px;
          height: 400px;
          object-fit: contain;
        }

        .q17-grid {
          flex: 1 1 200px;
          display: grid;
          grid-template-columns: repeat(2, 120px);
          gap: 25px;
          justify-content: center;
        }

        .q17-option {
          border: 3px solid #8bc34a;
          border-radius: 15px;
          padding: 30px 0;
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          transition: 0.3s;
        }

        @media (max-width: 480px) {
          .q17-wrapper {
            padding-top: 20px;
          }

          .q17-image {
            width: 220px;
            height: 220px;
          }

          .q17-grid {
            grid-template-columns: repeat(2, 100px);
            gap: 15px;
          }

          .q17-option {
            padding: 22px 0;
            font-size: 26px;
          }
        }
      `}</style>

      <div className="q17-wrapper">
        {/* Left Side Image */}
        <div style={{ flex: "1 1 200px", textAlign: "center" }}>
          <img src="watermelon.svg" alt="watermelon" className="q17-image" />
        </div>

        {/* Right Side Options */}
        <div className="q17-grid">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="q17-option"
              style={{
                backgroundColor: selected === opt ? "#4caf50" : "#fff8dc",
                boxShadow: selected === opt
                  ? "0 5px 15px rgba(76,175,80,0.5)"
                  : "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question17;