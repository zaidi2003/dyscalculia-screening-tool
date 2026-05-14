import React, { useState } from "react";
import ScreenBorder from "./ScreenBorder";
import { questionsData } from "./questions";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import BalloonPopGame from "./BaloonPopGame";

const MainPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [startTime, setStartTime] = useState(Date.now());
  const [timePerQuestion, setTimePerQuestion] = useState<{ [key: number]: number }>({});
  const [userInfo, setUserInfo] = useState({ name: "", grade: "", age: "", classCode: "" });
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

  // Also save to Firebase or CSV as before
  if (navigator.onLine) {
    await submitResultsToFirebase();
    console.log("Online Submission");
  } else {
    downloadCSV();
    console.log("Offline Submission");
  }
};


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
      classCode: userInfo.classCode,
      scores,
      response_times,
      teacher_perception: -1,
      math_performance: -1,   // hardcoded until you add form fields
      other_performance: -1,
      enjoyment,
      feeling,
    };
  };

  

  const submitResultsToFirebase = async () => {
    const payload = buildApiPayload();
    if (!payload) return;
    try {
      const docRef = doc(db, "results", `${userInfo.name}-${Date.now()}`);
      await setDoc(docRef, {
        userInfo,
        payload,
        timestamp: new Date().toISOString(),
      });
      console.log("✅ Results sent to Firebase!");
    } catch (error) {
      console.error("❌ Firestore upload failed:", error);
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
              placeholder="Full name"
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
              placeholder="Grade"
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
              placeholder="Age"
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
          <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Class code"
            value={userInfo.classCode}
            onChange={(e) => setUserInfo({ ...userInfo, classCode: e.target.value })}
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
            disabled={!userInfo.name || !userInfo.grade || !userInfo.age || !userInfo.classCode}
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
            Start Test 
          </button>
        </div>
      </ScreenBorder>
    );
  }


if (currentIndex >= questions.length) {

  if (!hasSubmitted.current) {
    hasSubmitted.current = true;
    handleFinalSubmit();
    console.log("Results submitted:", { userInfo, answers, timePerQuestion });
  }

  return (
    <ScreenBorder question="🎉 All Done!">
      <div style={{ textAlign: "center", maxWidth: "400px", margin: "40px auto" }}>
        <h2>Congratulations {userInfo.name}, on completing the screening!</h2>
      </div>
      <BalloonPopGame />
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
      </div>

      {/* Next button */}
      <div style={{ position: "absolute", bottom: "50px", right: "50px" }}>
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

export default MainPage;