import React, { useState } from "react";
import ScreenBorder from "./components/ScreenBorder";
import { questionsData } from "./questions";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [startTime, setStartTime] = useState(Date.now());
  const [timePerQuestion, setTimePerQuestion] = useState<{ [key: number]: number }>({});
  const [userInfo, setUserInfo] = useState({ name: "", age: "" });

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

  setTimePerQuestion((prev) => ({
    ...prev,
    [currentIndex]: timeSpent,
  }));

  setStartTime(Date.now());
  setCurrentIndex((prev) => prev + 1);
};


  const goToPrev = () => setCurrentIndex((prev) => prev - 1);

  const calculateResults = () => {
    const results: Record<string, { score: number; time: number }> = {}; // ✅ store both score + time

    for (let i = 0; i < questionsData.length; i++) {
      const q = questionsData[i];
      const userAnswer = answers[q.id];
      const correct = q.correct_answer;
      const key = `question${q.id}`; // e.g. "question1"

      let score = 0;

      if (q.type === "binary") {
        // 1 if correct, 0 otherwise
        if (typeof correct === "number" && typeof userAnswer === "number") {
          score = correct === userAnswer ? 1 : 0;
        } else if (typeof correct === "string" && typeof userAnswer === "string") {
          score = userAnswer.toLowerCase() === correct.toLowerCase() ? 1 : 0;
        }
      } 
      else if (q.type === "deviation") {
        //  absolute difference for numeric answers
        if (typeof correct === "number" && typeof userAnswer === "number") {
          score = Math.abs(correct - userAnswer);
        }
      }

      //  Include both score and time
      results[key] = {
        score: score,
        time: timePerQuestion[q.id] || 0, // fallback to 0 if undefined
      };
    }

    console.log("Results JSON:", results);
    return results;
  };

  const submitResultsToFirebase = async () => {
    const results = calculateResults();
    try {
      const docRef = doc(db, "results", `${userInfo.name}-${Date.now()}`);
      await setDoc(docRef, {
        userInfo,
        results,
        timestamp: new Date().toISOString(),
      });
      console.log("✅ Results sent to Firebase!");
    } catch (error) {
      console.error("❌ Firestore upload failed:", error);
    }
  };



  //  Start screen
  if (currentIndex === -1) {
    return (
      <ScreenBorder question="Dyscalculia Screening Tool">
        <div style={{ textAlign: "center", maxWidth: "400px", margin: "40px auto" }}>
          <h2>Please enter your information</h2>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter your assigned ID"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "18px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                outline: "none",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter your age"
              value={userInfo.age}
              onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                outline: "none",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={goToNext}
            disabled={!userInfo.name || !userInfo.age}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
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

  submitResultsToFirebase();
  


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
      <strong>Your Answer: {typeof(answers[q.id])}</strong>{" "}
      {Array.isArray(answers[q.id]) && answers[q.id].length > 0
        ? answers[q.id].join(", ")
        : answers[q.id] || "No answer selected."}
    </div>


    <div style={{ marginTop: "6px" }}>
      <strong>Correct Answer: {typeof(q.correct_answer)}</strong>{" "}
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
