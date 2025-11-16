import React, { useState } from "react";

interface Question2Props {
  onAnswer: (answer: number) => void;
}

const Question2: React.FC<Question2Props> = ({ onAnswer }) => {
  const [selected, setSelected] = useState<string[]>([]);
  
  // Car positions relative to the road SVG
  const cars = [
    { 
      id: "Car 1", 
      position: { x: 500, y: 400 },
      image: "/red_car.svg"
    },
    { 
      id: "Car 2", 
      position: { x: 1000, y: 50 }, 
      image: "/blue_car.svg"
    },
    { 
      id: "Car 3", 
      position: { x: 1500, y: 300 },
      image: "/green_car1.svg"
    },
  ];

  const toggleCar = (carId: string) => {
    const newSelected = selected.includes(carId)
      ? selected.filter((b) => b !== carId)
      : [...selected, carId];
    setSelected(newSelected);
    onAnswer(newSelected.length);
  };

  return (
    <div style={{ 
      position: "relative", 
      width: "100%", 
      height: "100vh", 
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {/* Road SVG Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1997px",
          height: "auto",
          aspectRatio: "1997 / 695",
        }}
      >
        {/* Road SVG */}
        <img 
          src="/question2/road.svg" 
          alt="Road"
          style={{
            width: "100%",
            height: "100%",
            display: "block"
          }}
        />

        {/* Cars positioned within the SVG coordinate system */}
        {cars.map((car) => (
          <div
            key={car.id}
            onClick={() => toggleCar(car.id)}
            style={{
              position: "absolute",
              left: `calc(${(car.position.x / 1997) * 100}% - 60px)`,
              top: `calc(${(car.position.y / 695) * 100}% - 30px)`,
              cursor: "pointer",
              transition: "transform 0.3s ease, filter 0.3s ease",
              transform: selected.includes(car.id) ? "scale(1.2)" : "scale(1)",
              zIndex: 10,
            }}
          >
            <img
              src={car.image}
              alt={car.id}
              style={{
                width: "120px",
                height: "60px",
                transition: "all 0.3s ease",
                filter: selected.includes(car.id)
                  ? "drop-shadow(0 0 15px rgba(76, 175, 80, 0.9)) drop-shadow(0 0 30px rgba(76, 175, 80, 0.6))"
                  : "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
              }}
            />
          </div>
        ))}
      </div>

      {/* Selection counter */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "10px 20px",
          borderRadius: "10px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          zIndex: 20,
        }}
      >
        Selected: {selected.length}
      </div>
    </div>
  );
};

export default Question2;