import { Timestamp } from "firebase/firestore";

export interface Book {
  id?: string;
  title?: string;
  authorUid?: string;
  authorName?: string;
  summary?: string;
  pages?: number;
  reviews?: Review[];
  category?: BookCategory;

  imageId?: string;
  imageUrl?: string;

  addedBy?: string;
  createdAt?: Timestamp | Date;
}

export interface Review {
  UID: string;
  username: string;
  rating: number;
  content: string;
}

export enum BookCategory {
  All = "All",
  Crime = "Crime",
  Fantasy = "Fantasy",
  ForChildren = "For children",
  Horror = "Horror",
  Romance = "Romance",
  Technology = "Technology",
}

export const CATEGORIES: BookCategory[] = [
  BookCategory.All,
  BookCategory.Crime,
  BookCategory.Fantasy,
  BookCategory.ForChildren,
  BookCategory.Horror,
  BookCategory.Romance,
  BookCategory.Technology,
];
