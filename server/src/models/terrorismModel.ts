import {IGlobalTerrorism } from "Terrorism";
import mongoose, { Schema, now } from "mongoose";



const TerrorismSchema = new Schema<IGlobalTerrorism>({
  eventid: { type: Number },
  iyear: { type: Number },
  imonth: { type: Number },
  iday: { type: Number },
  country_txt: { type: String },
  region_txt: { type: String },
  city: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  attacktype1_txt: { type: String },
  targtype1_txt: { type: String },
  target1: { type: String },
  gname: { type: String },
  weaptype1_txt: { type: String },
  nkill: { type: Number },
  nwound: { type: Number },
  nperps: { type: Number },
  summary: { type: String },
});

export default mongoose.model<IGlobalTerrorism>("Terrorism", TerrorismSchema);
