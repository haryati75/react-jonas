import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleDeleteItem(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  function handleToggleItem(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description.trim()) {
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 💗 trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <button>Sort By Packed Status</button>
        <button>Clear List</button>
      </div>
    </div>
  );
}

function Item({
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

function Stats({ items }) {
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
