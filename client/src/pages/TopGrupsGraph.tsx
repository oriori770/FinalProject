import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import BarComp from '../components/BarComp/BarComp'
import { IBarData } from '../types/Terrorism';
import {fetchTopGroups } from "../services/Terrorism "
import { Mode } from '@mui/icons-material';

const TopGrupsGraph = () => {
    const [limit, setlimt] = useState<number>(1000);
    const [dataforBAr, setDataforBAr] = useState<IBarData[]>([])
    const [SpecificArea, setSpecificArea] = useState<string>('');
    const [area, setarea] = useState<string>('');
    const handleChange = (event: SelectChangeEvent) => {
        setSpecificArea(event.target.value as string);
    }
    const handleClick = async () =>{        
      const data = await fetchTopGroups({area,limit});      
      setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})));
    }
    
  return (
  <>
    <Box sx={{ display: 'flex' }}>
        <Box sx={{ minWidth:200, display: 'flex' }}>
          <FormControl  sx={{m:2, display: 'flex', flexDirection: 'row'}}>
            <InputLabel id="demo-simple-select-label">mode view</InputLabel>
            <Select sx={{minWidth: 200, marginRight: 3}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={SpecificArea}
              label="Age"
              onChange={handleChange}
              >
              <MenuItem value={"true"}>Specific area</MenuItem>
              <MenuItem value={"false"}> all area</MenuItem>
            </Select>
            <TextField id="outlined-basic" label="limit" onChange={(e) => setlimt(Number(e.target.value))} variant="outlined" type='number' sx={{marginRight: 2}}/>
            {SpecificArea === "true" &&<TextField id="outlined-basic" label="area" onChange={(e) => setarea(e.target.value)} variant="outlined" type='text' sx={{marginRight: 2}}/>}
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleClick} sx={{marginTop: 2, marginBottom: 2, minWidth: 120}}>send</Button>
      </Box>
      <BarComp datasets={dataforBAr} labelName={"the number of incidents is:"}/>
    </>
  )
}

export default TopGrupsGraph