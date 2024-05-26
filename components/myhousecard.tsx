// "use client"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { HouseZodSchemaType } from "@/schemas";
// import Link from "next/link";

// const PropertyDisplayCard = ({ houseData }: { houseData: HouseZodSchemaType }) => {
//   const { _id, title, address, rent, bedrooms, bathrooms, images, description, type } = houseData;

//   const formatAddress = `${address.doorNo}, ${address.street}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <Card className="flex flex-col w-full max-w-2xl h-[24rem] md:flex-row shadow-lg rounded-lg overflow-hidden">
//         <div className="md:w-1/2 h-full relative">
//           <Image
//             src={images[0]}
//             alt="House image"
//             layout="fill"
//             objectFit="cover"
//             className="w-full h-full"
//           />
//         </div>
//         <div className="p-8 flex flex-col justify-between w-full md:w-1/2">
//           <div>
//             <CardHeader className="mb-4">
//               <CardTitle className="text-2xl font-bold">{title}</CardTitle>
//               <CardDescription className="text-gray-600">{formatAddress}</CardDescription>
//             </CardHeader>
//             <CardContent className="mb-4">
//               <p className="text-lg font-semibold text-gray-900">Rent: ₹{rent}</p>
//               <p>Type: {type}</p>
//               <p>Bedrooms: {bedrooms}</p>
//               <p>Bathrooms: {bathrooms}</p>
//             </CardContent>
//           </div>
//           <CardFooter className="flex justify-end">
//             <Link href={`/${_id}`}><Button className="bg-blue-500 text-white">Show the property project</Button></Link> 
//           </CardFooter>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default PropertyDisplayCard;
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HouseZodSchemaType } from "@/schemas";

const MyHouseCard = ({ houseData }: { houseData: HouseZodSchemaType }) => {
  console.log(houseData);
  const { title, images, address, rent, bedrooms, deposit, _id, amenities } =houseData;
  const fullAddress = `No. ${address.doorNo}, ${address.street}, ${address.area}, ${address.city}-${address.pincode}, ${address.state}`;
  const amenitiesList = amenities.split(",").map((item) => item.trim());
  const tags: string[] = [...amenitiesList, `${bedrooms}BHK`];

  return (
    <div className="flex justify-center mb-6 px-4 sm:px-0">
      <Link href={`/myhouse/${_id}/viewhouse`}>
        <Card className="w-full sm:w-80 shadow-md overflow-hidden rounded-xl border border-gray-600 my-card transition-all duration-300 transform hover:scale-105 bg-gray-900 text-white">
          <div className="relative w-full h-48 border-b border-gray-600">
            <Image
              src={images[0] || "/logo.jpg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div>
                <div className="text-lg font-semibold">Rent</div>
                <div className="text-md">₹{rent}</div>
              </div>
              <div>
                <div className="text-lg font-semibold">Deposit</div>
                <div className="text-md">₹{deposit}</div>
              </div>
            </div>
            <div className="font-bold text-lg truncate">{title}</div>
            <p className="text-sm truncate">{fullAddress}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} className="bg-white text-black hover:text-white">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default MyHouseCard;
