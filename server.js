import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Example: Replace with your real stats source
async function getStats() {
  const res = await fetch("https://discord-stats-api-1.onrender.com/stats");
  return res.json();
}

app.get("/", async (req, res) => {
  const stats = await getStats();
  const { totalExecutions = 0, uniqueUsers = 0, topGames = [] } = stats;

  const topGame = topGames[0]?.name || "N/A";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta property="og:title" content="Jack's GUI | Live Stats" />
      <meta property="og:description" content="Executions: ${totalExecutions} | Users: ${uniqueUsers} | Top Game: ${topGame}" />
      <meta property="og:image" content="https://notenoughjack.github.io/images/discord.png" />
      <meta property="og:url" content="https://notenoughjack.github.io/" />
      <meta property="og:type" content="website" />
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <p>Redirecting to main site...</p>
      <script>
        window.location.href = "https://notenoughjack.github.io";
      </script>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
