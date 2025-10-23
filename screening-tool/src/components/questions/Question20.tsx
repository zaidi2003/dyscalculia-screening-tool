import React, { useState } from "react";

interface Question20Props {
  onAnswer: (answer: string) => void;
}

const Question20: React.FC<Question20Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  const boxes = [
    { id: 1, choice: "3", img: "/clock_faces/clock3.svg", alt: "3" },
    { id: 2, choice: "7", img: "/clock_faces/clock7.svg", alt: "7" },
    { id: 3, choice: "1", img: "/clock_faces/clock1.svg", alt: "1" },
    { id: 4, choice: "9", img: "/clock_faces/clock9.svg", alt: "9" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f4",
        border: "3px solid #1C3046",
        borderRadius: "12px",
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
          gap: "40px",
          justifyContent: "center",
        }}
      >
        {boxes.map((box) => (
          <div
            key={box.id}
            onClick={() => handleSelect(box.choice)}
            style={{
              backgroundColor:
                selected === box.choice ? "#BBDFFF" : "#fff",
              border: "4px solid",
              borderColor:
                selected === box.choice ? "#1C3046" : "#ddd",
              borderRadius: "15px",
              width: "200px",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background-color 0.2s",
            }}
          >
            <img
              src={box.img}
              alt={box.alt}
              style={{ width: "120px", height: "120px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question20;
