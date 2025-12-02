import React, { useState } from "react";

interface Question17Props {
  onAnswer: (answer: number) => void; // ✅ number instead of string
}

const Question17: React.FC<Question17Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">(""); // ✅ allows empty string before input

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value); // ✅ convert to number
    setAnswer(val);
    if (val !== "") onAnswer(val as number); // ✅ only call when not empty
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
          src="/note_20.png"
          alt="twenty rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/five_rupees.svg"
          alt="five rupees"
          style={{ width: "120px", height: "120px" }}
        />
        <img
          src="/two_rupees.svg"
          alt="two rupees"
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
            backgroundColor: "#fff8e1",
            color: "#333",
          }}
        />
      </div>
    </div>
  );
};

export default Question17;
