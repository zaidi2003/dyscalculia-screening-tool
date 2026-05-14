import React, { useState, useEffect, useRef } from "react";

type Balloon = {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  popped: boolean;
};

const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF922B", "#CC5DE8"];

let nextId = 0;

const BalloonPopGame: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animRef = useRef<number | null>(null);

  const spawnBalloon = () => {
    const newBalloon: Balloon = {
      id: nextId++,
      x: Math.random() * 80 + 5,   // 5–85% across
      y: 110,                        // start below visible area
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 0.3 + 0.2,
      size: Math.random() * 20 + 35,
      popped: false,
    };
    setBalloons((prev) => [...prev, newBalloon]);
  };

  useEffect(() => {
    intervalRef.current = setInterval(spawnBalloon, 1200);

    const tick = () => {
      setBalloons((prev) =>
        prev
          .filter((b) => !b.popped && b.y > -20)
          .map((b) => ({ ...b, y: b.y - b.speed }))
      );
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const popBalloon = (id: number) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setScore((s) => s + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "8px" }}>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "4px" }}>
        Pop the balloons while you wait! 🎈
      </p>
      <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 8px" }}>
        Score: {score}
      </p>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "260px",
          overflow: "hidden",
          borderRadius: "12px",
          background: "#f0f8ff",
          border: "2px solid #dce8f5",
        }}
      >
        {balloons.map((b) =>
          b.popped ? null : (
            <div
              key={b.id}
              onClick={() => popBalloon(b.id)}
              style={{
                position: "absolute",
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size * 1.2}px`,
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                backgroundColor: b.color,
                cursor: "pointer",
                transform: "translateX(-50%)",
                userSelect: "none",
                boxShadow: "inset -4px -4px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.05s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1)")}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BalloonPopGame;