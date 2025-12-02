// src/questionsData.tsx
import React from "react";

import Question1 from "./components/questions2/Question1";
import Question2 from "./components/questions2/Question2";
import Question3 from "./components/questions2/Question3";
// import Question4 from "./components/questions2/Question4";
import Question5 from "./components/questions2/Question5";
// import Question6 from "./components/questions2/Question6";
import Question7 from "./components/questions2/Question7";
import Question8 from "./components/questions2/Question8";
// import Question9 from "./components/questions2/Question9";
// import Question10 from "./components/questions2/Question10";
import Question11 from "./components/questions2/Question11";
// import Question12 from "./components/questions2/Question12";
import Question13 from "./components/questions2/Question13";
// import Question14 from "./components/questions2/Question14";
// import Question15 from "./components/questions2/Question15";
// import Question16 from "./components/questions2/Question16";
import Question17 from "./components/questions2/Question17";
// import Question18 from "./components/questions2/Question18";
// import Question19 from "./components/questions2/Question19";
import Question20 from "./components/questions2/Question20";


export interface QuestionItem {
  id: number;
  title: React.ReactNode;
  component: React.ReactElement;
  borderColor?: string;
  headerColor?: string;
  backgroundColor?: string;
  correct_answer?: string | number;
  type?: string;
}

export const questionsData: QuestionItem[] = [
  {
    id: 1,
    title: (
      <>
        Can you select <u>five watermelons</u>?
      </>
    ),
    component: <Question1 onAnswer={() => {}} />,
    correct_answer: 5,
    type: "deviation",
  },
  {
    id: 2,
    title: (
      <>
       Select <u>two cars</u> from the options below.
      </>
    ),
    component: <Question2 onAnswer={() => {}} />,
    correct_answer: 2,
    type: "deviation",
  },
  {
    id: 3,
    title: (
      <>
        Select the correct number of <u>butterflies.</u> 
      </>
    ),
    component: <Question3 onAnswer={() => {}} />,
    correct_answer: 3,
    type: "binary",
  },
  {
    id: 4,
    title: (
      <>
        Select the box with the <u>greater quantity.</u> 
      </>
    ),
    component: <Question5 onAnswer={() => {}} />,
    correct_answer: "leaves",
    type: "binary",
  },
  {
    id: 5,
    title: (
      <>
        Match each group of cars to <u>the correct number.</u>
      </>
    ),
    component: <Question7 onAnswer={() => {}} />,
    correct_answer: "Correct",
    type: "binary",
  },
  {
    id: 6,
    title: (
      <>
        Mark the number <span style={{ color: "#e53935" }}>22</span> on the number line below:
      </>
    ),
    component: <Question8 onAnswer={() => {}} />,
    correct_answer: 22,
    type: "binary",
  },
  {
    id: 7,
    title: (
      <>
        Zara bought <span style={{ color: "#12a105ff" }}>2</span> cakes, Sana bought{" "}
        <span style={{ color: "#12a105ff" }}>2</span> cakes. <br />
        How many cakes do they have altogether?
      </>
    ),
    component: <Question11 onAnswer={() => {}} />,
    correct_answer: 4,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    type: "deviation",
  },
  {
    id: 8,
    title: (
      <>
        What fraction of the pizza is{" "}
        <span style={{ textDecoration: "underline" }}>remaining</span>?
      </>
    ),
    component: <Question13 onAnswer={() => {}} />,
    correct_answer: "7/8",
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    type: "binary",
  },
  {
    id: 9,
    title: (
      <>
        <strong> What is the <u>total</u> amount of money?</strong>
      </>
    ),

    component: <Question17 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 28,
    type: "deviation",

  },
  
 
  {
    id: 10,
    title: (
      <>
        Select the clock that has the time <u> 1 o'clock.</u> 
      </>
    ),
    component: <Question20 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: "1",
    type: "binary",

  }


];
