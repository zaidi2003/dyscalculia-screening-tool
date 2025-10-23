import React, { useState } from "react";
import ScreenBorder from "./components/ScreenBorder";
import { questionsData } from "./questions";

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [startTime, setStartTime] = useState(Date.now());
  const [timePerQuestion, setTimePerQuestion] = useState<{ [key: number]: number }>({});
  const [userInfo, setUserInfo] = useState({ name: "", age: "" });

  // ✅ Save answers for each question
  const handleAnswer = (id: number, ans: any) => {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  };


  const questions = questionsData.map((q) => ({
  ...q,
  component: React.cloneElement(q.component as any, {
    onAnswer: (ans: any) => handleAnswer(q.id, ans),
  }),
}));


  const goToNext = () => {
  const timeSpent = (Date.now() - startTime) / 1000;

  // Save time for the *current* question index
  setTimePerQuestion((prev) => ({
    ...prev,
    [currentIndex]: timeSpent,
  }));

  setStartTime(Date.now());
  setCurrentIndex((prev) => prev + 1);
};


  const goToPrev = () => setCurrentIndex((prev) => prev - 1);

  //  Start screen
  if (currentIndex === -1) {
    return (
      <ScreenBorder question="Dyscalculia Screening Tool">
        <div style={{ textAlign: "center", maxWidth: "400px", margin: "40px auto" }}>
          <h2>Please enter your information</h2>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Age"
              value={userInfo.age}
              onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
            />
          </div>
          <button
            onClick={goToNext}
            disabled={!userInfo.name || !userInfo.age}
          >
            Start Test ➡
          </button>
        </div>
      </ScreenBorder>
    );
  }

  
  // Submission Screen
if (currentIndex >= questions.length) {
  if (!timePerQuestion[currentIndex - 1]) {
    const timeSpent = (Date.now() - startTime) / 1000;
    setTimePerQuestion((prev) => ({
      ...prev,
      [currentIndex - 1]: timeSpent,
    }));
  }

  // const q1Answer = answers[1];
  // const q1Correct = questionsData.find((q) => q.id === 1)?.correct_answer;
  // console.log("Question 1 Answer:", (q1Answer), "Correct Answer:", q1Correct);

  // const q2Answer = answers[2];
  // const q2Correct = questionsData.find((q) => q.id === 2)?.correct_answer;
  // console.log("Question 2 Answer:", (q2Answer), "Correct Answer:", q2Correct);

  // for (let i = 1; i <= questionsData.length; i++) {
  //   const qAnswer = answers[i];
  //   const qCorrect = questionsData.find((q) => q.id === i)?.correct_answer;

  //   console.log(`Question ${i} Answer:`, qAnswer, "Correct Answer:", qCorrect);
  // }

  // debugging statements

  // 🧮 Calculate score
  let score = 0;

  questionsData.forEach((q) => {
    const userAns = answers[q.id];
    const correctAns = q.correct_answer;

    if (userAns !== undefined && correctAns !== undefined) {
      // Compare numbers or strings — handle array answers too
      if (Array.isArray(userAns)) {
        if (userAns.length === Number(correctAns)) {
          score++;
        }
      } else if (String(userAns).trim().toLowerCase() === String(correctAns).trim().toLowerCase()) {
        score++;
      }
    }
  });

  console.log("✅ Final Score:", score, "/", questionsData.length);

  const calculateResults = () => {
    const results: number[] = [];

    for (let i = 0; i < questionsData.length; i++) {
      const q = questionsData[i];
      const userAnswer = answers[q.id];
      const correct = q.correct_answer;

      if (typeof correct === "number" && typeof userAnswer === "number") {
        const diff = Math.abs(correct - userAnswer);
        results.push(diff === 0 ? 1 : 0); // ✅ 1 if exact match, 0 otherwise
      } 
      else if (typeof correct === "string" && typeof userAnswer === "string") {
        results.push(userAnswer.toLowerCase() === correct.toLowerCase() ? 1 : 0); // ✅ 1 if correct string match
      } 
      else {
        results.push(0); // fallback if types don't match
      }
    }

    console.log("Results array:", results);
  };


  calculateResults();



  return (
    <ScreenBorder question=" Submission Summary" scrollable>
      <div style={{ textAlign: "left", maxWidth: "600px", margin: "40px auto" }}>
        <h2>All Done, {userInfo.name}!</h2>
        <p>Here’s a summary of your responses:</p>

        {questions.map((q) => (
          <div
    key={q.id}
    style={{
      backgroundColor: "#f1f8e9",
      padding: "12px 15px",
      borderRadius: "10px",
      marginBottom: "15px",
      lineHeight: "1.6",
    }}
  >
    <strong>Question {q.id}:</strong> <br />

    <div style={{ marginTop: "8px" }}>
      <strong>Your Answer:</strong>{" "}
      {Array.isArray(answers[q.id]) && answers[q.id].length > 0
        ? answers[q.id].join(", ")
        : answers[q.id] || "No answer selected."}
    </div>

    <div style={{ marginTop: "6px" }}>
      <strong>Correct Answer:</strong>{" "}
      {Array.isArray(q.correct_answer) && q.correct_answer.length > 0
        ? q.correct_answer.join(", ")
        : q.correct_answer || "No correct answer found."}
    </div>
  </div>
        ))}

        <h3 style={{ marginTop: "30px" }}>⏱ Time per question</h3>
        
        <ul>
          {questions.map((q, index) => (
            <li key={q.id}>
              Question {q.id}:{" "}
              {timePerQuestion[index] !== undefined
                ? `${timePerQuestion[index].toFixed(2)} seconds`
                : "N/A"}
            </li>
          ))}
        </ul>


        <div style={{ marginTop: "40px", fontWeight: "bold" }}>
          Thank you for completing the test!
        </div>
      </div>
    </ScreenBorder>
  );
}


  // ✅ Question screen
  const currentQuestion = questions[currentIndex];

  return (
    <ScreenBorder
      question={currentQuestion.title}
      borderColor={currentQuestion.borderColor}
      headerColor={currentQuestion.headerColor}
      backgroundColor={currentQuestion.backgroundColor}
    >
      {currentQuestion.component}

      {/* Back button (bottom-left) */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
        }}
      >
        <button onClick={goToPrev} disabled={currentIndex === 0}>
          ⬅
        </button>
      </div>

      <div
  style={{
    position: "absolute",
    bottom: "50px",
    right: "50px",
  }}
>
  <button
    onClick={goToNext}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      outline: "none",
      transition: "transform 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <img
      src="/next.svg"
      alt="Next"
      style={{
        width: "150px",
        height: "auto",
        display: "block",
      }}
    />
  </button>
</div>

    </ScreenBorder>
  );
};

export default App;
