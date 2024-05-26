
import AddHouseForm from '@/components/addhouse-form'
import Navbar from '@/components/navbar'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
const Addhouse = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  return (
    <div className='bg-black '>
      <Navbar/>
      <div className="text-2xl font-semibold flex justify-center  text-white pt-5">Add a New House</div>
      <div className='flex felx-row justify-center py-3'>
      <AddHouseForm/>
      </div>
    </div>
  )
}

export default Addhouse
