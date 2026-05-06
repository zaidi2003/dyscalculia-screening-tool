import React, { useState } from "react";

interface Question22Props {
  onAnswer: (answer: string) => void;
}

const Question22: React.FC<Question22Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  const boxes = [
    { id: 1, choice: "2",  img: "clock2.png",  alt: "2"  },
    { id: 2, choice: "10", img: "clock10.png", alt: "10" },
    { id: 3, choice: "7",  img: "clock7.png",  alt: "7"  },
    { id: 4, choice: "8",  img: "clock8.png",  alt: "8"  },
  ];

  return (
    <div>
      <style>{`
        .q22-wrapper {
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

        .q22-grid {
          display: grid;
          grid-template-columns: repeat(2, 200px);
          gap: 40px;
          justify-content: center;
        }

        .q22-box {
          width: 200px;
          height: 200px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .q22-img {
          width: 120px;
          height: 120px;
        }

        @media (max-width: 480px) {
          .q22-wrapper {
            padding: 15px;
          }

          .q22-grid {
            grid-template-columns: repeat(2, 140px);
            gap: 15px;
          }

          .q22-box {
            width: 140px;
            height: 140px;
          }

          .q22-img {
            width: 90px;
            height: 90px;
          }
        }
      `}</style>

      <div className="q22-wrapper">
        <div className="q22-grid">
          {boxes.map((box) => (
            <div
              key={box.id}
              onClick={() => handleSelect(box.choice)}
              className="q22-box"
              style={{
                backgroundColor: selected === box.choice ? "#BBDFFF" : "#fff",
                border: `4px solid ${selected === box.choice ? "#1C3046" : "#ddd"}`,
              }}
            >
              <img src={box.img} alt={box.alt} className="q22-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question22;