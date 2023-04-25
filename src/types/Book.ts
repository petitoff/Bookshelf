export interface Book {
  id?: string;
  title?: string;
  authorUid?: string;
  authorName?: string;
  summary?: string;
  pages?: number;
  ratings?: string[];
  reviews?: string[];

  imageId?: string;
}

export interface BookCollection {
  // [key: string]: Book[];
  forYouSection?: Book[];
  popularSection?: Book[];
  newSection?: Book[];
  weekOfModernClassics?: Book[];
}
