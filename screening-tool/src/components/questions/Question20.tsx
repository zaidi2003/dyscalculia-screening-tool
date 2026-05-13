import React, { useState } from "react";

interface Question20Props {
  onAnswer: (answer: number) => void;
}

const Question20: React.FC<Question20Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    setAnswer(val);
    if (val !== "") onAnswer(val as number);
  };

  return (
    <div>
      <style>{`
        .q20-wrapper {
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

        .q20-coins {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .q20-coin {
          width: 100px;
          height: 100px;
        }

        .q20-note {
          height: 100px;
          width: auto;
        }

        @media (max-width: 480px) {
          .q20-coins {
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
          }
        }
      `}</style>

      <div className="q20-wrapper">
        <div className="q20-coins">
          <img src="note_20.png"    alt="twenty rupees" className="q20-note" />
          <img src="five_rupees.svg" alt="five rupees"  className="q20-coin" />
          <img src="two_rupees.svg"  alt="two rupees"   className="q20-coin" />
          <img src="rupee.svg"       alt="one rupee"    className="q20-coin" />
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

export default Question20;