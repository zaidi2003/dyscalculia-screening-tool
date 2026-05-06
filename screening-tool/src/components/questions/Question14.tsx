import React, { useState } from "react";

interface Question14Props {
  onAnswer: (answer: number) => void;
}

const Question14: React.FC<Question14Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    setAnswer(val);
    if (val !== "") onAnswer(val as number);
  };

  return (
    <div>
      <style>{`
        .q14-wrapper {
          text-align: center;
          border-radius: 15px;
          padding: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        .q14-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 80px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .q14-grid {
          display: grid;
          grid-template-columns: repeat(2, 80px);
          gap: 40px;
        }

        .q14-cake {
          width: 100px;
          height: 100px;
        }

        .q14-plus {
          font-size: 70px;
          font-weight: bold;
          color: #0044cc;
        }

        .q14-pair {
          display: flex;
          gap: 40px;
        }

        @media (max-width: 480px) {
  .q14-row {
    gap: 10px;
    flex-direction: column;  /* ← stack vertically */
    align-items: center;
  }

  .q14-grid {
    grid-template-columns: repeat(2, 65px);
    gap: 15px;
  }

  .q14-cake {
    width: 65px;
    height: 65px;
  }

  .q14-plus {
    font-size: 40px;
  }

  .q14-pair {
    gap: 15px;
  }
}
        }
      `}</style>

      <div className="q14-wrapper">
        <div className="q14-row">
          {/* Ali's 4 cakes */}
          <div className="q14-grid">
            {[...Array(4)].map((_, i) => (
              <img key={i} src="cake.svg" alt="cake" className="q14-cake" />
            ))}
          </div>

          {/* Plus sign */}
          <div className="q14-plus">+</div>

          {/* Fatima's 2 cakes */}
          <div className="q14-pair">
            {[...Array(2)].map((_, i) => (
              <img key={i} src="cake2.svg" alt="cake2" className="q14-cake" />
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
            min={0}
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

export default Question14;