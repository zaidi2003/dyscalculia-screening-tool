import React, { useState } from "react";
import ScreenBorder from "./components/ScreenBorder";
import Question1 from "./components/questions/Question1";
import Question2 from "./components/questions/Question2";

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // -1 means "Start Page"
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [startTime, setStartTime] = useState(Date.now());
  const [timePerQuestion, setTimePerQuestion] = useState<{ [key: number]: number }>({});
  const [userInfo, setUserInfo] = useState<{ name: string; age: string }>({ name: "", age: "" });

  const questions = [
    {
      id: 1,
      title: "Can you select five apples?",
      component: <Question1 onAnswer={(ans) => handleAnswer(1, ans)} />,
    },
    {
      id: 2,
      title: "Select two boxes on the line.",
      component: <Question2 onAnswer={(ans) => handleAnswer(2, ans)} />,
    },
  ];

  const handleAnswer = (id: number, ans: any) => {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  };

  const goToNext = () => {
    if (currentIndex >= 0) {
      const timeSpent = (Date.now() - startTime) / 1000;
      setTimePerQuestion((prev) => ({ ...prev, [currentIndex]: timeSpent }));
      setStartTime(Date.now());
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = () => setCurrentIndex((prev) => prev - 1);

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

  

  //  Submission Screen
  if (currentIndex >= questions.length) {
    return (
      <ScreenBorder question="✅ Submission Summary">
        <div style={{ textAlign: "left", maxWidth: "600px", margin: "40px auto" }}>
          <h2>All Done, {userInfo.name}!</h2>
          <p>Here’s a summary of your responses:</p>

          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                backgroundColor: "#f1f8e9",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <strong>Question {q.id}:</strong> <br />
              {Array.isArray(answers[q.id]) && answers[q.id].length > 0
                ? answers[q.id].join(", ")
                : "No answer selected."}
            </div>
          ))}

          <h3 style={{ marginTop: "30px" }}>⏱ Time per question</h3>
          <ul>
            {questions.map((_, idx) => (
              <li key={idx}>
                Question {idx + 1}:{" "}
                {timePerQuestion[idx]
                  ? `${timePerQuestion[idx].toFixed(2)} seconds`
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

  // ✅ Question Screen
  const currentQuestion = questions[currentIndex];

  return (
    <ScreenBorder question={currentQuestion.title}>
      {currentQuestion.component}

      <div style={{ marginTop: "40px" }}>
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          style={{ marginRight: "10px" }}
        >
          ⬅ Back
        </button>
        <button onClick={goToNext}>
          {currentIndex === questions.length - 1 ? "Submit" : "Next ➡"}
        </button>
      </div>
    </ScreenBorder>
  );
};

export default App;
