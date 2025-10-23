import React, { useState } from "react";

interface Question12Props {
  onAnswer: (answer: string) => void;
}

const Question12: React.FC<Question12Props> = ({ onAnswer }) => {
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
        //backgroundColor: "#fff8ec",
        //border: "4px solid #e0b66b",
        borderRadius: "15px",
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
    
      {/* Cakes and plus sign */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "80px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        {/* Ali's 4 cakes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 80px)",
            gap: "40px",
          }}
        >
          <img
            src="/cake.svg"
            alt="bag"
            style={{ width: "100px", height: "100px" }}
          />
          <img
            src="/cake.svg"
            alt="bag"
            style={{ width: "100px", height: "100px" }}
          />
          <img
            src="/cake.svg"
            alt="bag"
            style={{ width: "100px", height: "100px" }}
          />
          <img
            src="/cake.svg"
            alt="bag"
            style={{ width: "100px", height: "100px" }}
          />
          
        </div>

        {/* Minus sign */}
        <div style={{ fontSize: "70px", fontWeight: "bold", color: "#0044cc" }}>-</div>

        {/* Fatima’s 2 cakes */}
        <div style={{ display: "flex", gap: "40px" }}>
          <img
            src="/cake2.svg"
            alt="bug"
            style={{ width: "100px", height: "100px" }}
          />
          <img
            src="/cake2.svg"
            alt="bug"
            style={{ width: "100px", height: "100px" }}
          />
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
          }}
        />
      </div>
    </div>
  );
};

export default Question12;
