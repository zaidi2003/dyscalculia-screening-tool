import React, { useState } from "react";

interface Question3Props {
  onAnswer: (answer: number) => void;
}

const Question3: React.FC<Question3Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [2, 3, 4, 5];

  const handleSelect = (opt: number) => {
    setSelected(opt);
    onAnswer(opt);
  };

  return (
    <div>
      <style>{`
        .q3-image {
          width: 400px;
          height: 400px;
          object-fit: contain;
        }

        .q3-grid {
          flex: 1 1 200px;
          display: grid;
          grid-template-columns: repeat(2, 120px);
          gap: 25px;
          justify-content: center;
        }

        .q3-option {
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
          .q3-image {
            width: 220px;
            height: 220px;
          }

          .q3-grid {
            grid-template-columns: repeat(2, 100px);
            gap: 15px;
          }

          .q3-option {
            padding: 22px 0;
            font-size: 26px;
          }
        }
      `}</style>

      {/* Wrapper — identical inline style to your original */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {/* Left Side Image */}
        <div style={{ flex: "1 1 200px", textAlign: "center" }}>
          <img
            src="butterflies.svg"
            alt="butterflies"
            className="q3-image"
          />
        </div>

        {/* Right Side Options */}
        <div className="q3-grid">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="q3-option"
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

export default Question3;