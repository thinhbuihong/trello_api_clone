import express from "express";
import session from "express-session";
import { COOKIE_NAME } from "./constants";
import { currentUser } from "./middlewares/currentUser";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { requireAuth } from "./middlewares/requireAuth";
import boardRouter from "./routes/boardRoute";
import cardRouter from "./routes/cardRoute";
import listRouter from "./routes/ListRoute";
import userRouter from "./routes/userRoute";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "asd",
    name: COOKIE_NAME,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  })
);

app.use((req, _res, next) => {
  req.url = req.url.replace("/trello", "");
  next();
});

app.use(currentUser);
app.use("/api/users", userRouter);
app.use("/api/boards", requireAuth, boardRouter);
app.use("/api/lists", requireAuth, listRouter);
app.use("/api/cards", requireAuth, cardRouter);
app.use("/hi", (_req, res) => {
  res.json("hello hi 3 4 5 6");
});

app.use("/", notFound);

app.use(errorHandler);

export default app;
