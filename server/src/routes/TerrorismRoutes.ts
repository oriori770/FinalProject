import express from "express";
import {getTopGroups, getGroupsByYear, getDeadliestRegions   } from "../controllers/relationshipsController";
import {getDeadliestAttackTypes, getHighestCasualtyRegions,getIncidentTrends   } from "../controllers/analysisController";
import { tryCatchHandler } from "../middleware/tryCatchHandler.middleware";


const router = express.Router();

router.get("/analysis/deadliest-attack-types/", tryCatchHandler(getDeadliestAttackTypes));//1
router.get("/analysis/highest-casualty-regions/", tryCatchHandler(getHighestCasualtyRegions));//2
router.get("/analysis/incident-trends/", tryCatchHandler(getIncidentTrends));//3


router.get("/relationships/top-groups/", tryCatchHandler(getTopGroups));
router.get("/relationships/groups-by-year/", tryCatchHandler(getGroupsByYear));
router.get("/relationships/deadliest-regions/", tryCatchHandler(getDeadliestRegions));



export { router as TerrorismRoutes };
