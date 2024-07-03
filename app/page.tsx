import Sign from "@/components/Sign";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

const font = Poppins({
  subsets:["latin"],
  weight:["600"]
})

export default function Home() {
  return (
<main className="flex h-[100vh] flex-col items-center justify-center bg-gray-500">
    <div className="space-y-6 text-center">
      <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",font.className)}>🔐Auth</h1>
      <p className="text-white text-lg">
        A simple authentication service
      </p>
      <div>
       {/* <LoginButton> */}
       <LoginButton mode="modal" asChild >
       <Button variant="secondary" size="lg">
          Proceed
        </Button>
       </LoginButton>
      </div>
    </div>
   </main> );
}
