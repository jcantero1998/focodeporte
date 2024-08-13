import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  content: string;
  created: Timestamp;
  updated: Timestamp;
}
