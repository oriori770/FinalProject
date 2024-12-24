import express from "express";
import { authRoutes } from "./authRoutes";
import {TerrorismRoutes} from "./TerrorismRoutes"

const mainRouter = express.Router();

mainRouter.use("/auth", authRoutes);
mainRouter.use("/api", TerrorismRoutes);

export { mainRouter };
