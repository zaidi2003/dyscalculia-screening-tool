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
import Question21 from "./components/questions/Question21";
import Question22 from "./components/questions/Question22";
import Question23 from "./components/questions/Question23";
import Question24 from "./components/questions/Question24";
import RatingEnjoyment from "./components/RatingEnjoyment";
import RatingFeeling from "./components/RatingFeeling";


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
        Can you select <u>five apples</u>?
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
        Select the correct number of <u>fruits.</u> 
      </>
    ),
    component: <Question4 onAnswer={() => {}} />,
    correct_answer: 4,
    type: "binary",
  },
  {
    id: 5,
    title: (
      <>
        Select the box with the <u>greater quantity.</u> 
      </>
    ),
    component: <Question5 onAnswer={() => {}} />,
    correct_answer: "2",
    type: "binary",
  },
  {
    id: 6,
    title: (
      <>
        Select the box with the <u>lesser quantity.</u> 
      </>
    ),
    component: <Question6 onAnswer={() => {}} />,
    correct_answer: "1",
    type: "binary",
  },
  {
    id: 7,
    title: (
      <>
        Select the number <u> fifty-four. </u> 
      </>
    ),
    component: <Question7 onAnswer={() => {}} />,
    correct_answer: "54",
    type: "binary",
  },
  {
    id: 8,
    title: (
      <>
        Select the number <u> thirteen. </u> 
      </>
    ),
    component: <Question8 onAnswer={() => {}} />,
    correct_answer: "13",
    type: "binary",
  },
  {
    id: 9,
    title: (
      <>
        Select the number <u> sixty. </u> 
      </>
    ),
    component: <Question9 onAnswer={() => {}} />,
    correct_answer: "60",
    type: "binary",
  },
  {
    id: 10,
    title: (
      <>
        Select the box with the <u> lesser quantity.</u> 
      </>
    ),
    component: <Question10 onAnswer={() => {}} />,
    correct_answer: "15",
    type: "binary",
  },
  {
    id: 11,
    title: (
      <>
        Select the box with the <u> greater quantity.</u> 
      </>
    ),
    component: <Question11 onAnswer={() => {}} />,
    correct_answer: "101",
    type: "binary",
  },


// changed the placement
  
  {
    id: 12,
    title: (
      <>
        Mark the number <span style={{ color: "#e53935" }}>28</span> on the number line below:
      </>
    ),
    component: <Question12 onAnswer={() => {}} />,
    correct_answer: 28,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    type: "deviation",
  },
  {
    id: 13,
    title: (
      <>
        Mark the number <span style={{ color: "#e53935" }}>70</span> on the number line below:
      </>
    ),
    component: <Question13 onAnswer={() => {}} />,
    correct_answer: 70,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    type: "deviation",
  },
  {
    id: 14,
    title: (
      <>
        Ali bought <span style={{ color: "#12a105ff" }}>4</span> cakes, Fatima bought{" "}
        <span style={{ color: "#12a105ff" }}>2</span> cakes. <br />
        How many cakes do they have altogether?
      </>
    ),
    component: <Question14 onAnswer={() => {}} />,
    correct_answer: 6,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    type: "deviation",
  },
  {
    id: 15,
    title: (
      <>
        Zainab has <span style={{ color: "#12a105ff" }}>4</span> cakes, Abbas has{" "}
        <span style={{ color: "#12a105ff" }}>2</span> cakes. <br />
        How many more cakes does Zainab have than Abbas?
      </>
    ),
    component: <Question15 onAnswer={() => {}} />,
    correct_answer: 2,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    type: "deviation",
  },
  {
    id: 16,
    title: (
      <>
        What fraction of the pizza has been{" "}
        <span style={{ textDecoration: "underline" }}>eaten</span>?
      </>
    ),
    component: <Question16 onAnswer={() => {}} />,
    correct_answer: "1/8",
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    type: "binary",
  },
  {
    id: 17,
    title: (
      <>
        What fraction of the watermelon <u> has been eaten?</u> 
      </>
    ),
    component: <Question17 onAnswer={() => {}} />,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    correct_answer: "2/5",
    type: "binary",
  },
  {
    id: 18,
    title: (
      <>
        What fraction of the water is  <u>in the cup?</u> 
      </>
    ),
    component: <Question18 onAnswer={() => {}} />,
    borderColor: "#F4900C",
    headerColor: "#FFB95C", 
    correct_answer: "1/2",
    type: "binary",
  },


  {
    id: 19,
    title: (
      <>
        <strong> What is the <u>total</u> amount of money?</strong>
      </>
    ),
    component: <Question19 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 13,
    type: "deviation",
  },
  {
    id: 20,
    title: (
      <>
        <strong> What is the <u>total</u> amount of money?</strong>
      </>
    ),

    component: <Question20 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 28,
    type: "deviation",

  },
  {
    id: 21,
    title: (
      <>
        <strong> What is the <u>total</u> amount of money?</strong>
      </>
    ),

    component: <Question21 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: 181,
    type: "deviation",
  },
  {
    id: 22,
    title: (
      <>
        Select the clock that has the time <u> 2 o'clock.</u> 
      </>
    ),
    component: <Question22 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: "2",
    type: "binary",

  },
  {
    id: 23,
    title: (
      <>
        Select the clock that has the time <u> 9 o'clock.</u> 
      </>
    ),
    component: <Question23 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: "9",
    type: "binary",

  },
  {
    id: 24,
    title: (
      <>
        Match each group of cars to <u>the correct number.</u>
      </>
    ),
    component: <Question24 onAnswer={() => {}} />,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    correct_answer: "Correct",
    type: "binary",
  },



  // rating the experience questions
  {
    id: 25,
    title: (
      <>
        <strong> How much did you enjoy the activity?</strong>
      </>
    ),
    component: <RatingEnjoyment onAnswer={() => {}}/>,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    type: "deviation"
  },
  {
    id: 26,
    title: (
      <>
        <strong> How are you feeling after completing the activity? </strong>
      </>
    ),
    component: <RatingFeeling onAnswer={() => {}}/>,
    borderColor: "#1C3046",
    headerColor: "#BBDFFF",
    type: "deviation"
  },
];
