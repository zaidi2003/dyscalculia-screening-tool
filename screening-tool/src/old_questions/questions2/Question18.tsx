import React, { useState } from "react";

interface Question18Props {
  onAnswer: (answer: number) => void; // ✅ now expects a number
}

const Question18: React.FC<Question18Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">(""); // ✅ supports empty input and number

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    setAnswer(val);
    if (val !== "") onAnswer(val as number); // ✅ only send number when not empty
  };

  return (
    <div
      style={{
        textAlign: "center",
        borderRadius: "15px",
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Coins row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <img
          src="/note_100.png"
          alt="hundred rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/note_50.png"
          alt="fifty rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/note_20.png"
          alt="twenty rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/note_10.png"
          alt="ten rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/rupee.svg"
          alt="one rupee"
          style={{ width: "120px", height: "120px" }}
        />
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
          }}
        />
      </div>
    </div>
  );
};

export default Question18;
