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
        {/* Left box (cat) */}
        <div
          onClick={() => handleSelect("cat")}
          style={{
            backgroundColor: selected === "cat" ? "#c8f7c5" : "#fff",
            border: selected === "cat" ? "4px solid #4caf50" : "3px solid #ddd",
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
            src="/cat.svg"
            alt="fishes"
            style={{ width: "100px", height: "100px" }}
          />
        </div>

        {/* Right box (fish) */}
        <div
          onClick={() => handleSelect("fishes")}
          style={{
            backgroundColor: selected === "fishes" ? "#c8f7c5" : "#fff",
            border:
              selected === "fishes" ? "4px solid #4caf50" : "3px solid #ddd",
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
            src="/fishes.svg"
            alt="fish"
            style={{ width: "160px", height: "160px" }}
          />
        </div>

        

        
      </div>
    </div>
  );
};

export default Question5;
