import useBookForm from "../../hooks/uiHooks/useBookForm";
import { Category } from "../../types/Book";
import styles from "./AddBookForm.module.scss";

interface Props {
  isAdmin: boolean;
  userId: string;
}

const BookForm = ({ isAdmin, userId }: Props) => {
  const {
    title,
    setTitle,
    authorName,
    setAuthorName,
    summary,
    setSummary,
    pages,
    setPages,
    setCoverImage,
    isLoading,
    handleSubmit,
    category,
    setCategory,
  } = useBookForm({ isAdmin, userId });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    // Allow only numeric characters (0-9) and control keys (Backspace, Delete, Arrow keys, etc.)
    if (!key.match(/[0-9]|Backspace|Delete|Arrow/)) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Author Name"
        required
      />
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Summary"
      />
      <input
        type="text"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Pages"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        <option value="All">All</option>
        <option value="Fantasy">Fantasy</option>
        {/* Add more categories here */}
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
