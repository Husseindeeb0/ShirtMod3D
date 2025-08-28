import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import hugfaceRoutes from "./routes/hugface.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/", hugfaceRoutes);

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
