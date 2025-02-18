export default function Stats({ items }) {
  const numItems = items.length;

  if (numItems === 0) {
    return (
      <footer className="stats">
        📝 Start adding some items to your packing list
      </footer>
    );
  }

  const numPackedItems = items.filter((item) => item.packed).length;
  const percentPacked = (numPackedItems / numItems) * 100;
  const formattedPercentPacked = Math.round(percentPacked) || 0;

  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? "🎉 All Packed! Ready to go 🛩️"
          : `📸 You have ${numItems} items on your list, and you already packed ${numPackedItems} (${formattedPercentPacked}%)`}
      </em>
    </footer>
  );
}
