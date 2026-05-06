import React, { useState } from "react";
import ScreenBorder from "./components/ScreenBorder";
import { questionsData } from "./questions";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const [page, setPage] = useState<"test" | "dashboard">("test");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [startTime, setStartTime] = useState(Date.now());
  const [timePerQuestion, setTimePerQuestion] = useState<{ [key: number]: number }>({});
  const [userInfo, setUserInfo] = useState({ name: "", grade: "", age: "" });
  const [predictionResult, setPredictionResult] = useState<{ at_risk: number; probability: number; risk_level: string;} | null>(null);
  const hasSubmitted = React.useRef(false);

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

  // const calculateResults = () => {
  //   const results: { id: number; score: number; time: number }[] = [];

  //   questionsData.forEach((q) => {
  //     const userAnswer = answers[q.id];
  //     const correct = q.correct_answer;
  //     let score = 0;

  //     if (q.type === "binary") {
  //       if (typeof correct === "number" && typeof userAnswer === "number") {
  //         score = correct === userAnswer ? 1 : 0;
  //       } else if (typeof correct === "string" && typeof userAnswer === "string") {
  //         score = userAnswer.toLowerCase() === correct.toLowerCase() ? 1 : 0;
  //       }
  //     } else if (q.type === "deviation") {
  //       if (typeof correct === "number" && typeof userAnswer === "number") {
  //         score = correct === userAnswer ? 1 : 0;
  //       }

  //     }

  //     results.push({
  //       id: q.id,
  //       score,
  //       time: timePerQuestion[q.id] || 0,
  //     });
  //   });

  //   return results;
  // };
  const calculateResults = () => {
  const results: { id: number; score: number; time: number }[] = [];


  questionsData.forEach((q) => {
    const userAnswer = answers[q.id];
    const correct = q.correct_answer;

    console.log(`Q${q.id}: type=${q.type}, correct=${correct} (${typeof correct}), user=${userAnswer} (${typeof userAnswer})`);
    let score = 0;

    if (q.type === "binary") {
      // String comparison (Q5,Q6,Q7,Q8,Q9,Q10,Q11,Q16,Q17,Q18,Q22,Q23,Q24)
      if (typeof correct === "string" && typeof userAnswer === "string") {
        score = userAnswer.toLowerCase() === correct.toLowerCase() ? 1 : 0;
      }
      // Number comparison (Q3, Q4)
      else if (typeof correct === "number" && typeof userAnswer === "number") {
        score = correct === userAnswer ? 1 : 0;
      }

    } else if (q.type === "deviation") {
      // Q1, Q2: counting — user selects count, correct is exact number
      // Q12, Q13: number line — user places marker
      // Q14, Q15: arithmetic — user types answer
      // Q19, Q20, Q21: money — user types amount
      if (typeof correct === "number") {
        const userNum = typeof userAnswer === "string"
          ? parseFloat(userAnswer)
          : userAnswer;

        if (typeof userNum === "number" && !isNaN(userNum)) {
          const error = Math.abs(correct - userNum);
          const tolerance = correct * 0.1; // 10% tolerance
          score = error === 0 ? 1 : error <= tolerance ? 0.5 : 0;
        } else {
          score = 0;
        }
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
    // link.setAttribute("download", `${userInfo.name || "results"}-${Date.now()}.csv`);

    link.setAttribute(
      "download",
      `${userInfo.name || "results"}-age${userInfo.age}-grade${userInfo.grade}-${Date.now()}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFinalSubmit = async () => {
  // Call predict API
  const prediction = await callPredictAPI();
  if (prediction) {
    console.log("Risk Level:", prediction.risk_level);
    console.log("Probability:", prediction.probability);
  }

  // Also save to Firebase or CSV as before
  if (navigator.onLine) {
    await submitResultsToFirebase();
    console.log("Online Submission");
  } else {
    downloadCSV();
    console.log("Offline Submission");
  }
};

  // const handleFinalSubmit = async () => {
  //   if (navigator.onLine) {
  //     // Online: send to Firestore
  //     await submitResultsToFirebase();
  //     console.log("Online Submission")
  //   } else {
  //     // Offline: download CSV
  //     downloadCSV();
  //     console.log("Offline Submission")
  //   }
  // };

  const buildApiPayload = () => {
    const results = calculateResults();

    const scores: { [key: string]: number } = {};
    const response_times: { [key: string]: number } = {};

    // Only Q1–Q24 go into scores/response_times
    results
      .filter((r) => r.id >= 1 && r.id <= 24)
      .forEach((r) => {
        const qKey = `Q${r.id}`;
        scores[qKey] = r.score;
        response_times[qKey] = r.time;
      });

    // Q25 = enjoyment (1–5), Q26 = feeling (1–5)
    const enjoymentRaw = answers[25];
    const feelingRaw = answers[26];

    const enjoyment = Math.min(5, Math.max(1, parseInt(enjoymentRaw) || 3));
    const feeling = Math.min(5, Math.max(1, parseInt(feelingRaw) || 3));

    // grade and age must be valid integers
    const grade = parseInt(userInfo.grade);
    const age = parseInt(userInfo.age);

    if (isNaN(grade) || grade < 1 || grade > 3) {
      console.error("❌ Invalid grade:", userInfo.grade);
      return null;
    }
    if (isNaN(age) || age < 5 || age > 12) {
      console.error("❌ Invalid age:", userInfo.age);
      return null;
    }

    return {
      grade,
      age,
      scores,
      response_times,
      teacher_perception: 1,
      math_performance: 5,   // hardcoded until you add form fields
      other_performance: 5,
      enjoyment,
      feeling,
    };
  };

  const callPredictAPI = async () => {
    const payload = buildApiPayload();
    console.log("API Payload:", payload);
    if (!payload) return null;

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("❌ API Error:", err);
        return null;
      }

      const result = await response.json();
      setPredictionResult(result); // ← save to state
      console.log("✅ Prediction:", result);
      return result;
    } catch (error) {
      console.error("❌ Could not reach API:", error);
      return null;
    }
  };

  const currentQid = questions[currentIndex]?.id;
  const answered = answers[currentQid] !== undefined;

  if (page === "dashboard") {
    return <Dashboard />;
  }

  // Start Screen
  if (currentIndex === -1) {
    return (
      <ScreenBorder question="Dyscalculia Screening Tool">
        <div style={{ textAlign: "center", maxWidth: "400px", margin: "40px auto" }}>
          <h2>Please enter your information</h2>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter your name"
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
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter your grade"
              min={1}
              max={3}
              value={userInfo.grade}
              onChange={(e) => setUserInfo({ ...userInfo, grade: (e.target.value) })}
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
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter your age"
              min={5}
              max={12}
              value={userInfo.age}
              onChange={(e) => setUserInfo({ ...userInfo, age: (e.target.value) })}
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
            disabled={!userInfo.name || !userInfo.grade || !userInfo.age}
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
          <button onClick={() => setPage("dashboard")}>
  Go to Dashboard
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
// if (currentIndex >= questions.length) {
//   // submitResultsToFirebase();
//   // downloadCSV();
//   handleFinalSubmit();
//   console.log("Results submitted:", { userInfo, answers, timePerQuestion });

//   return (
//     <ScreenBorder question="🎉 All Done!">
//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "80vh",
//         textAlign: "center",
//         gap: "20px"
//       }}>
//         <h2>Congratulations, {userInfo.name}!</h2>
//         <p>Thank you for completing the test.</p>

//         <button
//           onClick={downloadCSV}
//           style={{
//             padding: "12px 24px",
//             fontSize: "16px",
//             borderRadius: "8px",
//             backgroundColor: "#4caf50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Download Results
//         </button>
//       </div>
//     </ScreenBorder>
//   );
// }
if (currentIndex >= questions.length) {

  if (!hasSubmitted.current) {
    hasSubmitted.current = true;
    handleFinalSubmit();
    console.log("Results submitted:", { userInfo, answers, timePerQuestion });
  }

  const riskColor =
    predictionResult?.risk_level === "High" ? "#e53935" :
    predictionResult?.risk_level === "Medium" ? "#fb8c00" : "#4caf50";

  return (
    <ScreenBorder question="🎉 All Done!">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        gap: "24px",
      }}>
        <h2 style={{ color: "#2e5939", fontSize: "28px", margin: 0 }}>
          Congratulations, {userInfo.name}!
        </h2>
        <p style={{ color: "#555", margin: 0 }}>
          Thank you for completing the test.
        </p>

        {/* Result Card */}
        {predictionResult ? (
          <div style={{
            backgroundColor: "#fff8dc",
            border: `3px solid ${riskColor}`,
            borderRadius: "15px",
            padding: "30px 40px",
            boxShadow: `0 5px 20px ${riskColor}33`,
            minWidth: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* Risk Level Badge */}
            <div style={{
              backgroundColor: riskColor,
              color: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "22px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}>
              {predictionResult.risk_level} Risk
            </div>

            {/* Probability Bar */}
            <div style={{ textAlign: "left" }}>
              <div style={{
                fontSize: "13px",
                color: "#555",
                marginBottom: "6px",
                fontWeight: "600",
              }}>
                Probability: {predictionResult.probability}%
              </div>
              <div style={{
                backgroundColor: "#e0e0e0",
                borderRadius: "999px",
                height: "12px",
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${predictionResult.probability}%`,
                  height: "100%",
                  backgroundColor: riskColor,
                  borderRadius: "999px",
                  transition: "width 1s ease",
                }} />
              </div>
            </div>

            {/* At Risk Label */}
            <div style={{
              fontSize: "14px",
              color: "#555",
              borderTop: "1px solid #ddd",
              paddingTop: "12px",
            }}>
              Screening Result:{" "}
              <strong style={{ color: predictionResult.at_risk ? "#e53935" : "#4caf50" }}>
                {predictionResult.at_risk ? "At Risk" : "Not At Risk"}
              </strong>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: "#fff8dc",
            border: "3px solid #8bc34a",
            borderRadius: "15px",
            padding: "20px 40px",
            color: "#555",
            fontSize: "16px",
          }}>
            Analyzing results...
          </div>
        )}

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
