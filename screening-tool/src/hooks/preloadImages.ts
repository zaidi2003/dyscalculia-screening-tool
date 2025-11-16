import { useEffect } from "react";

// List all images (including SVGs, PNGs, etc.)
const imagePaths: string[] = [
  "/images/apple.svg",
  "/images/blue_car.svg",
  "/images/butterflies.svg",
  "/images/cake.svg",
  "/images/cake2.svg",
  "/images/cat.svg",
  "/images/clock1.png",
  "/images/clock2.png",
  "/images/clock3.png",
  "/images/clock6.png",
  "/images/clock7.png",
  "/images/clock8.png",
  "/images/clock9.png",
  "/images/clock10.png",
  "/images/five_rupees.svg",
  "/images/fruits.svg",
  "/images/fishes.svg",
  "/images/green_car.svg",
  "/images/green_car1.svg",
  "/images/leaf.svg",
  "/images/math.svg",
  "/images/math1.svg",
  "/images/note_10.png",
  "/images/note_20.png",
  "/images/note_50.png",
  "/images/note_100.png",
  "/images/pizza.png",
  "/images/pizza.svg",
  "/images/puzzle.svg",
  "/images/red_car.svg",
  "/images/red_truck.svg",
  "/images/road.svg",
  "/images/rupee.svg",
  "/images/shell1.svg",
  "/images/shell2.svg",
  "/images/shell3.svg",
  "/images/shell4.svg",
  "/images/shell5.svg",
  "/images/shells.svg",
  "/images/two_rupees.svg",
  "/images/vite.svg",
  "/images/water.png",
  "/images/water.svg",
  "/images/watermelon.svg",
  "/images/yellow_car.svg",
  "/images/yellow_taxi.svg",
  "/images/next.svg",
];

export const usePreloadImages = () => {
  useEffect(() => {
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src; // preloads into browser cache
    });
  }, []);
};
