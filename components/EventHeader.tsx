interface EventHeaderProps {
  eventName: string;
  onBack: () => void;
}

export default function EventHeader({ eventName, onBack }: EventHeaderProps) {
  return (
    <div className="flex items-center">
      <button
        onClick={onBack}
        className="text-gray-300 hover:text-white mr-4 transition-colors duration-200"
      >
        ← All Events
      </button>
      <h1 className="text-2xl font-bold text-white">{eventName}</h1>
    </div>
  );
}