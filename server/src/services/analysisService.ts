import { log } from "node:console";
import Terrorism from "../models/terrorismModel";
import {IDeadliestAttackTypes, IhighestCasualtyRegions, IIncidentTrendsOnMonth, IIncidentTrendsOnRangeOfYears, IBarData} from "../types/analysisDTO"
// {
//     $match:{
//         gname: {
//             $ne: "Unknown"
//           }
//     } 
// },
export const findDeadliestAttackTypes = async (): Promise<IBarData[]> => {
    const result = await Terrorism.aggregate([
        {
            $group:{
                _id:"$attacktype1_txt",
                TotalCasualtiesount: { $sum: {$sum:[ "$nkill", "$nwound"] }},
            }
        },
        {
            $project: {
                label: "$_id",//atteckType
                data: "$TotalCasualtiesount",//TotalCasualtiesount
                _id: 0
            }
        },
        {
            $sort:{TotalCasualtiesount:-1}
        }
    ])    
    return result
};
export const findHighestCasualtyRegionsByArea = async (area: string): Promise<IhighestCasualtyRegions[]> => {
    const result = await Terrorism.aggregate([
        {
            $match: {
                region_txt: area
            }     
        },
        {
            $group:{
                _id:"$city",
                casualtiesPerIncident:{ $avg: {$sum:[ "$nkill", "$nwound"] }},
                latitude: { $first: "$latitude" },
                longitude: { $first: "$longitude" },
            }
        },
        {
            $project: {
                area: "$_id",
                mapCoordinates:{
                    latitude:"$latitude",
                    longitude:"$longitude"
                },
                casualtiesPerIncident: 1,
                _id: 0
            }
        },
        {
            $sort:{casualtiesPerIncident:-1}
        },
        {
            $limit: 5
        },
    ])
    return result
};
export const findHighestCasualtyRegions = async (): Promise<IhighestCasualtyRegions[]> => {
    const result = await Terrorism.aggregate([
        {
            $group:{
                _id:"$city",
                casualtiesPerIncident:{ $avg: {$sum:[ "$nkill", "$nwound"] }},
                latitude: { $first: "$latitude" },
                longitude: { $first: "$longitude" },
            }
        },
        {
            $project: {
                area: "$_id",
                mapCoordinates:{
                    latitude:"$latitude",
                    longitude:"$longitude"
                },
                casualtiesPerIncident: 1,
                _id: 0
            }
        },
        {
            $sort:{casualtiesPerIncident:-1}
        },
        {
            $limit: 5
        },
    ])
    return result
};

export const findIncidentTrendsOnYear = async (year: number): Promise<IIncidentTrendsOnMonth[]> => {    
    const result = await Terrorism.aggregate([
        {
            $match: {
                iyear: year
            }
        },
        {
            $group:{
                _id:"$imonth",
                incident: { $sum: 1 },
            }
        },
        {
            $project: {
                label: "$_id", //month
                data: "$incident",//incident
                _id: 0
            }
        },
        {
            $sort:{label:1}
        }
    ])    
    return result
    
};

export const findIncidentTrendsOnRngeOfYears = async (startYear: number, endYear: number): Promise<IBarData[]> => {
    const result = await Terrorism.aggregate([
        {
            $match: {
                iyear: { $gte: startYear, $lte: endYear }
            }
        },
        {
            $group:{
                _id:"$iyear",
                incident: { $sum: 1 },
            }
        },
        {
            $project: {
                label: "$_id",
                data: "$incident",
                _id: 0
            }
        },
        {
            $sort:{label:1}
        }
    ])
    return result
}
// const getHighestCasualtyRegions = async (region?: string): Promise<any[]> {
//     const matchStage: any = {};
//     if (region) {
//       matchStage.region_txt = region;
//     }

//     try {
//       const analysis = await Attack.aggregate([
//         { 
//           $match: matchStage 
//         },
//         {
//           $group: {
//             _id: {
//               region: "$region_txt",
//               city: "$city",
//               lat: "$latitude",
//               lng: "$longitude"
//             },
//             casualties: { 
//               $sum: { $add: ["$nkill", "$nwound"] } 
//             },
//             incidents: { $sum: 1 }
//           }
//         },
//         {
//           $group: {
//             _id: "$_id.region",
//             totalCasualties: { $sum: "$casualties" },
//             totalIncidents: { $sum: "$incidents" },
//             coordinates: {
//               $push: {
//                 lat: "$_id.lat",
//                 lng: "$_id.lng"
//               }
//             }
//           }
//         },
//         {
//           $project: {
//             _id: 0,
//             region: "$_id",
//             averageCasualties: {
//               $divide: ["$totalCasualties", "$totalIncidents"]
//             },
//             totalIncidents: 1,
//             coordinates: 1
//           }
//         },
//         { 
//           $sort: { 
//             averageCasualties: -1 
//           } 
//         }
//       ], {
//         allowDiskUse: true, 
//         hint: { region_txt: 1 } 
//       });

//       return analysis;
//     } catch (error) {
//       console.error('Error in getHighestCasualtyRegions:', error);
//       throw new Error('Failed to analyze casualty regions');
//     }
//   }      