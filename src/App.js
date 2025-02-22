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
  function handelClearAll() {
    const confirmed = window.confirm("are you sure???");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelAddItems} />
      <PackingList
        items={items}
        onDelete={handelDeleteItems}
        onStatusChange={handelChangeStatus}
        onClearAll={handelClearAll}
      />
      <Stats items={items} />
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

function PackingList({ items, onDelete, onStatusChange, onClearAll }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onClearAll}>Clear all</button>
      </div>
    </div>
  );
}

function Item({ item, onDelete, onStatusChange }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed} //why?
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

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>start adding some items to your list...</em>
      </p>
    );
  }
  const numItems = items.length;
  //the wrong aproach :
  // const numPacked = [];
  // numPacked.push(items.packed);
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `you got everything to go :) `
          : `you have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
