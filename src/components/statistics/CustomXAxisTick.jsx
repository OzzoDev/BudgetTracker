export default function CustomXAxisTick({ x, y, payload, colorMap }) {
  const color = colorMap.find((map) => map.category === payload.value).color;

  return (
    <g transform={`translate(${x},${y + 10})`}>
      <circle cx={0} cy={0} r={5} fill={color} />
    </g>
  );
}
