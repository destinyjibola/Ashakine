import { notFound } from 'next/navigation';
import Link from 'next/link';

type Prize = {
  id: string;
  name: string;
  value: string;
  quantity: number;
};

type Params = {
  params: {
    eventId: string;
  };
};

async function getEventPrizes(eventId: string): Promise<Prize[]> {
  const prizesByEvent: Record<string, Prize[]> = {
    techhub123355: [
      { id: 'prize1', name: 'MacBook Pro', value: '$1999', quantity: 1 },
      { id: 'prize2', name: 'AirPods Pro', value: '$249', quantity: 5 },
    ],
    designsummit2023: [
      { id: 'prize3', name: 'Wacom Tablet', value: '$499', quantity: 3 },
    ],
  };

  return prizesByEvent[eventId] || [];
}

export default async function EventPrizesPage({ params }: Params) {
  const prizes = await getEventPrizes(params.eventId);

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Event Prizes</h1>
        <div className="flex space-x-2">
          <Link
            href={`/admin/events/${params.eventId}`}
            className="text-gray-300 hover:text-white flex items-center"
          >
            ← Back to Event
          </Link>
          <Link
            href="/admin/events"
            className="text-gray-300 hover:text-white flex items-center"
          >
            ← All Events
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Prizes for Event</h2>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            Add New Prize
          </button>
        </div>

        {prizes.length === 0 ? (
          <p className="text-gray-400">No prizes found for this event.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prize Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {prizes.map((prize: Prize) => (
                  <tr key={prize.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{prize.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{prize.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{prize.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-yellow-400 hover:text-yellow-300">Edit</button>
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
