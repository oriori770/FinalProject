import { useState } from 'react'
import BarComp from '../components/BarComp/BarComp'
import { IBarData } from '../types/Terrorism'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import {fetchGroupsByYear } from "../services/Terrorism "

const GroupsByYear = () => {
    const [dataforBAr, setDataforBAr] = useState<IBarData[]>([])
    const [mode, setMode] = useState<"group"| "year" | "">("");
    const [group, setGroup] = useState<string>('');
    const [year, setYear] = useState<number | null>(null);
    const handleChange = (event: SelectChangeEvent) => {
        setMode(event.target.value as "group"| "year");
        if(event.target.value == "group"){
            setYear(null);
        }else{
            setGroup('');
        }
        
    }
    const handleClick = async () =>{
        const data = await fetchGroupsByYear(year as number, group as string);
        setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})));
    }
  return (
    <>
        <Box sx={{ display: 'flex' }}>
        <Box sx={{ minWidth:200, display: 'flex' }}>
          <FormControl  sx={{m:2, display: 'flex', flexDirection: 'row'}}>
            <InputLabel id="demo-simple-select-label">{`filter by`}</InputLabel>
            <Select sx={{minWidth: 200, marginRight: 3}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mode}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"group"}>group</MenuItem>
              <MenuItem value={"year"}> years</MenuItem>
            </Select>
            {mode === "group" && <TextField id="outlined-basic" label={`insert group`} onChange={(e) => setGroup(e.target.value)} variant="outlined" type='text' sx={{marginRight: 2}}/>}
            {mode === "year" && <TextField id="outlined-basic" label={`insert years`} onChange={(e) => setYear(Number(e.target.value))} variant="outlined" type='number' sx={{marginRight: 2}}/>}
          </FormControl>
        </Box>
        {mode && (group || year) && <Button variant="contained" onClick={handleClick} sx={{marginTop: 2, marginBottom: 2, minWidth: 120}}>send</Button>}
        </Box>
        <BarComp datasets={dataforBAr} labelName={mode}/>
    </>
  )
}

export default GroupsByYear