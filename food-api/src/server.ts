import express, { Router } from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
    /*     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] */
  })
);

app.use('/api', indexRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
