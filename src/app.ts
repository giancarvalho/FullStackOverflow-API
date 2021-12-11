import express from "express";
import cors from "cors";
import handleErrors from "./middlewares/handleError.middleware";
import questionRoute from "./routes/questions.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/questions", questionRoute);

app.get("/health", (req, res) => {
    res.sendStatus(200);
});

app.use(handleErrors);

export default app;
