import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import House from "@/models/house";
import User from "@/models/user";
import { connectDB } from "@/lib/connectDB";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { deleteHouseAction } from "@/actions/delete";
import { Pencil, Trash2 } from "lucide-react";

export default async function HouseDisplayScreen({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  await connectDB();
  const propertyData = await House.findById({
    _id: id,
  });
  if (!propertyData) {
    redirect("/myhouse");
  }
  const {
    title,
    images,
    rent,
    bedrooms,
    deposit,
    address,
    bathrooms,
    type,
    creatoremail,
    amenities,
    _id,
  } = propertyData;
  const userData = await User.find({
    email: creatoremail,
  });
  const customerData = await User.find({
    // email: session.user.email,
  });
  const amenitiesList = amenities.split(",").map((item: string) => item.trim());
  const user = JSON.stringify(userData);
  const customer = JSON.stringify(customerData);
  const FullAddress =
    "No." +
    address.doorNo +
    ", " +
    address.street +
    ", " +
    address.area +
    ", " +
    address.city +
    "-" +
    address.pincode +
    ", " +
    address.state;

  const handleDelete = async () => {
    "use server";
    try {
      var res = await deleteHouseAction(id);
      toast.success("Deleted Successfully");
      redirect("/myhouse");
      
    } catch (error) {
      toast.error("Error deleting property");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="w-[95%] md:w-[85%] lg:w-[70%] my-10 py-1">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {images?.map((item: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="p-2 sm:p-4 md:p-6 lg:p-8"
                >
                  <Image
                    src={item}
                    width={450}
                    height={450}
                    alt="House Image"
                    className="w-full object-cover md:h-[300px] lg:h-[350px]" // Add custom height for medium and large screens
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex justify-around space-x-2 md:space-x-5 mb-4">
          <div>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
              <Link href={`/myhouse/${id}/editmyhouse`}>
                <Pencil />
              </Link>
            </Button>
          </div>
          <div>
            <form action={handleDelete}>
              <Button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Trash2 />
              </Button>
            </form>
          </div>
        </div>
        <div className="w-full flex justify-center items-center px-4">
          <div className="flex flex-col md:flex-row w-full md:w-[90%] space-y-4 md:space-y-0 md:space-x-4 border border-gray-700 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col md:flex-row md:justify-between w-full">
              <div className="flex flex-col md:w-[50%] py-2 md:py-3 justify-start items-center md:items-start">
                <div className="text-lg">{title}</div>
                <div className="text-lg">{FullAddress}</div>
              </div>
              <div className="flex flex-col md:w-[50%] py-2 md:py-3 md:px-3 lg:pl-24 justify-start items-center md:items-start">
                <div className="text-lg">₹ Rent</div>
                <div className="text-lg text-indigo-400">{rent}</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between w-full">
              <div className="flex flex-col md:w-[50%] py-2 md:py-3 justify-start items-center md:items-start">
                <div className="text-lg">Number of Bedrooms</div>
                <div className="text-lg">{bedrooms}</div>
              </div>
              <div className="flex flex-col md:w-[50%] py-2 md:py-3 justify-start items-center md:items-start">
                <div className="text-lg">₹ Deposit</div>
                <div className="text-lg text-indigo-400">{deposit}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[95%] md:w-[85%] lg:w-[70%] my-10 py-1">
          <div>
            <div className="flex flex-col md:flex-row w-full md:space-x-4">
              <div className="flex flex-col md:w-[50%] py-2 md:py-5 items-start">
                <div className="flex items-center">
                  <div className="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-house-door"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <div className="text-lg">House Type</div>
                    <div className="text-md">{type}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:w-[50%] py-2 md:py-5 items-start md:items-end">
                <div className="flex items-center">
                  <div className="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <div className="text-lg">Location</div>
                    <div className="text-md">{FullAddress}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full md:space-x-4">
              <div className="flex flex-col md:w-[50%] py-2 md:py-5 items-start">
                <div className="flex items-center">
                  <div className="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-badge-ad"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.83 6.828a2 2 0 1 0 2.828 2.828l.708.707a2 2 0 0 0 2.828 0l1.172-1.172a2 2 0 0 0 0-2.828L8.828 2.1A2 2 0 0 0 6 2a2 2 0 0 0-.707 3.414L6 6a2 2 0 0 0 2.828 0L8.828 4.5 7.5 3.172A2 2 0 0 0 5.9 5.9L4.172 4.172a2 2 0 1 0 0 2.828L3.464 6l.708.828a2 2 0 0 0 0 2.828L4.828 8 6 9.172a2 2 0 1 0 2.828 0l1.172-1.172a2 2 0 0 0 0-2.828L8.828 2.1A2 2 0 0 0 6 2a2 2 0 0 0-.707 3.414L6 6a2 2 0 0 0 2.828 0L8.828 4.5 7.5 3.172A2 2 0 0 0 5.9 5.9L4.172 4.172a2 2 0 1 0 0 2.828L3.464 6l.708.828z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <div className="text-lg">Amenities</div>
                    <div className="text-md">{amenitiesList.join(", ")}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:w-[50%] py-2 md:py-5 items-start md:items-end">
                <div className="flex items-center">
                  <div className="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-badge-ad"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.83 6.828a2 2 0 1 0 2.828 2.828l.708.707a2 2 0 0 0 2.828 0l1.172-1.172a2 2 0 0 0 0-2.828L8.828 2.1A2 2 0 0 0 6 2a2 2 0 0 0-.707 3.414L6 6a2 2 0 0 0 2.828 0L8.828 4.5 7.5 3.172A2 2 0 0 0 5.9 5.9L4.172 4.172a2 2 0 1 0 0 2.828L3.464 6l.708.828a2 2 0 0 0 0 2.828L4.828 8 6 9.172a2 2 0 1 0 2.828 0l1.172-1.172a2 2 0 0 0 0-2.828L8.828 2.1A2 2 0 0 0 6 2a2 2 0 0 0-.707 3.414L6 6a2 2 0 0 0 2.828 0L8.828 4.5 7.5 3.172A2 2 0 0 0 5.9 5.9L4.172 4.172a2 2 0 1 0 0 2.828L3.464 6l.708.828z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2 md:pr-72">
                    <div className="text-lg">Number of Bathrooms</div>
                    <div className="text-md">{bathrooms}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    </div>
  );
}
