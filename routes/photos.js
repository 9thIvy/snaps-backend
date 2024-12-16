import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.get("/", (_req, res) => {
  const buffer = fs.readFileSync("./data/photos.json");
  const photoData = JSON.parse(buffer); 

  res.json(photoData); 
});

router.get("/:id", (req, res) =>{
  const photoID = req.params.id;
  const buffer = fs.readFileSync("./data/photos.json");
  const photoData = JSON.parse(buffer); 
  const photo = photoData.find(element => element.id === photoID);

  if(!photo){
    return res.status(404).send("No photo matching that ID", photoID);
  }

  res.json(photo);
});

router.get("/:id/comments", (req, res) =>{
  const photoID = req.params.id;
  const buffer = fs.readFileSync("./data/photos.json");
  const photoData = JSON.parse(buffer); 
  const photo = photoData.find(element => element.id === photoID);
  
  if(!photo){
    return res.status(404).send("No photo matching that ID", photoID);
  }

  res.json(photo.comments);

});


router.post("/:id/comments", (req, res)=>{
  const photoID = req.params.id;
  const {name, comment} = req.body;
  const buffer = fs.readFileSync("./data/photos.json");
  const photoData = JSON.parse(buffer); 
  const photo = photoData.find(element => element.id === photoID);


  if(!name || !comment){
    return res.status(400).send("name and comment missing or malformed");
  }

  const newComment = {
    id: uuidv4(),
    name: name,
    comment: comment,
    timestamp: Date.now()
  };

  photo.comments.push(newComment);

  fs.writeFileSync("./data/photos.json", JSON.stringify(photoData,null,2));

  res.status(201).json(newComment);
});

export default router;