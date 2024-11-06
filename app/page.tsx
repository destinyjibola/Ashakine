
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";


const font = Poppins({
  subsets:["latin"],
  weight:["600"]
})

export default function Home() {
  return (
    <div>
      <h2>Home page</h2>
    </div>
 );
}
