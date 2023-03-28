import { useState } from "react";

import { useAddNewBook } from "../hooks/useAddNewBook";

export default function BookForm() {
  const [newBook, setNewBook] = useState("");
  const [addBook, isLoading, error] = useAddNewBook();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newBook);
    await addBook(newBook);
    setNewBook("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input
          required
          type="text"
          onChange={(e) => setNewBook(e.target.value)}
          value={newBook}
        />
      </label>
      <button>Add</button>
    </form>
  );
}
