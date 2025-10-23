import React from "react";

interface ScreenBorderProps {
  question: React.ReactNode;          // ✅ Header content
  children: React.ReactNode;
  borderColor?: string;               // Optional border color
  headerColor?: string;               // Optional header background
  backgroundColor?: string;           // Optional background color
  scrollable?: boolean;               // ✅ New prop for scrollable mode
}

const ScreenBorder: React.FC<ScreenBorderProps> = ({
  question,
  children,
  borderColor = "#4caf50",
  headerColor = "#c8e6c9",
  backgroundColor = "#fefaf2",
  scrollable = false,                // ✅ Default = not scrollable
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: `8px solid ${borderColor}`,
        boxSizing: "border-box",
        backgroundColor: backgroundColor,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // prevents background scroll
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          backgroundColor: headerColor,
          textAlign: "left",
          padding: "20px 40px",
          fontWeight: "bold",
          fontSize: "1.8rem",
          fontFamily: "'Comic Neue', sans-serif",
          color: "#000000ff",
          flexShrink: 0,
        }}
      >
        {question}
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          overflowY: scrollable ? "auto" : "hidden", // ✅ scrollable toggle
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScreenBorder;
