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
  scrollable = false,
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
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          backgroundColor: headerColor,
          textAlign: "left",
          // clamp(min, preferred, max) — scales between screen sizes
          padding: "clamp(12px, 3vw, 20px) clamp(16px, 5vw, 40px)",
          fontWeight: "bold",
          fontSize: "clamp(1.1rem, 4vw, 1.8rem)",  // shrinks on narrow screens
          fontFamily: "'Comic Neue', sans-serif",
          color: "#000000ff",
          flexShrink: 0,
        }}
      >
        {question}
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          overflowY: scrollable ? "auto" : "hidden",
          padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 20px)",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScreenBorder;
