import  { useEffect, useState } from 'react'
import BarComp from "../components/BarComp/BarComp"
import { IBarData } from '../types/Terrorism';
import {fetchIncidentTrends,fetchDeadliestAttackTypes } from "../services/Terrorism "

const DataPage = () => {
    const [dataforBAr, setDataforBAr] = useState<IBarData[]>([])

    const Data = async () => {
        const data = await fetchDeadliestAttackTypes()
        setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})))
    }

  return (
    <>
    <button onClick={() => Data()}>Refresh</button>
        <div>DataPage</div>
        <BarComp datasets={dataforBAr} labelName="DeadliestAttackTypes"/>

    </>
  )
}

export default DataPage