import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSearch(text.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
