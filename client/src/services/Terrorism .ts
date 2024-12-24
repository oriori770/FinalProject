import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URI;
import {IDeadliestAttackTypes, IhighestCasualtyRegions, ITopGroups, IGroupsByYear, IDeadliestRegions, IBarData} from "../types/Terrorism"
//1
export const fetchDeadliestAttackTypes = async (): Promise<IBarData[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/analysis/deadliest-attack-types`);        
        return response.data;
    } catch (error) {
        console.error("Error fetching IDeadliestAttackTypes:", error);
        return Promise.reject(error);
    }
}
//2
export const fetchHighestCasualtyRegions = async (area: string): Promise<IhighestCasualtyRegions[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/analysis/highest-casualty-regions`, {params: {area}}); 
        return response.data;
    } catch (error) {
        console.error("Error fetching IhighestCasualtyRegions:", error);
        return Promise.reject(error);
    }
}
//3
export const fetchIncidentTrends = async (startYear:number, endYear:number|null = null): Promise<IBarData[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/analysis/incident-trends`, {params: {startYear, endYear}});                
        return response.data;
    } catch (error) {
        console.error("Error fetching IIncidentTrends:", error);
        return Promise.reject(error);
    }
}
//4
export const fetchTopGroups = async ({area, limit}: {area: string, limit?: number}): Promise<ITopGroups[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/relationships/top-groups`, {params: {limit, area}});        
        return response.data;
    } catch (error) {
        console.error("Error fetching ITopGroups:", error);
        return Promise.reject(error);
    }
}
//5
export const fetchGroupsByYear = async (year: number, group: string): Promise<IBarData[]> => {
    try {
        console.log(year, group);
        const response = await axios.get(`${BASE_URL}/api/relationships/groups-by-year`, {params: {year, group}});        
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching IGroupsByYear:", error);
        return Promise.reject(error);
    }
}

//6
export const fetchDeadliestRegions = async (group: string): Promise<IDeadliestRegions[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/relationships/deadliest-regions`, {params:{group}});        
        return response.data;
    } catch (error) {
        console.error("Error fetching IDeadliestRegions:", error);
        return Promise.reject(error);
    }
}
