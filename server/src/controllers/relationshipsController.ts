import  { Request, Response } from "express";
import {findDeadliestRegions, findGroupsByYear ,findTopGroups,findTopGroupsInArea,findYearByGroup} from "../services/relationshipsService"
import { log } from "node:console";

export const getTopGroups = async (req: Request, res: Response):Promise<any> => {
    const {area, limit} = req.query
    let result:any;
    if(!area){
        if(limit){
            result = await findTopGroups(Number(limit));
        }
        else{            
             result = await findTopGroups();
        }
    }
    else if(limit){
         result = await findTopGroupsInArea(area as string,Number(limit));
    }
    else{   
         result = await findTopGroupsInArea(area as string);
    }
    if (!result) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(result);
};
export const getGroupsByYear = async (req: Request, res: Response) => {
    const {year, group} = req.query
    if (!year && !group) {
        res.status(400).json({ message: "year and area is missing" });
        return;
    }
    let result:any
    if (year && !group) {
        result = await findGroupsByYear(Number(year));
        }
    if(!year && group){
    result = await findYearByGroup(group as string);
    }
    // if(year && group){
    //     res.status(400).json({ message: "send only year or group" });
    // }

    if (!result) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(result);
};
//6
export const getDeadliestRegions = async (req: Request, res: Response) => {
    const {group}= req.query
    const result = await findDeadliestRegions(group as string);
    if (!result) {
        res.status(404).json({ message: "No data found" });
        return;
    }
    res.status(200).json(result);
};
