import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchHighestCasualtyRegions } from '../services/Terrorism ';
import { IhighestCasualtyRegions, IPointOnMap } from '../types/Terrorism';
import MapComp from '../components/MapComp/MapComp';

const HighestCasualtyRegions = () => {
    const [area, setArea] = useState<string>('');
    const [dataForMap, setdataForMap] = useState<IPointOnMap[]>([])
    const renderData = async() => {
        const data = await fetchHighestCasualtyRegions(area);
        setdataForMap(data.map((region:IhighestCasualtyRegions) =>({data:"region:" +region.area + " casualties:" + region.casualtiesPerIncident, mapCoordinates: [region.mapCoordinates.latitude, region.mapCoordinates.longitude]})));
    }
    useEffect(() => {
        renderData();
    },[])
  return (
    <>
        <Box sx={{ minWidth: 120 }}>
            <TextField id="standard-basic" label="area (optional = region_txt)" variant="standard" onChange={(e) => setArea(e.target.value)} />
            <Button variant="contained" onClick={() => renderData()}>send</Button>
        </Box> 
        <MapComp points={dataForMap}/>
    </>
  )
}

export default HighestCasualtyRegions