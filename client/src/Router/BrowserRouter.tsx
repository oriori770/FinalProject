import { createBrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import Rgister from "../pages/Rgister.page";
import HomePage from "../pages/HomePage";
import DataPage from "../pages/DataPage";
import DeadliestAttackTypes from "../pages/DeadliestAttackTypes";
import HighestCasualtyRegions from "../pages/HighestCasualtyRegions";
import IncidentTrends from "../pages/IncidentTrends";
import TopGrupsGraph from "../pages/TopGrupsGraph";
import TopGrupsMap from "../pages/TopGrupsMap";
import GroupsByYear from "../pages/GroupsByYear";


const router = createBrowserRouter([
  {path: "/",element: (<NavBar><HomePage /></NavBar>)},
  {path: "/data",element: (<NavBar><DataPage /></NavBar>)},
  {path: "/1/a",element: (<NavBar><DeadliestAttackTypes /></NavBar>)},
  {path: "/2/b",element: (<NavBar><HighestCasualtyRegions /></NavBar>)},
  {path: "/3/b",element: (<NavBar><IncidentTrends /></NavBar>)},
  {path: "/4/bi",element: (<NavBar><TopGrupsGraph /></NavBar>)},
  {path: "/4/bii",element: (<NavBar><TopGrupsMap /></NavBar>)},
  {path: "/5/b",element: (<NavBar><GroupsByYear /></NavBar>)},
  {path: "/6/b",element: (<NavBar><TopGrupsMap /></NavBar>)},
]);
export default router;
