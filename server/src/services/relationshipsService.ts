import { log } from "node:console";
import Terrorism from "../models/terrorismModel";
import { ITopGroups, IGroupsByYear,IGroupsByYear2, IDeadliestRegions } from "../types/relationshipsDTO";

export const findTopGroupsInArea = async (area: string, limit?: number):Promise<ITopGroups[]> => {    
    const result = await Terrorism.aggregate([
        {
            $match: {
                region_txt: area
            }
        },
        {
            $group: {
                _id: "$gname",
                incidents: { $sum: 1 },
                latitude: { $first: "$latitude" },
                longitude: { $first: "$longitude" },
            }
        },
        {
            $project:{
                label: "$_id",
                mapCoordinates: {
                    latitude: "$latitude",
                    longitude: "$longitude"
                },
                data: "$incidents",
                _id: 0
            }
        },
        {
            $sort: {
                incidents: -1
            }
        },
        {
            $limit: limit || 1000
        }
    
    ]);
    return result
};
export const findTopGroups = async (limit?: number|null):Promise<ITopGroups[]> => {
    const result = await Terrorism.aggregate([
        {
            $group: {
                _id: "$gname",
                incidents: { $sum: 1 },
                latitude: { $first: "$latitude" },
                longitude: { $first: "$longitude" },
            }
        },
        {
            $project:{
                label: "$_id",
                mapCoordinates: {
                    latitude: "$latitude",
                    longitude: "$longitude"
                },
                data: "$incidents",
                _id: 0
            }
        },
        {
            $sort: {
                incidents: -1
            }
        },
        {
            $limit: limit || 1000
        }
    
    ]);
    return result
};

export const findGroupsByYear = async (year: number):Promise<IGroupsByYear[]> => {
    console.log(year);
    
    const result = await Terrorism.aggregate([
        {
            $match: {
                iyear: year
            }
        },
        {
            $group: {
                _id: "$gname",
                incidents: { $sum: 1 }
            }
        },
        {
            $project: {
                label: "$_id",
                data: "$incidents",
                _id: 0
            }
        }
    ]);
    return result
    
};
export const findYearByGroup = async (group: string):Promise<IGroupsByYear2[]> => {
    console.log(group);
    
    const result = await Terrorism.aggregate([
        {
            $match: {
                gname: group
            }
        },
        {
            $group: {
                _id: "$iyear",
                incidents: { $sum: 1 }
            }
        },
        {
            $project: {
                label: "$_id",
                data: "$incidents",
                _id: 0
            }
        }
    ]);
    return result
};
export const findDeadliestRegions = async (group: string):Promise<any> => {
    const result = await Terrorism.aggregate([
            {
              $match: {
                gname: {
                  $ne: "Unknown"
                }
              }
            },
            {
              $group: {
                _id: {
                  country: "$country_txt",
                  group: "$gname"
                },
                totalCasualties: {
                  $sum: {
                    $add: ["$nkill", "$nwound"]
                  }
                }
              }
            },
            {
              $sort: {
                "_id.country": 1,
                totalCasualties: -1
              }
            },
            {
              $group: {
                _id: "$_id.country",
                topOrganization: {
                  $first: "$_id.group"
                },
                totalCasualties: {
                  $first: "$totalCasualties"
                }
              }
            },
            {
              $project: {
                _id: 0,
                country: "$_id",
                organization: "$topOrganization",
                casualties: "$totalCasualties"
              }
            }
    ])
    return result
};