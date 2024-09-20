const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // This allows all origins, useful for development
app.use(express.json()); // To parse JSON bodies

// Function to fetch WakaTime data for a user based on API key
const getWakaTimeData = async (apiKey) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const startDate = sevenDaysAgo.toISOString().split("T")[0];
  const endDate = today.toISOString().split("T")[0];

  const apiUrl = `https://wakatime.com/api/v1/users/current/summaries?start=${startDate}&end=${endDate}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Wakatime data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Route to compare WakaTime data between two users
app.post("/compare-wakatime", async (req, res) => {
  const { apiKey1, apiKey2 } = req.body;

  // Validate if both API keys are provided
  if (!apiKey1 || !apiKey2) {
    return res.status(400).json({ error: "Both API keys are required" });
  }

  try {
    // Fetch data for both users simultaneously
    const [data1, data2] = await Promise.all([
      getWakaTimeData(apiKey1),
      getWakaTimeData(apiKey2),
    ]);

    // Send back the data in a structured format
    res.json({ user1: data1, user2: data2 });
  } catch (error) {
    console.error("Error in /compare-wakatime:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch WakaTime data", details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
