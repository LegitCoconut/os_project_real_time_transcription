import type { ObjectId } from 'mongodb';

export interface Message {
  _id: ObjectId;
  text: string;
  createdAt: Date;
}
