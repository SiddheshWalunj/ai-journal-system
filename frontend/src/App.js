import React, { useState } from "react";
import "./App.css";
import {
  getEntries,
  saveEntry,
  analyzeEntry,
  getInsights
} from "./api";

function App() {

  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [insights, setInsights] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = "123";

  const loadEntries = async () => {
    setInsights(null);
    setAnalysis(null);

    const res = await getEntries(userId);
    setEntries(res.data);
  };

  const save = async () => {

    if (!text.trim() || !analysis) return;

    await saveEntry({
      userId,
      text,
      analysis
    });

    setText("");
    setAnalysis(null);
    setEntries([]);

    setMessage("✅ Journal entry saved successfully");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const analyze = async () => {

    if (!text.trim()) {
      setMessage("⚠️ Please write a journal entry before analyzing.");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      return;
    }

    setEntries([]);
    setInsights(null);
    setLoading(true);
    setAnalysis(null);

    try {

      const res = await analyzeEntry(text);
      setAnalysis(res.data);

    } catch (err) {

      setMessage("❌ Analysis failed. Please try again.");

      setTimeout(() => setMessage(""), 3000);
    }

    setLoading(false);
  };

  const loadInsights = async () => {
    setEntries([]);
    setAnalysis(null);

    const res = await getInsights(userId);
    setInsights(res.data);
  };

  return (

    <div className="app-background">

      <div className="app-container">

        <h1>🌿 AI Journal</h1>

        <h3>✍️ Write Journal Entry</h3>

        <textarea
          className="journal-textarea"
          placeholder="Write about your experience during the session..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setAnalysis(null);
            setInsights(null);
          }}
        />

        <div className="char-counter">
          {text.length} characters
        </div>

        {message && (
          <div className="toast-message">
            {message}
          </div>
        )}

        <div className="button-row">

          <button
            className="button-primary"
            onClick={analyze}
          >
            🔍 Analyze
          </button>

          <button
            className="button-primary"
            onClick={save}
            disabled={!analysis}
          >
            💾 Save Entry
          </button>

          <button
            className="button-secondary"
            onClick={loadInsights}
          >
            📊 View Insights
          </button>

          <button
            className="button-secondary"
            onClick={loadEntries}
          >
            📜 View Previous Entries
          </button>

        </div>

        {(analysis || loading) && (

          <>
            <h2>🤖 AI Analysis</h2>

            <div className="card">

              {loading ? (

                <div className="loading">
                  ⏳ Analyzing your journal entry...
                </div>

              ) : (

                <div style={{ display: "grid", gap: "15px" }}>

                  <div>
                    <h4>😊 Emotion</h4>
                    <span className="tag-emotion">
                      {analysis.emotion}
                    </span>
                  </div>

                  <div>
                    <h4>🧠 Summary</h4>
                    <p>{analysis.summary}</p>
                  </div>

                  <div>
                    <h4>🔑 Keywords</h4>

                    <div className="keyword-row">
                      {analysis.keywords?.map(k => (
                        <span
                          key={k}
                          className="keyword"
                        >
                          {k}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>

              )}

            </div>
          </>

        )}

        {insights && (

          <>
            <h2>📊 User Insights</h2>

            <div className="insights-grid">

              <div className="card">
                <h4>📝 Total Entries</h4>
                <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                  {insights.totalEntries}
                </p>
              </div>

              <div className="card">
                <h4>😊 Top Emotion</h4>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {insights.topEmotion}
                </p>
              </div>

              <div className="card">
                <h4>🌿 Most Used Ambience</h4>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {insights.mostUsedAmbience}
                </p>
              </div>

            </div>

            <div className="card">

              <h4>🔑 Recent Keywords</h4>

              <div className="keyword-row">
                {insights.recentKeywords?.map(k => (
                  <span
                    key={k}
                    className="keyword"
                  >
                    {k}
                  </span>
                ))}
              </div>

            </div>

          </>
        )}

        {entries.length > 0 && (

          <>
            <h2>📜 Previous Journal Entries</h2>

            <div className="entries-grid">

              {entries.map(e => (

                <div
                  key={e.id}
                  className="entry-card"
                >

                  <p className="entry-text">
                    {e.text}
                  </p>

                  <div className="tag-row">

                    <span className="tag-emotion">
                      😊 {e.emotion}
                    </span>

                    <span className="tag-ambience">
                      🌿 {e.ambience}
                    </span>

                  </div>

                  <small style={{ color: "#888" }}>
                    {new Date(e.createdAt).toLocaleString()}
                  </small>

                </div>

              ))}

            </div>

          </>
        )}

      </div>

    </div>

  );
}

export default App;