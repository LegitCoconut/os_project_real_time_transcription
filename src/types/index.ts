import type { ObjectId } from 'mongodb';

export interface Message {
  _id: ObjectId;
  text: string;
  malayalam?: string;
  tamil?: string;
  telugu?: string;
  createdAt: Date;
}
