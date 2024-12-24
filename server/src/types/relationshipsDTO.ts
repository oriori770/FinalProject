//4
export interface ITopGroups {
    group: string;
    incidents: number;
    mapCoordinates: MapCoordinate;
}
//5.1
export interface IGroupsByYear {
    group: string;
    incidents: number;
}
//5.2
export interface IGroupsByYear2 {
    year: number;
    incidents: number;
}
//6
export interface IDeadliestRegions {
    group: string;
    mapCoordinates: MapCoordinate;
    TotalCasualtiesount: number;
}

export interface MapCoordinate {
    latitude: number; // Latitude (קו רוחב)
    longitude: number; // Longitude (קו אורך)
  }