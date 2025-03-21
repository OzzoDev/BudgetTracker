export default function CustomXAxisTick({ x, y, payload, colorMap }) {
  const color = colorMap.find((map) => map.category === payload.value).color;

  return (
    <g transform={`translate(${x - 12},${y + 10})`}>
      <rect width={24} height={5} fill={color} />
    </g>
  );
}
