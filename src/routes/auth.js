import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    message: "Register endpoint works",
  });
});

export default router;
