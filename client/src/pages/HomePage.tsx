import  { useState } from 'react'
import MapComp from '../components/MapComp/MapComp'
import { IDeadliestRegions, IhighestCasualtyRegions, IPointOnMap, ITopGroups } from '../types/Terrorism'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import { fetchDeadliestRegions, fetchHighestCasualtyRegions, fetchTopGroups } from '../services/Terrorism ';
const HomePage = () => {
    const [dataForMap, setdataForMap] = useState<IPointOnMap[]>([])
    const [mode, setMode] = useState<string>('');
    const [limit, setlimit] = useState<number>(5);
    const [area, setArea] = useState<string>('');
    const [group, setGroup] = useState<string>('');
    
    const renderData = async() => {
        if(mode === "Top Groups"){
            const data = await fetchTopGroups({area,limit});
            setdataForMap(data.map((group:ITopGroups) => ({data:"group:" + group.group +
               " incidents:" + group.incidents,
                MapCoordinate: [group.mapCoordinates.latitude, group.mapCoordinates.longitude]})));

        }
        if(mode === "highest Casualty Regions"){
          //region_txt option
            const data = await fetchHighestCasualtyRegions(area);
            setdataForMap(data.map((region:IhighestCasualtyRegions) => ({data:"region:" +region.area + " casualties:" + region.casualtiesPerIncident, MapCoordinate: [region.mapCoordinates.latitude, region.mapCoordinates.longitude]})));
        }
        if(mode === "Deadliest Regions"){
          if(!group){
            window.alert("Please insert a group");
          }
            const data = await fetchDeadliestRegions(group);
            setdataForMap(data.map((region:IDeadliestRegions) => ({data:"group: " +region.group + " casualties:" + region.TotalCasualtiesount, MapCoordinate: [region.mapCoordinates.latitude, region.mapCoordinates.longitude]})));
        }

    }
    const handleChangeNumGroups = (event: SelectChangeEvent) => {
        setlimit(Number(event.target.value));
    }
    const handleChange = (event: SelectChangeEvent) => {
      setMode(event.target.value as string);
    };

  return (
    <>
    <Box sx={{ display: 'flex' , flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth sx={{m:2, display: 'flex', justifyContent: 'center' }}>
          <InputLabel id="demo-simple-select-label">mode view</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mode}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"highest Casualty Regions"}>highest Casualty Regions</MenuItem>
            <MenuItem value={"Top Groups"}>Top Groups</MenuItem>
            <MenuItem value={"Deadliest Regions"}>Deadliest Regions</MenuItem>
          </Select>
        </FormControl>
      </Box>
     {mode === "Top Groups" && <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{m:2, display: 'flex', justifyContent: 'center' }}>
        <InputLabel id="demo-simple-select-label">mode view</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit.toString()}
          label="Age"
          onChange={handleChangeNumGroups}
        >
          <MenuItem value={5}>5 Top Groups</MenuItem>
          <MenuItem value={100}>all Groups</MenuItem>
        </Select>
      </FormControl>
      <TextField id="standard-basic" label="Standard" variant="standard" onChange={(e) => setArea(e.target.value)} />
    </Box>
    }
    {mode === "highest Casualty Regions" && <Box sx={{ minWidth: 120 }}>
      <TextField id="standard-basic" label="area (optional = region_txt)" variant="standard" onChange={(e) => setArea(e.target.value)} />
    </Box>
    }
    {mode === "Deadliest Regions" && <Box sx={{ minWidth: 120 }}>
      <TextField id="standard-basic" label="group" variant="standard" onChange={(e) => setGroup(e.target.value)} />
    </Box>
    }
      <Button variant="contained" onClick={() => renderData()}>send</Button>
    </Box>


    <MapComp points={dataForMap}/>
    </>
  )
}

export default HomePage








