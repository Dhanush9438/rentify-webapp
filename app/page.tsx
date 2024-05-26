import { LoginButton } from "@/components/login-button";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { connectDB } from '@/lib/connectDB'
export default function Home() {
   await connectDB();
    const Data = await House.find()
  return (
    <div>
        <Navbar/>
    <div><Filter houseData={Data}/></div>
    </div>
  )
}
