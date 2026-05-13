import React, { useState } from "react";

interface Question21Props {
  onAnswer: (answer: number) => void;
}

const Question21: React.FC<Question21Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    setAnswer(val);
    if (val !== "") onAnswer(val as number);
  };

  return (
    <div>
      <style>{`
        .q21-wrapper {
          text-align: center;
          border-radius: 15px;
          padding: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        /* REMOVE NUMBER ARROWS */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }

        .q21-coins {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .q21-coin {
          width: 100px;
          height: 100px;
        }

        .q21-note {
          height: 100px;
          width: auto;
        }

        @media (max-width: 480px) {
          .q21-coins {
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
          }
        }
      `}</style>

      <div className="q21-wrapper">
        <div className="q21-coins">
          <img src="note_100.png" alt="hundred rupees" className="q21-note" />
          <img src="note_50.png"  alt="fifty rupees"   className="q21-note" />
          <img src="note_20.png"  alt="twenty rupees"  className="q21-note" />
          <img src="note_10.png"  alt="ten rupees"     className="q21-note" />
          <img src="rupee.svg"    alt="one rupee"      className="q21-coin" />
        </div>

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
              border: "2px solid #1C3046",
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

export default Question21;