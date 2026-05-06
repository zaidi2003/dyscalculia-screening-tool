import React, { useState } from "react";

interface Question18Props {
  onAnswer: (answer: string) => void;
}

const Question18: React.FC<Question18Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const options = ["1/2", "1/3", "2/3", "1/4"];

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onAnswer(opt);
  };

  return (
    <div>
      <style>{`
        .q18-wrapper {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
        }

        .q18-image {
          width: 400px;
          height: 400px;
          object-fit: contain;
        }

        .q18-grid {
          flex: 1 1 200px;
          display: grid;
          grid-template-columns: repeat(2, 120px);
          gap: 25px;
          justify-content: center;
        }

        .q18-option {
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
          .q18-wrapper {
            padding-top: 20px;
          }

          .q18-image {
            width: 220px;
            height: 220px;
          }

          .q18-grid {
            grid-template-columns: repeat(2, 100px);
            gap: 15px;
          }

          .q18-option {
            padding: 22px 0;
            font-size: 26px;
          }
        }
      `}</style>

      <div className="q18-wrapper">
        {/* Left Side Image */}
        <div style={{ flex: "1 1 200px", textAlign: "center" }}>
          <img src="water.png" alt="water" className="q18-image" />
        </div>

        {/* Right Side Options */}
        <div className="q18-grid">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="q18-option"
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

export default Question18;