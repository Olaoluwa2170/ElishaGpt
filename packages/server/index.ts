import dotenv from "dotenv";
import express from "express";
import router from "./route";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Server is running perfectly on Vercel 🚀");
});

const port = process.env.PORT || 8000;

// app.listen(port, () => {
//   console.log(`Server is running on port http://localhost:${port}`);
// });

export default app;

// layers
// controller
// service
// repository
// conversation.repository.ts
// chat.service.ts
// chat.controller.ts
