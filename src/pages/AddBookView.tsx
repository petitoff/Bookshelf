import AddBookForm from "../components/AddBookForm/AddBookForm";
import { useAppSelector } from "../hooks/hooks";

const AddBookView = () => {
  const isAdmin = useAppSelector((state) => state.auth.user?.role === "admin");
  const userId = useAppSelector((state) => state.auth.user?.UID);

  if (!userId) {
    return null;
  }

  return <AddBookForm isAdmin={isAdmin} userId={userId} />;
};

export default AddBookView;
