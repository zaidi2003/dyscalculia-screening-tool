import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import ScreenBorder from "./ScreenBorder";

interface StudentRecord {
  docId: string;
  userInfo: { name: string; grade: string; age: string; classCode: string };
  payload: {
    scores: Record<string, number>;
    response_times: Record<string, number>;
    enjoyment: number;
    feeling: number;
    math_performance: number;
    other_performance: number;
    teacher_perception: number;
  };
  timestamp: string;
  prediction?: PredictResponse;
}

interface PredictResponse {
  risk_class: number;
  risk_label: string;
  description: string;
  probabilities: { no_risk: number; moderate_risk: number; severe_risk: number };
  confidence: number;
}

const API_URL = "http://localhost:8000";

const riskColors: Record<string, { bg: string; border: string; badge: string }> = {
  "No Risk":       { bg: "#f1f8e9", border: "#4caf50", badge: "#4caf50" },
  "Moderate Risk": { bg: "#fffde7", border: "#fb8c00", badge: "#fb8c00" },
  "Severe Risk":   { bg: "#fff5f5", border: "#e53935", badge: "#e53935" },
  "Unknown":       { bg: "#f5f5f5", border: "#9e9e9e", badge: "#9e9e9e" },
};

const defaultColors = { bg: "#f5f5f5", border: "#9e9e9e", badge: "#9e9e9e" };

const totalScore = (scores: Record<string, number>) =>
  Object.values(scores).reduce((sum, v) => sum + v, 0);

const Dashboard: React.FC = () => {
  const [input, setInput] = useState("");
  const [classCode, setClassCode] = useState(() => sessionStorage.getItem("dash_code") ?? "");
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem("dash_code"));
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [teacherInputs, setTeacherInputs] = useState<Record<string, { teacher_perception: string; math_performance: string; other_performance: string }>>({});
  const [submitError, setSubmitError] = useState<Record<string, string>>({});
  const [predicting, setPredicting] = useState<Record<string, boolean>>({});
  const [predictions, setPredictions] = useState<Record<string, PredictResponse>>({});
  const [payloadOverrides, setPayloadOverrides] = useState<
    Record<string, { teacher_perception: number; math_performance: number; other_performance: number }>
  >({});

  useEffect(() => {
    if (unlocked && classCode) fetchRecords(classCode);
  }, []);

  const handleLogin = async () => {
    if (!input.trim()) {
      setError("Please enter your code.");
      return;
    }
    setLoggingIn(true);
    setError("");
    try {
      // Look up the teacher by the code they entered.
      const q = query(
        collection(db, "teachers"),
        where("code", "==", input.trim()),
        limit(1)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        setError("Incorrect code. Try again.");
        return;
      }

      // Pull the classroom code (classCode) from the matched teacher doc.
      const data = snap.docs[0].data() as { classCode?: string };
      const code = data.classCode;

      if (!code) {
        setError("Teacher account is missing a class code. Contact admin.");
        return;
      }

      sessionStorage.setItem("dash_code", code);
      setClassCode(code);
      setUnlocked(true);
      setInput("");
      fetchRecords(code);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dash_code");
    setClassCode("");
    setUnlocked(false);
    setRecords([]);
    setExpandedId(null);
  };

  const fetchRecords = async (code: string) => {
    setLoading(true);
    try {
      const q = query(collection(db, "results"), where("userInfo.classCode", "==", code));
      const snapshot = await getDocs(q);
      const data: StudentRecord[] = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...(doc.data() as Omit<StudentRecord, "docId">),
      }));
      setRecords(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const getInputVal = (docId: string, field: "teacher_perception" | "math_performance" | "other_performance") =>
    teacherInputs[docId]?.[field] ?? "";

  const setInputVal = (docId: string, field: "teacher_perception" | "math_performance" | "other_performance", val: string) => {
    setTeacherInputs((prev) => ({
      ...prev,
      [docId]: { ...prev[docId], [field]: val },
    }));
  };

  const handleSubmit = async (rec: StudentRecord) => {
    const inputs = teacherInputs[rec.docId] ?? {};
    const p = rec.payload;
    const needsTeacher = p?.teacher_perception === -1;
    const needsMath = p?.math_performance === -1;
    const needsOther = p?.other_performance === -1;

    let teacher_perception = needsTeacher ? parseInt(inputs.teacher_perception ?? "") : p.teacher_perception;
    let math_performance = needsMath ? parseInt(inputs.math_performance ?? "") : p.math_performance;
    let other_performance = needsOther ? parseInt(inputs.other_performance ?? "") : p.other_performance;

    if (needsTeacher && (isNaN(teacher_perception) || teacher_perception < 0 || teacher_perception > 1)) {
      setSubmitError((prev) => ({ ...prev, [rec.docId]: "Teacher Perception must be 0 or 1" }));
      return;
    }
    if (needsMath && (isNaN(math_performance) || math_performance < 0 || math_performance > 5)) {
      setSubmitError((prev) => ({ ...prev, [rec.docId]: "Math Performance must be 0-5" }));
      return;
    }
    if (needsOther && (isNaN(other_performance) || other_performance < 0 || other_performance > 5)) {
      setSubmitError((prev) => ({ ...prev, [rec.docId]: "Other Performance must be 0-5" }));
      return;
    }

    setSubmitError((prev) => ({ ...prev, [rec.docId]: "" }));
    setPredicting((prev) => ({ ...prev, [rec.docId]: true }));

    try {
      const body = {
        grade: parseInt(rec.userInfo.grade),
        age: parseInt(rec.userInfo.age),
        scores: p.scores,
        response_times: p.response_times,
        teacher_perception,
        math_performance,
        other_performance,
        enjoyment: p.enjoyment,
        feeling: p.feeling,
      };

      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const result: PredictResponse = await res.json();

      setPredictions((prev) => ({ ...prev, [rec.docId]: result }));
      setPayloadOverrides((prev) => ({
        ...prev,
        [rec.docId]: { teacher_perception, math_performance, other_performance },
      }));
      setRecords((prev) =>
        prev.map((r) =>
          r.docId === rec.docId
            ? {
                ...r,
                payload: {
                  ...r.payload,
                  teacher_perception,
                  math_performance,
                  other_performance,
                },
                prediction: result,
              }
            : r
        )
      );

      updateDoc(doc(db, "results", rec.docId), {
        "payload.teacher_perception": teacher_perception,
        "payload.math_performance": math_performance,
        "payload.other_performance": other_performance,
        prediction: {
          risk_class: result.risk_class,
          risk_label: result.risk_label,
          description: result.description,
          probabilities: result.probabilities,
          confidence: result.confidence,
        },
        updatedAt: serverTimestamp(),
      }).catch((err) => {
        console.error("Firestore update failed:", err);
      });
    } catch (err: any) {
      setSubmitError((prev) => ({ ...prev, [rec.docId]: err.message ?? "Prediction failed" }));
    } finally {
      setPredicting((prev) => ({ ...prev, [rec.docId]: false }));
    }
  };

  const expandedRecord = records.find((r) => r.docId === expandedId) ?? null;

  const mergeRecord = (rec: StudentRecord): StudentRecord => {
    const override = payloadOverrides[rec.docId];
    const freshPred = predictions[rec.docId];
    return {
      ...rec,
      payload: override
        ? { ...rec.payload, ...override }
        : rec.payload,
      prediction: freshPred ?? rec.prediction,
    };
  };

  // Renders the full expanded details panel for the currently-selected record.
  const renderExpandedPanel = () => {
    if (!expandedRecord) return null;
    const rec = mergeRecord(expandedRecord);
    const scores = rec.payload?.scores ?? {};
    const response_times = rec.payload?.response_times ?? {};
    const score = totalScore(scores);
    const total = Object.keys(scores).length;
    const p = rec.payload;
    const pred = rec.prediction;

    const isPredicting = predicting[rec.docId] ?? false;
    const panelColors = pred ? (riskColors[pred.risk_label] ?? defaultColors) : defaultColors;

    const needsTeacher = p?.teacher_perception === -1;
    const needsMath = p?.math_performance === -1;
    const needsOther = p?.other_performance === -1;
    const hasAnyMissing = needsTeacher || needsMath || needsOther;

    const questionKeys = Object.keys(scores).sort(
      (a, b) => parseInt(a.replace("Q", ""), 10) - parseInt(b.replace("Q", ""), 10)
    );

    return (
      <div style={{ backgroundColor: panelColors.bg, border: `2px solid ${panelColors.border}`, borderRadius: "14px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", textTransform: "capitalize" }}>{rec.userInfo.name}</div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "3px" }}>{new Date(rec.timestamp).toLocaleString()}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ backgroundColor: panelColors.badge, color: "#fff", borderRadius: "20px", padding: "5px 16px", fontSize: "13px", fontWeight: 700 }}>
              {pred ? pred.risk_label : "Unknown Risk"}
            </span>
            <button onClick={() => setExpandedId(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#aaa", lineHeight: 1 }}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px", marginBottom: "24px" }}>
            <InfoItem label="Grade" value={rec.userInfo.grade} />
            <InfoItem label="Age" value={rec.userInfo.age} />
            <InfoItem label="Class Code" value={rec.userInfo.classCode} />
            <InfoItem label="Total Score" value={`${score} / ${total}`} />
            {p?.feeling !== undefined && <InfoItem label="Feeling" value={String(p.feeling)} />}
            {p?.enjoyment !== undefined && <InfoItem label="Enjoyment" value={String(p.enjoyment)} />}
            {!needsTeacher && p?.teacher_perception !== undefined && (
              <InfoItem label="Teacher Perception" value={String(p.teacher_perception)} />
            )}
            {!needsMath && p?.math_performance !== undefined && p.math_performance !== -1 && (
              <InfoItem label="Math Performance" value={String(p.math_performance)} />
            )}
            {!needsOther && p?.other_performance !== undefined && p.other_performance !== -1 && (
              <InfoItem label="Other Performance" value={String(p.other_performance)} />
            )}
          </div>

          {/* Teacher inputs */}
          {hasAnyMissing && !pred && !isPredicting && (
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e0e0e0" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "14px" }}>Teacher Input Required</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
                {needsTeacher && (
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Teacher Perception (0–1)</label>
                    <input type="number" min={0} max={1} placeholder="0–1"
                      value={getInputVal(rec.docId, "teacher_perception")}
                      onChange={(e) => setInputVal(rec.docId, "teacher_perception", e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: "80px", padding: "8px 10px", fontSize: "14px", fontWeight: 700, borderRadius: "8px", border: "2px solid #ddd", outline: "none", textAlign: "center" }}
                    />
                  </div>
                )}
                {needsMath && (
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Math Performance (0–5)</label>
                    <input type="number" min={0} max={5} placeholder="0–5"
                      value={getInputVal(rec.docId, "math_performance")}
                      onChange={(e) => setInputVal(rec.docId, "math_performance", e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: "80px", padding: "8px 10px", fontSize: "14px", fontWeight: 700, borderRadius: "8px", border: "2px solid #ddd", outline: "none", textAlign: "center" }}
                    />
                  </div>
                )}
                {needsOther && (
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Other Performance (0–5)</label>
                    <input type="number" min={0} max={5} placeholder="0–5"
                      value={getInputVal(rec.docId, "other_performance")}
                      onChange={(e) => setInputVal(rec.docId, "other_performance", e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: "80px", padding: "8px 10px", fontSize: "14px", fontWeight: 700, borderRadius: "8px", border: "2px solid #ddd", outline: "none", textAlign: "center" }}
                    />
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); handleSubmit(rec); }}
                  disabled={isPredicting}
                  style={{ padding: "8px 20px", backgroundColor: "#2e5939", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: isPredicting ? "not-allowed" : "pointer", height: "36px", opacity: isPredicting ? 0.7 : 1 }}
                >
                  Submit
                </button>
              </div>
              {submitError[rec.docId] && (
                <div style={{ marginTop: "10px", fontSize: "12px", color: "#e53935" }}>{submitError[rec.docId]}</div>
              )}
            </div>
          )}

          {/* Spinner */}
          {isPredicting && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "28px 0", marginBottom: "24px" }}>
              <div className="spinner" />
              <div style={{ fontSize: "13px", color: "#888" }}>Running screening model…</div>
            </div>
          )}

          {/* Prediction result */}
          {pred && !isPredicting && (
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${panelColors.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Screening Result</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: panelColors.badge }}>{pred.risk_label}</div>
                  <div style={{ fontSize: "12px", color: "#777", marginTop: "4px", maxWidth: "420px" }}>{pred.description}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "16px" }}>
                  <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Confidence</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: panelColors.badge }}>{pred.confidence.toFixed(1)}%</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {([
                  { label: "No Risk", value: pred.probabilities.no_risk, color: "#4caf50" },
                  { label: "Moderate Risk", value: pred.probabilities.moderate_risk, color: "#fb8c00" },
                  { label: "Severe Risk", value: pred.probabilities.severe_risk, color: "#e53935" },
                ] as { label: string; value: number; color: string }[]).map(({ label, value, color }) => (
                  <div key={label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                      <span>{label}</span>
                      <span style={{ fontWeight: 700 }}>{value.toFixed(1)}%</span>
                    </div>
                    <div style={{ backgroundColor: "#f0f0f0", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
                      <div className="prob-bar" style={{ width: `${value}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question breakdown */}
          <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px", fontWeight: 600 }}>Question Breakdown</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {questionKeys.map((key) => {
              const s = scores[key];
              const t = response_times[key] ?? 0;
              return (
                <div key={key} style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "6px 10px", display: "flex", gap: "6px", alignItems: "center", fontSize: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <span style={{ fontWeight: 700, color: "#555" }}>{key}</span>
                  <span style={{ fontWeight: 700, color: s === 1 ? "#2e7d32" : "#c62828" }}>{s}</span>
                  <span style={{ color: "#aaa" }}>{t.toFixed(2)}s</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (!unlocked) {
    return (
      <ScreenBorder question="Teacher Dashboard Access">
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "48px 40px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", textAlign: "center", width: "320px", maxWidth: "100%" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔒</div>
          <h2 style={{ margin: "0 0 6px", fontSize: "22px", color: "#1a1a2e" }}>Teacher Dashboard</h2>
          <p style={{ margin: "0 0 24px", color: "#777", fontSize: "14px" }}>Enter your access code to continue</p>
          <input
            type="password"
            placeholder="Enter access code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loggingIn && handleLogin()}
            disabled={loggingIn}
            style={{ width: "100%", padding: "12px 16px", fontSize: "16px", textAlign: "center", borderRadius: "10px", border: "2px solid #ddd", outline: "none", boxSizing: "border-box", marginBottom: "12px" }}
          />
          {error && <p style={{ color: "#e53935", fontSize: "13px", margin: "0 0 12px" }}>{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loggingIn}
            style={{ width: "100%", padding: "12px", fontSize: "16px", borderRadius: "10px", backgroundColor: "#2e5939", color: "#fff", border: "none", cursor: loggingIn ? "not-allowed" : "pointer", fontWeight: "bold", opacity: loggingIn ? 0.7 : 1 }}
          >
            {loggingIn ? "Checking…" : "Unlock →"}
          </button>
        </div>
      </div>
      </ScreenBorder>
    );
  }

  return (
    <ScreenBorder question="Results Dashboard" scrollable>
    <div style={{ padding: "32px 24px", boxSizing: "border-box" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 36px; height: 36px; border: 3px solid #e0e0e0; border-top-color: #2e5939; border-radius: 50%; animation: spin 0.7s linear infinite; }
        .prob-bar { height: 8px; border-radius: 4px; transition: width 0.6s ease; }
        .cards-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 600px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .cards-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1200px) {
          .cards-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ textAlign: "left" }}>
            <h1 style={{ margin: 0, fontSize: "26px", color: "#1a1a2e" }}>Results Dashboard</h1>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
              Class <strong>{classCode}</strong> · {records.length} students
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => fetchRecords(classCode)} style={{ padding: "10px 18px", borderRadius: "8px", backgroundColor: "#2e5939", color: "#fff", border: "none", cursor: "pointer", fontSize: "14px" }}>
              ↻ Refresh
            </button>
            <button onClick={handleLogout} style={{ padding: "10px 18px", borderRadius: "8px", backgroundColor: "#fff", color: "#2e5939", border: "2px solid #2e5939", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>Loading results...</div>
        ) : records.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>
            No records found for class <strong>{classCode}</strong>.
          </div>
        ) : (
          <div className="cards-grid">
            {records.map((rawRec) => {
              const rec = mergeRecord(rawRec);
              const isSelected = expandedId === rec.docId;
              const date = new Date(rec.timestamp).toLocaleString();
              const scores = rec.payload?.scores ?? {};
              const score = totalScore(scores);
              const total = Object.keys(scores).length;
              const pred = rec.prediction;
              const cardColors = pred ? (riskColors[pred.risk_label] ?? defaultColors) : defaultColors;

              const card = (
                <div
                  onClick={() => setExpandedId(isSelected ? null : rec.docId)}
                  style={{
                    backgroundColor: cardColors.bg,
                    border: `2px solid ${isSelected ? cardColors.border : "transparent"}`,
                    outline: isSelected ? `2px solid ${cardColors.border}` : "2px solid transparent",
                    borderRadius: "14px",
                    boxShadow: isSelected ? `0 4px 16px ${cardColors.border}44` : "0 2px 12px rgba(0,0,0,0.07)",
                    cursor: "pointer",
                    padding: "16px 18px",
                    transition: "box-shadow 0.15s, border 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a2e", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {rec.userInfo.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "#888", marginTop: "3px" }}>Grade {rec.userInfo.grade} · Age {rec.userInfo.age}</div>
                      <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>{date}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", flexShrink: 0, marginLeft: "8px" }}>
                      <span style={{ backgroundColor: cardColors.badge, color: "#fff", borderRadius: "20px", padding: "3px 10px", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap" }}>
                        {pred ? pred.risk_label : "Unknown"}
                      </span>
                      <span style={{ fontSize: "11px", color: "#888" }}>{score}/{total}</span>
                      <span style={{ fontSize: "10px", color: "#bbb" }}>{isSelected ? "▲" : "▼"}</span>
                    </div>
                  </div>
                </div>
              );

              // When this card is the expanded one, render the panel as a full-row grid item
              // immediately after it, so it appears inline beneath the tapped card.
              if (isSelected && expandedRecord) {
                return (
                  <React.Fragment key={rec.docId}>
                    {card}
                    <div style={{ gridColumn: "1 / -1" }}>
                      {renderExpandedPanel()}
                    </div>
                  </React.Fragment>
                );
              }

              return <React.Fragment key={rec.docId}>{card}</React.Fragment>;
            })}
          </div>
        )}
      </div>
    </div>
        </ScreenBorder>
  );
};

const InfoItem: React.FC<{ label: string; value: string; valueColor?: string }> = ({ label, value, valueColor }) => (
  <div style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
    <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
    <div style={{ fontSize: "16px", fontWeight: 700, color: valueColor ?? "#222" }}>{value}</div>
  </div>
);

export default Dashboard;