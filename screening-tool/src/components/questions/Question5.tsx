import React, { useState } from "react";

interface Question5Props {
  onAnswer: (answer: string) => void;
}

const Question5: React.FC<Question5Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f4",
        border: "3px solid #b6e3b8",
        borderRadius: "12px",
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {/* <h2 style={{ marginBottom: "30px", color: "#2e5939" }}>
        Select the box with the <u>greater</u> quantity.
      </h2> */}

      <div
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "center",
        }}
      >
        {/* Left box (shells) */}
        <div
          onClick={() => handleSelect("shells")}
          style={{
            backgroundColor: selected === "shells" ? "#c8f7c5" : "#fff",
            border: selected === "shells" ? "4px solid #4caf50" : "3px solid #ddd",
            borderRadius: "15px",
            width: "200px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <img
            src="shell1.svg"
            alt="shell"
            style={{ width: "60px", height: "60px" }}
          />

          <img
            src="shell2.svg"
            alt="shell"
            style={{ width: "60px", height: "60px" }}
          />

          <img
            src="shell3.svg"
            alt="shell"
            style={{ width: "60px", height: "60px" }}
          />

          
          
        </div>

        {/* Right box (leaves) */}
        <div
          onClick={() => handleSelect("leaves")}
          style={{
            backgroundColor: selected === "leaves" ? "#c8f7c5" : "#fff",
            border:
              selected === "leaves" ? "4px solid #4caf50" : "3px solid #ddd",
            borderRadius: "15px",
            width: "200px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <img
            src="/leaf.svg"
            alt="leaf"
            style={{ width: "60px", height: "60px" }}
          />
          <img
            src="/leaf.svg"
            alt="leaf"
            style={{ width: "60px", height: "60px" }}
          />
          <img
            src="/leaf.svg"
            alt="leaf"
            style={{ width: "60px", height: "60px" }}
          />
          <img
            src="/leaf.svg"
            alt="leaf"
            style={{ width: "60px", height: "60px" }}
          />
          <img
            src="/leaf.svg"
            alt="leaf"
            style={{ width: "60px", height: "60px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Question5;
