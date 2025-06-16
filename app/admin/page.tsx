import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p>Welcome to the admin dashboard!</p>
      </div>

      <Link href={"/admin/events"} >
        <Button className="mt-[1rem] bg-green-700 hover:bg-green-800">Create Spinwheel for events/promtions</Button>
      </Link>
    </div>
  );
}
