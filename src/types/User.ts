import { Book } from "./Book";

export type User = {
  UID: string;
  name?: string;
  email?: string;
  imageId?: string;
  imageUrl?: string;
  favoriteBooks?: Book[];
};
