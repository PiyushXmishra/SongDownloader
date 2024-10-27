import express from "express";
import songRouter from "./songRoute"
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())

app.use("/api/download/",songRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
