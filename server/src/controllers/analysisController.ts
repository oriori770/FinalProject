import  { Request, Response } from "express";
import {findDeadliestAttackTypes, findHighestCasualtyRegions, findHighestCasualtyRegionsByArea, findIncidentTrendsOnRngeOfYears, findIncidentTrendsOnYear} from "../services/analysisService"
import { IhighestCasualtyRegions } from "analysisDTO";

export const getDeadliestAttackTypes = async (req: Request, res: Response) => {
    const result = await findDeadliestAttackTypes();
    if (!result) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(result);
};
export const getHighestCasualtyRegions = async (req: Request, res: Response) => {
    const {area} = req.query
    let result:IhighestCasualtyRegions []
    if(!area){
        result = await findHighestCasualtyRegions();
    }
    else{
        result = await findHighestCasualtyRegionsByArea(area as string);
    }
    if (!result) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(result);
};
export const getIncidentTrends = async (req: Request, res: Response) => {
    const {startYear, endYear} = req.query
    if(!startYear&&!endYear){
        res.status(400).json({ message: "startYear or endYear is missing" });
        return;
    }
    if(!endYear || (startYear === endYear)){
    
    const result = await findIncidentTrendsOnYear(Number(startYear));
    if (!result) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(result);
}
else{
    const result = await findIncidentTrendsOnRngeOfYears(Number(startYear),Number(endYear));
    if (!result) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(result);
}
};
