import type { ObjectId } from 'mongodb';

export interface Message {
  _id: ObjectId;
  message: string;
  createdAt: Date;
}
