import React, { useState } from "react";

interface Question23Props {
  onAnswer: (answer: string) => void;
}

const Question23: React.FC<Question23Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  const boxes = [
    { id: 1, choice: "3", img: "clock3.png", alt: "3" },
    { id: 2, choice: "7", img: "clock7.png", alt: "7" },
    { id: 3, choice: "1", img: "clock1.png", alt: "1" },
    { id: 4, choice: "9", img: "clock9.png", alt: "9" },
  ];

  return (
    <div>
      <style>{`
        .q23-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f4;
          border: 3px solid #1C3046;
          border-radius: 12px;
          padding: 30px;
          max-width: 700px;
          margin: 0 auto;
        }

        .q23-grid {
          display: grid;
          grid-template-columns: repeat(2, 200px);
          gap: 40px;
          justify-content: center;
        }

        .q23-box {
          width: 200px;
          height: 200px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .q23-img {
          width: 120px;
          height: 120px;
        }

        @media (max-width: 480px) {
          .q23-wrapper {
            padding: 15px;
          }

          .q23-grid {
            grid-template-columns: repeat(2, 140px);
            gap: 15px;
          }

          .q23-box {
            width: 140px;
            height: 140px;
          }

          .q23-img {
            width: 90px;
            height: 90px;
          }
        }
      `}</style>

      <div className="q23-wrapper">
        <div className="q23-grid">
          {boxes.map((box) => (
            <div
              key={box.id}
              onClick={() => handleSelect(box.choice)}
              className="q23-box"
              style={{
                backgroundColor: selected === box.choice ? "#BBDFFF" : "#fff",
                border: `4px solid ${selected === box.choice ? "#1C3046" : "#ddd"}`,
              }}
            >
              <img src={box.img} alt={box.alt} className="q23-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question23;