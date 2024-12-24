import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'
import BarComp from '../components/BarComp/BarComp'
import { IBarData } from '../types/Terrorism'
import {fetchIncidentTrends } from "../services/Terrorism "
import NavBar from '../components/NavBar'
const currntYear = new Date().getFullYear();



const IncidentTrends = () => {
    const [dataforBAr, setDataforBAr] = useState<IBarData[]>([])
    const [mode, setMode] = useState<string>('');
    const [startYear, setStartYear] = useState<number>(0);
    const [endYear, setEndYear] = useState<number>(0);
    const [labelForinput, setlabelForinput] = useState<string>("")
    
    const handleChange = (event: SelectChangeEvent) => {
        setMode(event.target.value as string);
    }
    const handleClick = async () =>{
        if(mode === "range" && startYear && endYear){
          const data = await fetchIncidentTrends(startYear, endYear);             
          setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})));
        }
        if(mode === "5"){
          const data = await fetchIncidentTrends(currntYear - 5, currntYear);             
          setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})));
        }
        if(mode === "10"){
          const data = await fetchIncidentTrends(currntYear - 10, currntYear);             
          setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})));
         }
         if(mode === "1"&& startYear){
          const data = await fetchIncidentTrends(startYear, startYear);
          setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})));
         }
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
              value={mode}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"1"}>Specific year</MenuItem>
              <MenuItem value={"5"}> data for last 5 years</MenuItem>
              <MenuItem value={"10"}>data for last 10 years</MenuItem>
              <MenuItem value={"range"}>insert manually range</MenuItem>
            </Select>
            {(mode === "1" || mode === "range") &&<TextField id="outlined-basic" label={labelForinput} onChange={(e) => setStartYear(Number(e.target.value))} variant="outlined" type='number' sx={{marginRight: 2}}/>}
            {mode === "range" &&<TextField id="outlined-basic" label="end year" onChange={(e) => setEndYear(Number(e.target.value))} variant="outlined" type='number'  sx={{marginRight: 2}} />}
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleClick} sx={{marginTop: 2, marginBottom: 2, minWidth: 120}}>send</Button>
      </Box>
      <BarComp datasets={dataforBAr} labelName={"the number of incidents is:"}/>

    </>
  )
}

export default IncidentTrends