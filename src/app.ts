import express from "express";
import cors from "cors";
import handleErrors from "./middlewares/handleError.middleware";
import questionRoute from "./routes/questions.route";
import usersRoute from "./routes/users.route";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/questions", questionRoute);

app.use("/users", usersRoute);

app.get("/health", (req, res) => {
    res.sendStatus(200);
});

app.use(handleErrors);

export default app;
