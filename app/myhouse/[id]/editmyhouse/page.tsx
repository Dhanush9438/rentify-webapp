
import House from "@/models/house";
import { HouseZodSchemaType } from "@/schemas";
import React from "react";

import { connectDB } from "@/lib/connectDB";
import EditHouseForm from "@/components/edithouse-form";
import Navbar from "@/components/navbar";

const EditProperty = async ({params} :{params: {id :string}}) => {
    const {id} = params; 
    console.log(id);

  await connectDB();
  const userData: HouseZodSchemaType | null = await House.findOne({
    _id: id,
  });
  return <div className="bg-black"><Navbar/>
  <div >
  <div className="text-2xl font-semibold flex justify-center py-3 text-white pt-5">Edit House Details</div>
  <EditHouseForm userData = {userData}/></div>;
  </div>
};

export default EditProperty;
