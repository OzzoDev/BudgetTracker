export default function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, expense } = payload[0].payload;
    return (
      <div className="p-2 rounded-md bg-black">
        <p className="label">{`${name} has ${expense} expenses`}</p>
      </div>
    );
  }
  return null;
}
