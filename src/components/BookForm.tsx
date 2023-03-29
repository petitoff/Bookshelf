import { useState } from "react";

import { useAddNewBook } from "../hooks/useAddNewBook";

export default function BookForm() {
  const [newBook, setNewBook] = useState<string>("");
  const { addBook } = useAddNewBook();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addBook && typeof addBook === "function") {
      await addBook(newBook);
      handleResetForm();
    } else {
      console.error("addBook is not a function or is undefined");
    }
  };

  const handleResetForm = () => {
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
