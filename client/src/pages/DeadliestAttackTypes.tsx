import React, { useEffect, useState } from 'react'
import { IBarData } from '../types/Terrorism'
import {fetchDeadliestAttackTypes } from "../services/Terrorism "
import BarComp from "../components/BarComp/BarComp"


const DeadliestAttackTypes = () => {
    const [dataforBAr, setDataforBAr] = useState<IBarData[]>([])
     const Data = async () => {
            const data = await fetchDeadliestAttackTypes()
            setDataforBAr(data.map(({label, data}: IBarData) => ({label, data})))
        }
    useEffect(() => {
      Data()
    },[])
    
  return (
    <>
    <div>DeadliestAttackTypes</div>
    <BarComp datasets={dataforBAr}/>
    </>
  )
}

export default DeadliestAttackTypes