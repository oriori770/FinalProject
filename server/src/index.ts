import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/connection";
import loadInitialData from "./database/initailData";
import { mainRouter } from "./routes/mainRouter";
const PORT = process.env.PORT || 3040;

const app: Express = express();


const corsOptions = {
  origin: ['http://localhost:5173',"*"], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
};
app.use(cors(corsOptions));



app.use(express.json());
app.use(cookieParser());
app.use("/", mainRouter);

app.use("/", (req, res, next) => {
});


const startServer = async () => {
    await dbConnection();
    loadInitialData().catch(console.error);
    app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
};
startServer();
