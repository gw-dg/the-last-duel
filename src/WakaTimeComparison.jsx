import React, { useState } from "react";
import WakaTimeStats from "./WakaTimeStats"; // Ensure this is the correct path to WakaTimeStats

export default function WakaTimeComparison() {
  const [apiKey1, setApiKey1] = useState("");
  const [apiKey2, setApiKey2] = useState("");
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/compare-wakatime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey1, apiKey2 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setComparisonData(data);
    } catch (error) {
      setError(`Error comparing data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>WakaTime Comparison</h1>
      <form onSubmit={handleCompare}>
        <div>
          <label htmlFor="apiKey1">User 1 API Key:</label>
          <input
            id="apiKey1"
            type="text"
            value={apiKey1}
            onChange={(e) => setApiKey1(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="apiKey2">User 2 API Key:</label>
          <input
            id="apiKey2"
            type="text"
            value={apiKey2}
            onChange={(e) => setApiKey2(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Comparing..." : "Compare"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {comparisonData && (
        <div>
          <h2>Comparison Results</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3>User 1</h3>
              <WakaTimeStats data={comparisonData.user1} />
            </div>
            <div>
              <h3>User 2</h3>
              <WakaTimeStats data={comparisonData.user2} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
