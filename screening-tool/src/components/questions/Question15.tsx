import React, { useState } from "react";

interface Question15Props {
  onAnswer: (answer: number) => void;
}

const Question15: React.FC<Question15Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    setAnswer(val);
    if (val !== "") onAnswer(val as number);
  };

  return (
    <div>
      <style>{`
        .q15-wrapper {
          text-align: center;
          border-radius: 15px;
          padding: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        .q15-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 80px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .q15-grid {
          display: grid;
          grid-template-columns: repeat(2, 80px);
          gap: 40px;
        }

        .q15-cake {
          width: 100px;
          height: 100px;
        }

        .q15-minus {
          font-size: 70px;
          font-weight: bold;
          color: #0044cc;
        }

        .q15-pair {
          display: flex;
          gap: 40px;
        }

        @media (max-width: 480px) {
          .q15-row {
            gap: 10px;
            flex-direction: column;
            align-items: center;
          }

          .q15-grid {
            grid-template-columns: repeat(2, 65px);
            gap: 15px;
          }

          .q15-cake {
            width: 65px;
            height: 65px;
          }

          .q15-minus {
            font-size: 40px;
          }

          .q15-pair {
            gap: 15px;
          }
        }
      `}</style>

      <div className="q15-wrapper">
        <div className="q15-row">
          {/* Ali's 4 cakes */}
          <div className="q15-grid">
            {[...Array(4)].map((_, i) => (
              <img key={i} src="cake.svg" alt="cake" className="q15-cake" />
            ))}
          </div>

          {/* Minus sign */}
          <div className="q15-minus">-</div>

          {/* Fatima's 2 cakes */}
          <div className="q15-pair">
            {[...Array(2)].map((_, i) => (
              <img key={i} src="cake2.svg" alt="cake2" className="q15-cake" />
            ))}
          </div>
        </div>

        {/* Answer input */}
        <div style={{ fontSize: "20px", color: "#4a2f00" }}>
          <label htmlFor="answer">Answer:&nbsp;</label>
          <input
            id="answer"
            type="number"
            value={answer}
            onChange={handleChange}
            style={{
              width: "80px",
              fontSize: "18px",
              textAlign: "center",
              borderRadius: "8px",
              border: "2px solid #b77b33",
              padding: "5px",
              backgroundColor: "#fff",
              color: "#000",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Question15;