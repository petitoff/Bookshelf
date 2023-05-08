import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import {auth, db} from "../config";
import {Book} from "../../types/Book";
import {User} from "../../types/User";
import {updateEmail} from "firebase/auth";
import {toast} from "react-toastify";
import {successToast} from "../../utils/toastHelper";

/** Function to fetch all books from Firestore */
export const getBooksFromFirestore = async (): Promise<Book[]> => {
    try {
        const booksRef = collection(db, "books");
        const snapshot = await getDocs(booksRef);
        return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching books from Firestore");
    }
};

/**  Function to fetch a single book from Firestore based on its ID */
export const getBookByIdFromFirestore = async (bookId: string): Promise<Book | null> => {
    const bookRef = doc(db, "books", bookId);
    try {
        const docSnap = await getDoc(bookRef);
        if (!docSnap.exists()) {
            throw new Error("Book not found!");
        }
        return {id: docSnap.id, ...docSnap.data()} as Book;
    } catch (error) {
        console.error(error);
        return null;
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

export const updateUserInFirestore = async (
    UID: string,
    data: Partial<User>
) => {
    try {
        // Update user in Firestore
        await updateDoc(doc(db, "usernames", UID), data);
    } catch (error: any) {
        throw new Error("Error updating user");
    }
};

export const updateUserEmailInAuth = async (email: string) => {
    const user = auth.currentUser;
    if (user) {
        await updateEmail(user, email);
    } else {
        throw new Error("User not found in Firebase Authentication");
    }
}

export const addFavoriteBookId = async (UID: string, bookId: string) => {
    try {
        const userDocRef = doc(db, "usernames", UID);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) throw new Error("User does not exist");

        const userDocData = userDocSnap.data();

        if (!userDocData) throw new Error("User data is undefined");

        const favoriteBooksId = userDocData.favoriteBooksId || [];

        if (favoriteBooksId.includes(bookId)) {
            throw new Error("Book already in favorites");
        }

        favoriteBooksId.push(bookId);

        await updateDoc(userDocRef, {favoriteBooksId});

        toast.success("Book added to favorites");
    } catch (error: Error | any) {
        console.error(error);

        if (error.message === "Book already in favorites") {
            toast.warn("Book already in favorites");
        }
    }
};

export const removeFavoriteBookId = async (UID: string, bookId: string) => {
    try {
        const userDocRef = doc(db, "usernames", UID);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) throw new Error("User does not exist");

        const userDocData = userDocSnap.data();

        if (!userDocData) throw new Error("User data is undefined");

        const favoriteBooksId = userDocData.favoriteBooksId || [];

        if (!favoriteBooksId.includes(bookId)) {
            throw new Error("Book not in favorites");
        }

        const newFavoriteBooksId = favoriteBooksId.filter(
            (favoriteBookId: string) => favoriteBookId !== bookId
        );

        await updateDoc(userDocRef, {favoriteBooksId: newFavoriteBooksId});
        toast.success("Book removed from favorites");
        return {status: "success"};
    } catch (error: Error | any) {
        console.error(error);

        if (error.message === "Book not in favorites") {
            toast.warn("Book not in favorites");
        }

        return {status: "error"};
    }
};

export const addReadingListBookId = async (UID: string, bookId: string) => {
    try {
        const userDocRef = doc(db, "usernames", UID);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) throw new Error("User does not exist");

        const userDocData = userDocSnap.data();

        if (!userDocData) throw new Error("User data is undefined");

        const readingListBooksId = userDocData.readingListBooksId || [];

        if (readingListBooksId.includes(bookId)) {
            throw new Error("Book already in reading list");
        }

        readingListBooksId.push(bookId);

        await updateDoc(userDocRef, {readingListBooksId});
        successToast("Book added to reading list");
    } catch (error: Error | any) {
        console.error(error);

        if (error.message === "Book already in reading list") {
            toast.warn("Book already in reading list");
        }
    }
};

export const removeReadingListBookId = async (UID: string, bookId: string) => {
    try {
        const userDocRef = doc(db, "usernames", UID);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) throw new Error("User does not exist");

        const userDocData = userDocSnap.data();

        if (!userDocData) throw new Error("User data is undefined");

        const readingListBooksId = userDocData.readingListBooksId || [];

        if (!readingListBooksId.includes(bookId)) {
            throw new Error("Book not in reading list");
        }

        const newReadingListBooksId = readingListBooksId.filter(
            (readingListBookId: string) => readingListBookId !== bookId
        );

        await updateDoc(userDocRef, {readingListBooksId: newReadingListBooksId});
        successToast("Book removed from reading list");

        return {status: "success"};
    } catch (error: Error | any) {
        console.error(error);

        if (error.message === "Book not in reading list") {
            toast.warn("Book not in reading list");
        }

        return {status: "error"};
    }
};
