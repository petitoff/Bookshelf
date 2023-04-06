export interface Book {
  id?: string;
  title?: string;
  authorUid?: string;
  authorName?: string;
  imageId?: string;
  summary?: string;
  rating?: number;
}

export interface BookCollection {
  // [key: string]: Book[];
  forYouSection?: Book[];
  popularSection?: Book[];
  newSection?: Book[];
  weekOfModernClassics?: Book[];
}
