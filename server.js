import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from the server!");
})

app.get("/api/reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MANREGADashboard/1.0 (contact: patelakshit1225@gmail.com)',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
