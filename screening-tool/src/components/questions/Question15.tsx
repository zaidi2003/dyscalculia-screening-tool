import React, { useState } from "react";

interface Question15Props {
  onAnswer: (answer: number) => void; // ✅ now number
}

const Question15: React.FC<Question15Props> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value); // ✅ convert to number
    setAnswer(val);
    if (val !== "") onAnswer(val as number); // only send number, not empty string
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
      {/* Cakes and minus sign */}
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
          {[...Array(4)].map((_, i) => (
            <img
              key={i}
              src="cake.svg"
              alt="cake"
              style={{ width: "100px", height: "100px" }}
            />
          ))}
        </div>

        {/* Minus sign */}
        <div style={{ fontSize: "70px", fontWeight: "bold", color: "#0044cc" }}>-</div>

        {/* Fatima’s 2 cakes */}
        <div style={{ display: "flex", gap: "40px" }}>
          {[...Array(2)].map((_, i) => (
            <img
              key={i}
              src="cake2.svg"
              alt="cake2"
              style={{ width: "100px", height: "100px" }}
            />
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
            backgroundColor: "#fff", // white background
    color: "#000",           // black text
          }}
        />
      </div>
    </div>
  );
};

export default Question15;
