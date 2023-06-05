import { Timestamp } from "firebase/firestore";

export interface Book {
  id?: string;
  title?: string;
  authorUid?: string;
  authorName?: string;
  summary?: string;
  pages?: number;
  reviews?: Review[];
  category?: Category;

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

export type Category = "All" | "Fantasy";
