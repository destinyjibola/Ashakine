interface EventDetailsProps {
  createdAt: string;
  updatedAt: string;
}

export default function EventDetails({ createdAt, updatedAt }: EventDetailsProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Event Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Created</p>
          <p className="text-white">{new Date(createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Last Updated</p>
          <p className="text-white">{new Date(updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}