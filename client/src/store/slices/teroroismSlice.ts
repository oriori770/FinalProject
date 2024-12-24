import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITerrorismState } from "../../types/Terrorism";
import {fetchDeadliestAttackTypes, fetchHighestCasualtyRegions, fetchIncidentTrends, fetchTopGroups, fetchGroupsByYear, fetchDeadliestRegions} from "../../services/Terrorism "
import { act } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URI;

const initialState: ITerrorismState = {
    isLoading: false,
    error: "",
    deadliestAttackTypes: [],
    highestCasualtyRegions: [],
    incidentTrends: [],
    topGroups: [],
    groupsByYear: [],
    deadliestRegions: []
};

export const FetchDeadliestAttackTypes = createAsyncThunk("terrorism/DeadliestAttackTypes",fetchDeadliestAttackTypes);
export const FetchHighestCasualtyRegions = createAsyncThunk("terrorism/HighestCasualtyRegions",fetchHighestCasualtyRegions);
export const FetchIncidentTrends = createAsyncThunk("terrorism/IncidentTrends",fetchIncidentTrends);
export const FetchTopGroups = createAsyncThunk("terrorism/TopGroups",fetchTopGroups);
export const FetchGroupsByYear = createAsyncThunk("terrorism/GroupsByYear",fetchGroupsByYear);
export const FetchDeadliestRegions = createAsyncThunk("terrorism/DeadliestRegions",fetchDeadliestRegions);


const terrorismSlice = createSlice({
  name: "terrorism",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchDeadliestAttackTypes.fulfilled, (state:ITerrorismState, action) => {
        state.deadliestAttackTypes = action.payload;
        state.error = null;
      })
      .addCase(FetchDeadliestAttackTypes.rejected, (state:ITerrorismState, action) => {
        state.error = action.payload as string;
      })

      .addCase(FetchHighestCasualtyRegions.fulfilled, (state:ITerrorismState, action) => {
        state.highestCasualtyRegions = action.payload;
        state.error = null;
      })
      .addCase(FetchHighestCasualtyRegions.rejected, (state:ITerrorismState, action) => {
        state.error = action.payload as string;
      })

      .addCase(FetchIncidentTrends.fulfilled, (state:ITerrorismState, action) => {
        state.incidentTrends = action.payload;
      })
      .addCase(FetchIncidentTrends.rejected, (state:ITerrorismState, action: any) => {
        state.error = action.payload;
      })

      .addCase(FetchTopGroups.fulfilled, (state:ITerrorismState, action)=>{
        state.topGroups = action.payload
      })
      .addCase(FetchTopGroups.rejected,(state:ITerrorismState, action)=>{
        state.error = action.payload as string
      })
  },
});

export const {  } = terrorismSlice.actions;

export default terrorismSlice.reducer;
