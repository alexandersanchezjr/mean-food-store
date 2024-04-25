import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes";
import 'dotenv/config';
import dbConnect from "./config/db.config";

dbConnect();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
    /*     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] */
  })
);

app.use(express.json());
app.use("/api", indexRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
