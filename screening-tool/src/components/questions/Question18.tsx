import React, { useState } from "react";

interface Question18Props {
  onAnswer: (answer: string) => void;
}

const Question18: React.FC<Question18Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAnswer(val);
    onAnswer(val);
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
          flexWrap: "wrap", // still wraps if very small screen
          marginBottom: "30px",
        }}
      >
        <img
          src="/currency_notes/note_100.png"
          alt="hundred rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/currency_notes/note_50.png"
          alt="ten rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/currency_notes/note_20.png"
          alt="ten rupees"
          style={{ height: "120px", width: "auto" }}
        />
        <img
          src="/currency_notes/note_10.png"
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
