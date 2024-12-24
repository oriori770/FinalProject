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

//3,1
export interface IIncidentTrendsOnMonth{
    date: string; // month 
    incident: number;
}
//3,2
export interface IIncidentTrendsOnRangeOfYears{
    date: string; //year / month 
    incident: number;
}

export interface MapCoordinate {
    latitude: number; // Latitude (קו רוחב)
    longitude: number; // Longitude (קו אורך)
  }
export interface IBarData{
    label: string,
    data: number
}