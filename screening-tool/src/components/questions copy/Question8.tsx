import React, { useState } from "react";

interface Question8eProps {
  onAnswer: (answer: number) => void;
}

const Question8e: React.FC<Question8eProps> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);

  // Start and end values
  const start = 20;
  const end = 30;
  const count = 11; // 10 ticks, including start and end

  // Generate the numbers based on the range
  const step = (end - start) / (count - 1);
  const numbers = Array.from({ length: count }, (_, i) => start + i * step);

  const handleSelect = (num: number) => {
    setSelected(num);
    onAnswer(num);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff8ec",
        border: "4px solid #e0b66b",
        borderRadius: "15px",
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "160px",
          margin: "0 auto",
          width: "90%",
        }}
      >
        {/* Horizontal number line */}
        <div
          style={{
            position: "absolute",
            top: "50%", // middle of container
            left: "0",
            right: "0",
            height: "3px",
            backgroundColor: "#000",
          }}
        ></div>

        {/* Left Arrow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-10px",
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: "12px solid #000",
            transform: "translateY(-50%)",
          }}
        ></div>

        {/* Right Arrow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-10px",
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderLeft: "12px solid #000",
            transform: "translateY(-50%)",
          }}
        ></div>

        {/* Ticks and numbers */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          {numbers.map((num) => (
            <div
              key={num}
              style={{
                position: "relative",
                flex: 1,
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => handleSelect(num)} // Add click handler to the whole tick area
            >
              {/* Vertical tick line */}
              <div
                style={{
                  width: "2px",
                  height: "40px",
                  backgroundColor: "#000",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>

              {/* Circle marker (on top of line) */}
              {selected === num && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(50% - 25px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#4caf50",
                    border: "2px solid #2e7d32",
                  }}
                ></div>
              )}

              {/* Number label below line */}
              {(num === start || num === end || num === numbers[Math.floor(count / 2)]) && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(50% + 30px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {num}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question8e;
