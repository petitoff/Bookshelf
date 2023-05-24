export interface Book {
  id?: string;
  title?: string;
  authorUid?: string;
  authorName?: string;
  summary?: string;
  pages?: number;
  reviews?: Review[];

  imageId?: string;
  imageUrl?: string;
}

export interface Review {
  UID: string;
  username: string;
  rating: number;
  content: string;
}
