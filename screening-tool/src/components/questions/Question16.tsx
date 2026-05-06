import React, { useState } from "react";

interface Question16Props {
  onAnswer: (answer: string) => void;
}

const Question16: React.FC<Question16Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const options = ["1/8", "1/6", "7/8", "2/8"];

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onAnswer(opt);
  };

  return (
    <div>
      <style>{`
        .q16-wrapper {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
        }

        .q16-image {
          width: 400px;
          height: 400px;
          object-fit: contain;
        }

        .q16-grid {
          flex: 1 1 200px;
          display: grid;
          grid-template-columns: repeat(2, 120px);
          gap: 25px;
          justify-content: center;
        }

        .q16-option {
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
          .q16-wrapper {
            padding-top: 20px;
          }

          .q16-image {
            width: 220px;
            height: 220px;
          }

          .q16-grid {
            grid-template-columns: repeat(2, 100px);
            gap: 15px;
          }

          .q16-option {
            padding: 22px 0;
            font-size: 26px;
          }
        }
      `}</style>

      <div className="q16-wrapper">
        {/* Left Side Image */}
        <div style={{ flex: "1 1 200px", textAlign: "center" }}>
          <img src="pizza.png" alt="pizza" className="q16-image" />
        </div>

        {/* Right Side Options */}
        <div className="q16-grid">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="q16-option"
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

export default Question16;