import express from "express";
import fs from "fs";
const router = express.Router();

router.get("/", (_req, res) => {
  const buffer = fs.readFileSync("./data/photos.json");
  const photoData = JSON.parse(buffer); 

  res.json(photoData); 
});


export default router;