import React, { useState, useEffect } from "react";

interface Question7Props {
  onAnswer?: (ans: string) => void;
}

const Question7: React.FC<Question7Props> = ({ onAnswer }) => {
  const groups = [
    { count: 5, img: "/red_truck.svg" },
    { count: 4, img: "/yellow_taxi.svg" },
    { count: 3, img: "/green_car.svg" },
  ];

  const numbers = [3, 4, 5];

  const [droppedItems, setDroppedItems] = useState<Record<number, number>>({});
  const [availableNumbers, setAvailableNumbers] = useState(numbers);

  const handleDragStart = (e: React.DragEvent, num: number, source: string) => {
    e.dataTransfer.setData("type", "number");
    e.dataTransfer.setData("value", num.toString());
    e.dataTransfer.setData("source", source); // "side" or "box"
  };

  const handleDrop = (e: React.DragEvent, groupCount: number) => {
    e.preventDefault();
    const value = Number(e.dataTransfer.getData("value"));
    const source = e.dataTransfer.getData("source");
    if (isNaN(value)) return;

    setDroppedItems((prevDropped) => {
      const currentAssignments = { ...prevDropped };

      // If number already placed somewhere else → remove it from that group
      for (const [key, val] of Object.entries(currentAssignments)) {
        if (val === value) delete currentAssignments[Number(key)];
      }

      // Get old number that was in this box (if any)
      const prevValue = currentAssignments[groupCount];

      // Assign new one
      currentAssignments[groupCount] = value;

      // Update available numbers cleanly
      setAvailableNumbers((prevNums) => {
        let updated = [...prevNums];
        // remove current number if it's new
        if (source === "side") updated = updated.filter((n) => n !== value);
        // add old number back if replaced
        if (prevValue !== undefined && prevValue !== value)
          updated.push(prevValue);
        return Array.from(new Set(updated)).sort((a, b) => a - b);
      });

      return currentAssignments;
    });
  };

  // Handle drag from box → drop back into right list
  const handleReturnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const value = Number(e.dataTransfer.getData("value"));
    const source = e.dataTransfer.getData("source");
    if (source !== "box" || isNaN(value)) return;

    setDroppedItems((prevDropped) => {
      const newDropped = { ...prevDropped };
      for (const [key, val] of Object.entries(newDropped)) {
        if (val === value) delete newDropped[Number(key)];
      }
      return newDropped;
    });

    setAvailableNumbers((prevNums) => {
      const updated = Array.from(new Set([...prevNums, value])).sort(
        (a, b) => a - b
      );
      return updated;
    });
  };

  // Notify parent only when all are placed
  useEffect(() => {
    if (Object.keys(droppedItems).length === groups.length) {
      const allCorrect = groups.every(
        (group) => droppedItems[group.count] === group.count
      );
      onAnswer?.(allCorrect ? "Correct" : "Incorrect");
    }
  }, [droppedItems]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "60px",
        padding: "40px",
      }}
    >
      {/* Left: car groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {groups.map((group) => (
          <div
            key={group.count}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Cars */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                backgroundColor: "#fefaf2",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              {Array.from({ length: group.count }).map((_, i) => (
                <img
                  key={i}
                  src={group.img}
                  alt="car"
                  draggable={false}
                  style={{ width: "50px", height: "50px" }}
                />
              ))}
            </div>

            {/* Drop box */}
            <div
              onDrop={(e) => handleDrop(e, group.count)}
              onDragOver={(e) => e.preventDefault()}
              style={{
                width: "70px",
                height: "70px",
                border: "3px dashed #4caf50",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#333",
                cursor: "pointer",
              }}
            >
              {droppedItems[group.count] && (
                <div
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, droppedItems[group.count], "box")
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#c8e6c9",
                    borderRadius: "8px",
                    cursor: "grab",
                  }}
                >
                  {droppedItems[group.count]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right: number list */}
      <div
        onDrop={handleReturnDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          padding: "10px",
          border: "3px dashed #bbb",
          borderRadius: "12px",
          minHeight: "300px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9fff9",
        }}
      >
        {availableNumbers.map((num) => (
          <div
            key={num}
            draggable
            onDragStart={(e) => handleDragStart(e, num, "side")}
            style={{
              width: "70px",
              height: "70px",
              border: "2px solid #4caf50",
              borderRadius: "10px",
              backgroundColor: "#c8e6c9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#000",
              cursor: "grab",
              userSelect: "none",
            }}
          >
            {num}
          </div>
        ))}
        {availableNumbers.length === 0 && (
          <div
            style={{
              fontSize: "1rem",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            (Drag numbers back here)
          </div>
        )}
      </div>
    </div>
  );
};

export default Question7;
