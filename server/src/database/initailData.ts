import fs from "fs";
import Terrorism from "../models/terrorismModel"; // המודל של המשתמש

async function loadInitialData() {
  // Read user data from a JSON file
  const threatData = JSON.parse(fs.readFileSync("./data/globalterrorismdb.json", "utf8"));

  if ((await Terrorism.countDocuments()) === 0) {
    await Terrorism.insertMany(threatData);
    console.log("Initial Terrorism have been added to the database.");
  } else {
  }
}

export default loadInitialData;
