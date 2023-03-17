import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
export const router = express.Router();

app.use("/express", Express);

router.get("/express", Express);


export function Express() {
    return "Hello, World!";
}