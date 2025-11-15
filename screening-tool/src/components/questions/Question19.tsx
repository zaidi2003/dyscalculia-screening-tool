import React, { useState } from "react";

interface Question19Props {
  onAnswer: (answer: string) => void;
}

const Question19: React.FC<Question19Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onAnswer(choice);
  };

  const boxes = [
    { id: 1, choice: "2", img: "/clock_faces/clock2.png", alt: "2" },
    { id: 2, choice: "10", img: "/clock_faces/clock10.png", alt: "10" },
    { id: 3, choice: "7", img: "/clock_faces/clock7.png", alt: "7" },
    { id: 4, choice: "8", img: "/clock_faces/clock8.png", alt: "8" },
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

export default Question19;
