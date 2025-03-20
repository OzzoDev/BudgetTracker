export default function InfoCard({ headline, description, icon }) {
  return (
    <div className="flex flex-col gap-y-4 p-6 rounded-md min-w-[380px] lg:min-w-0 w-full h-full bg-slate-800">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-xl text-white font-medium">{headline}</p>
        </div>
        <div className="p-2 h-fit rounded-md bg-gray-900 bg-opacity-40">{icon}</div>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
