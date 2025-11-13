import type { ObjectId } from 'mongodb';

export interface Message {
  _id: ObjectId;
  message_en: string;
  message_hi?: string;
  createdAt: Date;
}
