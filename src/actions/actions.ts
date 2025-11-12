'use server';

import clientPromise from '@/lib/mongodb';
import type { Message } from '@/types';

const DB_NAME = process.env.DB_NAME || 'echovault';

export async function getMessages(roomId: string): Promise<Message[]> {
  if (!/^\d{6}$/.test(roomId)) {
    // Basic validation
    return [];
  }

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<Message>(roomId);

    const messages = await collection.find({}).sort({ createdAt: 1 }).toArray();

    // The data from MongoDB is not serializable as-is for client components.
    // We need to convert ObjectId and Date objects to strings.
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return [];
  }
}
