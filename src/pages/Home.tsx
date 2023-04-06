import BookInfo from "../components/BookInfoRightSidebar/BookInfoRightSidebar";
import BookSection from "../components/BookSection/BookSection";
import ForYouSection from "../components/ForYouSection/ForYouSection";

/**
 * Home page
 */
export default function Home() {
  return (
    <>
      <BookInfo />
      <ForYouSection />
      <div style={{ marginRight: "20%", marginLeft: "10%" }}>
        <BookSection titleOfSection={"Week Of Modern Classics"} />
      </div>
    </>
  );
}
