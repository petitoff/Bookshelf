import { useParams } from "react-router";

const DetailsBooks = () => {
  const { id } = useParams<{ id: string }>();

  return <div>DetailsBooks: {id}</div>;
};

export default DetailsBooks;
