import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
