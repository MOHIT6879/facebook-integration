import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db/connect.js";
import facebookRoutes from "./routes/facebookRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/facebook", facebookRoutes);

initDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
