import React, { useState } from "react";

interface Question19Props {
  onAnswer: (answer: number) => void;
}

const Question19: React.FC<Question19Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    setAnswer(val);
    if (val !== "") onAnswer(val as number);
  };

  return (
    <div>
      <style>{`
        .q19-wrapper {
          text-align: center;
          border-radius: 15px;
          padding: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        .q19-coins {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .q19-coin {
          width: 100px;
          height: 100px;
        }

        @media (max-width: 480px) {
          .q19-coins {
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
          }
        }
      `}</style>

      <div className="q19-wrapper">
        <div className="q19-coins">
          <img src="five_rupees.svg" alt="five rupees" className="q19-coin" />
          <img src="five_rupees.svg" alt="five rupees" className="q19-coin" />
          <img src="two_rupees.svg"  alt="two rupees"  className="q19-coin" />
          <img src="rupee.svg"       alt="one rupee"   className="q19-coin" />
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

export default Question19;