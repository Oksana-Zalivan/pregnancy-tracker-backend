import express from "express";
import cors from "cors";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      message: "Backend is running",
    });
  });

  return app;
};
