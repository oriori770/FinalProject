//1
export interface IDeadliestAttackTypes{
    atteckType: string;
    TotalCasualtiesount: number;
}
//2
export interface IhighestCasualtyRegions{
    area: string;
    casualtiesPerIncident: number;
    mapCoordinates: MapCoordinate;
}

//3


//4
export interface ITopGroups{
    label: string;//group
    data: number;//incidents
    mapCoordinates: MapCoordinate;
}

//5
export interface IGroupsByYear{
    group: string;
    incident: number;
}

//6
export interface IDeadliestRegions{
    group: string;
    TotalCasualtiesount: number;
    mapCoordinates: MapCoordinate;
}



export interface MapCoordinate {
    latitude: number; // Latitude (קו רוחב)
    longitude: number; // Longitude (קו אורך)
  }
export interface ITerrorismState {
    error: string | null;
    isLoading: boolean;
    deadliestAttackTypes : IDeadliestAttackTypes[];
    highestCasualtyRegions : IhighestCasualtyRegions[];
    incidentTrends : any[];
    topGroups : ITopGroups[];
    groupsByYear : IGroupsByYear[];
    deadliestRegions : IDeadliestRegions[];
} 
export interface IPointOnMap{
    mapCoordinates: [number, number],
    data: string
}
export interface IBarData{
    label: string,
    data: number
}