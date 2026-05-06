import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Result {
  id: number;
  score: number;
  time: number;
}

interface StudentRecord {
  docId: string;
  userInfo: { name: string; grade: string; age: string; classCode: string };
  results: Result[];
  timestamp: string;
  riskLevel?: string;
  probability?: number;
  at_risk?: number;
}

const CODE = "0000";

const riskColors: Record<string, { bg: string; border: string; badge: string }> = {
  High:    { bg: "#fff5f5", border: "#e53935", badge: "#e53935" },
  Medium:  { bg: "#fffde7", border: "#fb8c00", badge: "#fb8c00" },
  Low:     { bg: "#f1f8e9", border: "#4caf50", badge: "#4caf50" },
  Unknown: { bg: "#f5f5f5", border: "#9e9e9e", badge: "#9e9e9e" },
};

const Dashboard: React.FC = () => {
  const [input, setInput] = useState("");
  const [classCode, setClassCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleLogin = () => {
    if (input === CODE) {
      setClassCode(input);
      setUnlocked(true);
      setError("");
      fetchRecords(input);
    } else {
      setError("Incorrect code. Try again.");
    }
  };

  const fetchRecords = async (code: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "results"),
        where("userInfo.classCode", "==", code)
      );
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

  const getRiskLevel = (r: StudentRecord) => r.riskLevel ?? "Unknown";
  const totalScore = (results: Result[]) =>
    results.reduce((sum, r) => sum + r.score, 0);

  // ── Login Screen ──────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "48px 40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            textAlign: "center",
            width: "320px",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔒</div>
          <h2 style={{ margin: "0 0 6px", fontSize: "22px", color: "#1a1a2e" }}>
            Admin Dashboard
          </h2>
          <p style={{ margin: "0 0 24px", color: "#777", fontSize: "14px" }}>
            Enter your access code to continue
          </p>
          <input
            type="password"
            placeholder="••••"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "20px",
              letterSpacing: "6px",
              textAlign: "center",
              borderRadius: "10px",
              border: "2px solid #ddd",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "12px",
            }}
          />
          {error && (
            <p style={{ color: "#e53935", fontSize: "13px", margin: "0 0 12px" }}>
              {error}
            </p>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "10px",
              backgroundColor: "#2e5939",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Unlock →
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 24px",
        boxSizing: "border-box",
      }}
    >
      {/* Centered inner wrapper */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "26px", color: "#1a1a2e" }}>
              Results Dashboard
            </h1>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
              Showing all records for class <strong>{classCode}</strong>
            </p>
          </div>
          <button
            onClick={() => fetchRecords(classCode)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              backgroundColor: "#2e5939",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>
            Loading results...
          </div>
        ) : records.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>
            No records found for class <strong>{classCode}</strong>.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {records.map((rec) => {
              const risk = getRiskLevel(rec);
              const colors = riskColors[risk] ?? riskColors.Unknown;
              const isOpen = expandedId === rec.docId;
              const date = new Date(rec.timestamp).toLocaleString();

              return (
                <div
                  key={rec.docId}
                  style={{
                    backgroundColor: colors.bg,
                    border: `2px solid ${colors.border}`,
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Card Header */}
                  <div
                    onClick={() => setExpandedId(isOpen ? null : rec.docId)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "18px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "#1a1a2e",
                          textTransform: "capitalize",
                        }}
                      >
                        {rec.userInfo.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                        {date}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span
                        style={{
                          backgroundColor: colors.badge,
                          color: "#fff",
                          borderRadius: "20px",
                          padding: "4px 14px",
                          fontSize: "13px",
                          fontWeight: 700,
                        }}
                      >
                        {risk} Risk
                      </span>
                      <span style={{ fontSize: "12px", color: "#aaa" }}>
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isOpen && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(0,0,0,0.08)",
                        padding: "20px",
                        backgroundColor: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {/* Info Grid */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                          gap: "12px",
                          marginBottom: "20px",
                        }}
                      >
                        <InfoItem label="Grade" value={rec.userInfo.grade} />
                        <InfoItem label="Age" value={rec.userInfo.age} />
                        <InfoItem label="Class Code" value={rec.userInfo.classCode} />
                        <InfoItem
                          label="Total Score"
                          value={`${totalScore(rec.results).toFixed(1)} / ${rec.results.length}`}
                        />
                        {rec.probability !== undefined && (
                          <InfoItem label="Probability" value={`${rec.probability}%`} />
                        )}
                        {rec.at_risk !== undefined && (
                          <InfoItem
                            label="At Risk"
                            value={rec.at_risk ? "Yes" : "No"}
                            valueColor={rec.at_risk ? "#e53935" : "#4caf50"}
                          />
                        )}
                      </div>

                      {/* Question Breakdown */}
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          marginBottom: "10px",
                          fontWeight: 600,
                        }}
                      >
                        Question Breakdown
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {rec.results.map((r) => (
                          <div
                            key={r.id}
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "8px",
                              padding: "6px 10px",
                              display: "flex",
                              gap: "6px",
                              alignItems: "center",
                              fontSize: "12px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            }}
                          >
                            <span style={{ fontWeight: 700, color: "#555" }}>Q{r.id}</span>
                            <span
                              style={{
                                fontWeight: 700,
                                color:
                                  r.score === 1
                                    ? "#2e7d32"
                                    : r.score === 0.5
                                    ? "#e65100"
                                    : "#c62828",
                              }}
                            >
                              {r.score}
                            </span>
                            <span style={{ color: "#aaa" }}>{r.time.toFixed(1)}s</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string; valueColor?: string }> = ({
  label,
  value,
  valueColor,
}) => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "12px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}
  >
    <div
      style={{
        fontSize: "11px",
        color: "#999",
        marginBottom: "4px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: "16px", fontWeight: 700, color: valueColor ?? "#222" }}>
      {value}
    </div>
  </div>
);

export default Dashboard;