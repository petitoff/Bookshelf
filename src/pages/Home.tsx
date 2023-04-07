import BookInfoRightSidebar from "../components/BookInfoRightSidebar/BookInfoRightSidebar";
import BookSection from "../components/BookSection/BookSection";
import ForYouSection from "../components/ForYouSection/ForYouSection";
import { useBooks } from "../hooks/useBooks";

/**
 * Home page
 */
export default function Home() {
  useBooks();

  return (
    <>
      <BookInfoRightSidebar />
      <ForYouSection />
      <div style={{ marginRight: "20%", marginLeft: "10%" }}>
        <BookSection titleOfSection={"Week Of Modern Classics"} />
      </div>
    </>
  );
}
