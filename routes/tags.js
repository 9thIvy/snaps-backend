import express from "express";
import fs from "fs";
const router = express.Router();

router.get("/", (_req, res) => {
  const buffer = fs.readFileSync("./data/tags.json");
  const tagData = JSON.parse(buffer); 

  res.json(tagData); 
});

export default router;