import React, { useState, useEffect } from "react";

interface Question24Props {
  onAnswer?: (ans: string) => void;
}

const Question24: React.FC<Question24Props> = ({ onAnswer }) => {
  const groups = [
    { count: 5, img: "red_truck.svg" },
    { count: 4, img: "yellow_taxi.svg" },
    { count: 3, img: "green_car.svg" },
  ];

  const numbers = [3, 4, 5];

  const [droppedItems, setDroppedItems] = useState<Record<number, number>>({});
  const [availableNumbers, setAvailableNumbers] = useState(numbers);
  const [selectedNum, setSelectedNum] = useState<number | null>(null); // mobile only

  // const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

  // ── PC: drag handlers (unchanged) ──────────────────────────────────────────
  const handleDragStart = (e: React.DragEvent, num: number, source: string) => {
    e.dataTransfer.setData("type", "number");
    e.dataTransfer.setData("value", num.toString());
    e.dataTransfer.setData("source", source);
  };

  const handleDrop = (e: React.DragEvent, groupCount: number) => {
    e.preventDefault();
    const value = Number(e.dataTransfer.getData("value"));
    const source = e.dataTransfer.getData("source");
    if (isNaN(value)) return;
    placeNumber(value, groupCount, source === "side");
  };

  const handleReturnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const value = Number(e.dataTransfer.getData("value"));
    const source = e.dataTransfer.getData("source");
    if (source !== "box" || isNaN(value)) return;
    returnNumber(value);
  };

  // ── Shared logic ───────────────────────────────────────────────────────────
  const placeNumber = (value: number, groupCount: number, fromSide: boolean) => {
    setDroppedItems((prevDropped) => {
      const currentAssignments = { ...prevDropped };

      for (const [key, val] of Object.entries(currentAssignments)) {
        if (val === value) delete currentAssignments[Number(key)];
      }

      const prevValue = currentAssignments[groupCount];
      currentAssignments[groupCount] = value;

      setAvailableNumbers((prevNums) => {
        let updated = [...prevNums];
        if (fromSide) updated = updated.filter((n) => n !== value);
        if (prevValue !== undefined && prevValue !== value)
          updated.push(prevValue);
        return Array.from(new Set(updated)).sort((a, b) => a - b);
      });

      return currentAssignments;
    });
  };

  const returnNumber = (value: number) => {
    setDroppedItems((prevDropped) => {
      const newDropped = { ...prevDropped };
      for (const [key, val] of Object.entries(newDropped)) {
        if (val === value) delete newDropped[Number(key)];
      }
      return newDropped;
    });
    setAvailableNumbers((prevNums) =>
      Array.from(new Set([...prevNums, value])).sort((a, b) => a - b)
    );
  };

  // ── Mobile: tap handlers ───────────────────────────────────────────────────
  const handleTapNumber = (num: number) => {
    setSelectedNum((prev) => (prev === num ? null : num));
  };

  const handleTapBox = (groupCount: number) => {
    if (selectedNum !== null) {
      // Place selected number into box
      placeNumber(selectedNum, groupCount, true);
      setSelectedNum(null);
    } else if (droppedItems[groupCount] !== undefined) {
      // Tap filled box → return number to list
      returnNumber(droppedItems[groupCount]);
    }
  };

  useEffect(() => {
    if (Object.keys(droppedItems).length === groups.length) {
      const allCorrect = groups.every(
        (group) => droppedItems[group.count] === group.count
      );
      onAnswer?.(allCorrect ? "Correct" : "Incorrect");
    }
  }, [droppedItems]);

  return (
    <div>
      <style>{`
        .q24-outer {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 60px;
          padding: 40px;
        }

        .q24-groups {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .q24-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .q24-cars {
          display: flex;
          gap: 10px;
          background-color: #fefaf2;
          border-radius: 10px;
          padding: 10px 20px;
        }

        .q24-car {
          width: 50px;
          height: 50px;
        }

        .q24-dropbox {
          width: 70px;
          height: 70px;
          border: 3px dashed #4caf50;
          border-radius: 10px;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          flex-shrink: 0;
        }

        .q24-placed {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #c8e6c9;
          border-radius: 8px;
          cursor: grab;
        }

        .q24-numlist {
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding: 10px;
          border: 3px dashed #bbb;
          border-radius: 12px;
          min-height: 300px;
          justify-content: center;
          align-items: center;
          background-color: #f9fff9;
        }

        .q24-numbox {
          width: 70px;
          height: 70px;
          border: 2px solid #4caf50;
          border-radius: 10px;
          background-color: #c8e6c9;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #000;
          cursor: grab;
          user-select: none;
        }

        .q24-hint {
          font-size: 0.85rem;
          color: #4caf50;
          font-style: italic;
          text-align: center;
          margin-bottom: 8px;
          width: 100%;
        }

        @media (max-width: 480px) {
          .q24-outer {
            flex-direction: column;
            align-items: center;
            gap: 24px;
            padding: 16px;
          }

          .q24-groups {
            gap: 16px;
            width: 100%;
          }

          .q24-row {
            gap: 10px;
            justify-content: space-between;
          }

          .q24-cars {
            gap: 6px;
            padding: 8px 10px;
            flex-wrap: wrap;
            max-width: 220px;
          }

          .q24-car {
            width: 36px;
            height: 36px;
          }

          .q24-numlist {
            flex-direction: row;
            flex-wrap: wrap;
            min-height: unset;
            width: 100%;
            gap: 12px;
            justify-content: center;
            padding: 12px;
          }
        }
      `}</style>

      <div className="q24-outer">
        {/* Left: car groups */}
        <div className="q24-groups">
          {groups.map((group) => (
            <div key={group.count} className="q24-row">
              {/* Cars */}
              <div className="q24-cars">
                {Array.from({ length: group.count }).map((_, i) => (
                  <img
                    key={i}
                    src={group.img}
                    alt="car"
                    draggable={false}
                    className="q24-car"
                  />
                ))}
              </div>

              {/* Drop / tap box */}
              <div
                className="q24-dropbox"
                onDrop={(e) => handleDrop(e, group.count)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => handleTapBox(group.count)}
                style={{
                  borderColor: selectedNum !== null ? "#ff9800" : "#4caf50",
                }}
              >
                {droppedItems[group.count] !== undefined && (
                  <div
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, droppedItems[group.count], "box")
                    }
                    className="q24-placed"
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
          className="q24-numlist"
          onDrop={handleReturnDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="q24-hint">
            {selectedNum !== null
              ? `Tap a box to place ${selectedNum}`
              : "Tap a number, then tap a box to place"}
          </div>
          {availableNumbers.map((num) => (
            <div
              key={num}
              draggable
              onDragStart={(e) => handleDragStart(e, num, "side")}
              onClick={() => handleTapNumber(num)}
              className="q24-numbox"
              style={{
                outline: selectedNum === num ? "3px solid #ff9800" : "none",
                backgroundColor: selectedNum === num ? "#ffe0b2" : "#c8e6c9",
              }}
            >
              {num}
            </div>
          ))}
          {availableNumbers.length === 0 && (
            <div style={{ fontSize: "1rem", color: "#666", fontStyle: "italic" }}>
              (Tap a box to return)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question24;