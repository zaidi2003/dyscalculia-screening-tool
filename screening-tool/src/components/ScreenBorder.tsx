import React from "react";

interface ScreenBorderProps {
  question: string;          // ✅ new prop
  children: React.ReactNode;
}

const ScreenBorder: React.FC<ScreenBorderProps> = ({ question, children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: "8px solid #4caf50",
        boxSizing: "border-box",
        backgroundColor: "#fefaf2",
        overflow: "hidden",
      }}
    >
      {/* Full-width rectangle for question */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#c8e6c9",
          textAlign: "left",
          padding: "20px 40px",
          fontWeight: "bold",
          fontSize: "1.8rem",
          fontFamily: "'Comic Neue', sans-serif",
          color: "#000000ff",
        }}
      >
        {question}
      </div>

      {/* Main content */}
      <div style={{ textAlign: "center", marginTop: "80px" }}>{children}</div>
    </div>
  );
};

export default ScreenBorder;
