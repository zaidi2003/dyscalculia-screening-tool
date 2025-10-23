// src/questionsData.tsx
import React from "react";

import Question1 from "./components/questions/Question1";
import Question2 from "./components/questions/Question2";
import Question3 from "./components/questions/Question3";
import Question4 from "./components/questions/Question4";
import Question5 from "./components/questions/Question5";
import Question6 from "./components/questions/Question6";
import Question7 from "./components/questions/Question7";
import Question8 from "./components/questions/Question8";
import Question9 from "./components/questions/Question9";
import Question10 from "./components/questions/Question10";
import Question11 from "./components/questions/Question11";
import Question12 from "./components/questions/Question12";
import Question13 from "./components/questions/Question13";
import Question14 from "./components/questions/Question14";
import Question15 from "./components/questions/Question15";
import Question16 from "./components/questions/Question16";
import Question17 from "./components/questions/Question17";
import Question18 from "./components/questions/Question18";
import Question19 from "./components/questions/Question19";
import Question20 from "./components/questions/Question20";


export interface QuestionItem {
  id: number;
  title: React.ReactNode;
  component: React.ReactElement;
  borderColor?: string;
  headerColor?: string;
  backgroundColor?: string;
  correct_answer?: string | number;
}

export const questionsData: QuestionItem[] = [
  {
    id: 1,
    title: "Can you select five apples?",
    component: <Question1 onAnswer={() => {}} />,
    correct_answer: 5,
  },
  {
    id: 2,
    title: "Select two cars from the options below.",
    component: <Question2 onAnswer={() => {}} />,
    correct_answer: 2,
  },
  {
    id: 3,
    title: "Select the correct number of butterflies.",
    component: <Question3 onAnswer={() => {}} />,
    correct_answer: 3,
  },
  {
    id: 4,
    title: "Select the correct number of fruits.",
    component: <Question4 onAnswer={() => {}} />,
    correct_answer: 4,
  },
  {
    id: 5,
    title: "Select the box with the greater quantity.",
    component: <Question5 onAnswer={() => {}} />,
    correct_answer: "leaves",
  },
  {
    id: 6,
    title: "Select the box with the lesser quantity.",
    component: <Question6 onAnswer={() => {}} />,
    correct_answer: "cat",
  },
  
  {
    id: 7,
    title: "Match each group of cars to the correct number.",
    component: <Question7 onAnswer={() => {}} />,
    correct_answer: "Correct",
  },
  {
    id: 8,
    title: (
      <>
        Mark the number <span style={{ color: "#e53935" }}>27.5</span> on the number line below:
      </>
    ),
    component: <Question8 onAnswer={() => {}} />,
    correct_answer: 27.5,
  },
  {
    id: 9,
  
    title: (
      <>
        Select the number <u> fifty-four. </u> 
      </>
    ),
    component: <Question9 onAnswer={() => {}} />,
    correct_answer: 54,
  },
  {
    id: 10,
    title: (
      <>
        Select the box with the <u> greater quantity.</u> 
      </>
    ),
    component: <Question10 onAnswer={() => {}} />,
    correct_answer: 20,
  },
  {
    id: 11,
    title: (
      <>
        Ali bought <span style={{ color: "#12a105ff" }}>4</span> cakes, Fatima bought{" "}
        <span style={{ color: "#12a105ff" }}>2</span> cakes. <br />
        How many cakes do they have altogether?
      </>
    ),
    component: <Question11 onAnswer={() => {}} />,
    correct_answer: 6,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
  },
  {
    id: 12,
    title: (
      <>
        Ali bought <span style={{ color: "#12a105ff" }}>4</span> cakes, Fatima bought{" "}
        <span style={{ color: "#12a105ff" }}>2</span> cakes. <br />
        How many cakes do they have altogether?
      </>
    ),
    component: <Question12 onAnswer={() => {}} />,
    correct_answer: 2,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
  },
  {
    id: 13,
    title: (
      <>
        What fraction of the pizza has been{" "}
        <span style={{ textDecoration: "underline" }}>eaten</span>?
      </>
    ),
    component: <Question13 onAnswer={() => {}} />,
    correct_answer: "1/8",
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
  },
  {
    id: 14,
    title: (
      <>
        What fraction of the watermelon <u> remains?</u> 
      </>
    ),
    component: <Question14 onAnswer={() => {}} />,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    correct_answer: "5/5",
  },
  {
    id: 15,
    title: (
      <>
        What fraction of the water is  <u> left?</u> 
      </>
    ),
    component: <Question15 onAnswer={() => {}} />,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    correct_answer: "7/8",
  },
  {
    id: 16,
    title: (
      <>
        <strong> What is the <u>total</u> amount of money?</strong>
      </>
    ),
    component: <Question16 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 13,
  },
  {
    id: 17,
    title: (
      <>
        <strong> What is the <u>total</u> amount of money?</strong>
      </>
    ),

    component: <Question17 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 28,

  },
  {
    id: 18,
    title: (
      <>
        <strong> What is the <u>total</u> amount of money?</strong>
      </>
    ),

    component: <Question18 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 181,
  },
  {
    id: 19,
    title: (
      <>
        Select the clock that has the time <u> 2 o'clock.</u> 
      </>
    ),
    component: <Question19 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 2,

  },
  {
    id: 20,
    title: (
      <>
        Select the clock that has the time <u> 9 o'clock.</u> 
      </>
    ),
    component: <Question20 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 9,

  }


];
