import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config";
import { Book } from "../../types/Book";
import { User } from "../../types/User";
import { AppDispatch } from "../../store/store";
import { updateUser } from "../../store/slices/authSlice";
import { updateEmail } from "firebase/auth";

/** Function to fetch all books from Firestore */
export const getBooksFromFirestore = async (): Promise<Book[]> => {
  try {
    const booksRef = collection(db, "books");
    const snapshot = await getDocs(booksRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching books from Firestore");
  }
};

/**  Function to fetch a single book from Firestore based on its ID */
export const getBookFromFirestore = async (bookId: string): Promise<Book> => {
  const bookRef = doc(db, "books", bookId);
  try {
    const docSnap = await getDoc(bookRef);
    if (!docSnap.exists()) {
      throw new Error("Book not found!");
    }
    return { id: docSnap.id, ...docSnap.data() } as Book;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching book from Firestore");
  }
};

export const addBook = async (book: Book): Promise<string> => {
  try {
    const booksCollectionRef = collection(db, "books");
    const docRef = await addDoc(booksCollectionRef, book);
    console.log("New book added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding book: ", error);
    throw new Error("Error adding book to Firestore");
  }
};

export const updateUserPartial = async (
  dispatch: AppDispatch,
  UID: string,
  data: Partial<User>
) => {
  try {
    // Update user in Firestore
    dispatch(updateUser(data));
    await updateDoc(doc(db, "users", UID), data);

    // Update email in Firebase Authentication
    if (data.email) {
      const user = auth.currentUser;
      if (user) {
        await updateEmail(user, data.email);
      } else {
        throw new Error("User not found in Firebase Authentication");
      }
    }
  } catch (error: any) {
    throw new Error("Error updating user");
  }
};
export {}; // add an empty export statement to make it a module
