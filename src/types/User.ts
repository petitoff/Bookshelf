import { Book } from "./Book";

export type User = {
  UID: string;
  username?: string;
  email?: string;
  imageId?: string;
  imageUrl?: string;
  favoriteBooks?: Book[];
  readingListBooks?: Book[];
};
