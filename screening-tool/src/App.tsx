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
  const [userInfo, setUserInfo] = useState({ name: "" });
  

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
    // Save time for current question
    const qid = questions[currentIndex]?.id;
    if (qid !== undefined) {
      const timeSpent = (Date.now() - startTime) / 1000;
      setTimePerQuestion((prev) => ({
        ...prev,
        [qid]: timeSpent,
      }));
    }

    // Move to next question
    setCurrentIndex((prev) => prev + 1);

    // Reset timer for next question
    setStartTime(Date.now());
  };

  const calculateResults = () => {
    const results: { id: number; score: number; time: number }[] = [];

    questionsData.forEach((q) => {
      const userAnswer = answers[q.id];
      const correct = q.correct_answer;
      let score = 0;

      if (q.type === "binary") {
        if (typeof correct === "number" && typeof userAnswer === "number") {
          score = correct === userAnswer ? 1 : 0;
        } else if (typeof correct === "string" && typeof userAnswer === "string") {
          score = userAnswer.toLowerCase() === correct.toLowerCase() ? 1 : 0;
        }
      } else if (q.type === "deviation") {
        if (typeof correct === "number" && typeof userAnswer === "number") {
          score = Math.abs(correct - userAnswer);
        }
      }

      results.push({
        id: q.id,
        score,
        time: timePerQuestion[q.id] || 0,
      });
    });

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
      console.log("Offline mode: Results", { userInfo, results });

      console.log("✅ Results sent to Firebase!");
    } catch (error) {
      console.error("❌ Firestore upload failed:", error);
    }
  };

  const downloadCSV = () => {
    const results = calculateResults();

    // Build CSV content
    let csv = "Question ID,Your Answer,Correct Answer,Time Spent (s),Score\n";

    results.forEach((r) => {
      const userAnswer = answers[r.id];
      const correctAnswer = questionsData.find((q) => q.id === r.id)?.correct_answer;
      csv += `${r.id},"${userAnswer ?? ""}","${correctAnswer ?? ""}",${r.time.toFixed(2)},${r.score}\n`;
    });

    // Trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", `${userInfo.name || "results"}-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFinalSubmit = async () => {
    if (navigator.onLine) {
      // Online: send to Firestore
      await submitResultsToFirebase();
      console.log("Online Submission")
    } else {
      // Offline: download CSV
      downloadCSV();
      console.log("Offline Submission")
    }
  };

  const currentQid = questions[currentIndex]?.id;
  const answered = answers[currentQid] !== undefined;



  // Start Screen
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
                backgroundColor: "#fefefe",
                color: "#333",
              }}
            />
          </div>

          <button
            onClick={goToNext}
            disabled={!userInfo.name}
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
  // if (currentIndex >= questions.length) {
  //   submitResultsToFirebase();
  //   downloadCSV();
  //   console.log("Results submitted:", { userInfo, answers, timePerQuestion });
  //   return (
  //     <ScreenBorder question="Submission Summary" scrollable>
  //       <div style={{ textAlign: "left", maxWidth: "600px", margin: "40px auto" }}>
  //         <h2>All Done, {userInfo.name}!</h2>
  //         <p>Here’s a summary of your responses:</p>

  //         {questions.map((q) => (
  //           <div
  //             key={q.id}
  //             style={{
  //               backgroundColor: "#f1f8e9",
  //               padding: "12px 15px",
  //               borderRadius: "10px",
  //               marginBottom: "15px",
  //               lineHeight: "1.6",
  //             }}
  //           >
  //             <strong>Question {q.id}:</strong>
  //             <div style={{ marginTop: "8px" }}>
  //               <strong>Your Answer:</strong>{" "}
  //               {Array.isArray(answers[q.id])
  //                 ? answers[q.id].join(", ")
  //                 : answers[q.id] ?? "No answer selected."}
  //             </div>
  //             <div style={{ marginTop: "6px" }}>
  //               <strong>Correct Answer:</strong>{" "}
  //               {Array.isArray(q.correct_answer)
  //                 ? q.correct_answer.join(", ")
  //                 : q.correct_answer ?? "N/A"}
  //             </div>
  //             <div style={{ marginTop: "6px" }}>
  //               <strong>Time Spent:</strong>{" "}
  //               {timePerQuestion[q.id] !== undefined
  //                 ? `${timePerQuestion[q.id].toFixed(2)} seconds`
  //                 : "N/A"}
  //             </div>
  //           </div>
  //         ))}

  //         <div style={{ marginTop: "40px", fontWeight: "bold" }}>
  //           Thank you for completing the test!
  //         </div>
  //       </div>
  //     </ScreenBorder>
  //   );
  // }
  // Submission Screen
if (currentIndex >= questions.length) {
  // submitResultsToFirebase();
  // downloadCSV();
  handleFinalSubmit();
  console.log("Results submitted:", { userInfo, answers, timePerQuestion });

  return (
    <ScreenBorder question="🎉 All Done!">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        gap: "20px"
      }}>
        <h2>Congratulations, {userInfo.name}!</h2>
        <p>Thank you for completing the test.</p>

        <button
          onClick={downloadCSV}
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
          Download Results
        </button>
      </div>
    </ScreenBorder>
  );
}


  // ✅ Question Screen
  const currentQuestion = questions[currentIndex];

  return (
    <ScreenBorder
      question={currentQuestion.title}
      borderColor={currentQuestion.borderColor}
      headerColor={currentQuestion.headerColor}
      backgroundColor={currentQuestion.backgroundColor}
    >
      {currentQuestion.component}

      {/* Back button (optional) */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          opacity: 0.3,
        }}
      >
        {/* <button onClick={goToPrev} disabled={currentIndex === 0}>⬅</button> */}
      </div>

      {/* Next button */}
      <div style={{ position: "absolute", bottom: "50px", right: "50px" }}>
        {/* <button
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
            src="next.svg"
            alt="Next"
            style={{ width: "150px", height: "auto", display: "block" }}
          />
        </button> */}
        <button
  onClick={answered ? goToNext : undefined}
  disabled={!answered}
  style={{
    background: "none",
    border: "none",
    cursor: answered ? "pointer" : "not-allowed",
    opacity: answered ? 1 : 0.4,
    padding: 0,
    outline: "none",
    transition: "transform 0.2s ease-in-out",
  }}
  onMouseEnter={(e) => answered && (e.currentTarget.style.transform = "scale(1.1)")}
  onMouseLeave={(e) => answered && (e.currentTarget.style.transform = "scale(1)")}
>
  <img
    src="next.svg"
    alt="Next"
    style={{
      width: "150px",
      height: "auto",
      display: "block",
      pointerEvents: "none"
    }}
  />
</button>

      </div>
    </ScreenBorder>
  );
};

export default App;
