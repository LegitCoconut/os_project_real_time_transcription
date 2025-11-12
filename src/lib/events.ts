import { EventEmitter } from 'events';

// In a real production app, you'd want to use a more robust solution
// like Redis Pub/Sub, especially in a serverless environment.
// For a single-server instance, this EventEmitter is sufficient.
const sseEmitter = new EventEmitter();

export default sseEmitter;
