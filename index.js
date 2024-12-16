import express from "express";
import cors from "cors";
import "dotenv/config";
import tagRoutes from "./routes/tags.js";
import photoRoutes from "./routes/photos.js";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/tags", tagRoutes);
app.use("/photos", photoRoutes);

app.get("/", (req, res) => {
	res.status(404).send("No endpoint specified");
});

app.listen(PORT, () => {
	console.log(`Server running at ${process.env.BACKEND_URL}${PORT}`);
});

