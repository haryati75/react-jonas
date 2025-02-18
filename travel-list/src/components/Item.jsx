export default function Item({
  item: { id, description, quantity, packed },
  onDeleteItem,
  onToggleItem,
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onToggleItem(id)}
      />
      &nbsp;
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button
        style={{ color: "red", fontSize: "3.5rem" }}
        onClick={() => onDeleteItem(id)}
      >
        &times;
      </button>
    </li>
  );
}
