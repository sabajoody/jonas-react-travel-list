import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 3, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handelAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handelDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handelChangeStatus(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelAddItems} />
      <PackingList
        items={items}
        onDelete={handelDeleteItems}
        onStatusChange={handelChangeStatus}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> Far Away</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState(""); //controlled elements
  const [quantity, setQuantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" on onSubmit={handelSubmit}>
      <h3>what do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDelete, onStatusChange }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete, onStatusChange }) {
  return (
    <li>
      <input
        type="checkbox"
        // value={item.packed}
        onClick={() => onStatusChange(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button style={{ color: "red" }} onClick={() => onDelete(item.id)}>
        X
      </button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
