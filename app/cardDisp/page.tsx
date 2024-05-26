import React from 'react'
import House from '@/models/house'
import PropertyDisplayCard from '@/components/housecard'
import { connectDB } from '@/lib/connectDB'
import Filter from '@/components/Filter'
import Navbar from '@/components/navbar'
const CardDisp = async() => {
    await connectDB();
    const Data = await House.find()
  return (
    <div>
        <Navbar/>
    <div><Filter houseData={Data}/></div>
    </div>
  )
}

export default CardDisp