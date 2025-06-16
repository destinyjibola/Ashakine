import { useRouter } from "next/navigation";

export const EventHeader = ({ eventName }: { eventName: string }) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <button
        onClick={() => router.push("/admin/events")}
        className="text-gray-300 hover:text-white mr-4 transition-colors duration-200"
      >
        ← All Events
      </button>
      <h1 className="text-2xl font-bold text-white">{eventName}</h1>
    </div>
  );
};