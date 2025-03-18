export default function DefaultBtn({ type = "button", onClick, children }) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
}
