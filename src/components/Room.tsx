'use client';

import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageList } from './MessageList';
import { Loader2, ArrowRight } from 'lucide-react';

export function Room() {
  const [roomIdInput, setRoomIdInput] = useState('');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleJoinRoom = () => {
    if (!/^\d{6}$/.test(roomIdInput)) {
      setError('Room ID must be exactly 6 digits.');
      return;
    }
    setError(null);
    startTransition(() => {
      setActiveRoom(roomIdInput);
    });
  };
  
  const handleLeaveRoom = () => {
    setActiveRoom(null);
    setRoomIdInput('');
    setError(null);
  }

  if (activeRoom) {
    return (
      <div>
        <Button variant="outline" onClick={handleLeaveRoom} className="mb-4">
          Leave Room
        </Button>
        <MessageList roomId={activeRoom} />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Join a Room</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <label htmlFor="roomId" className="text-sm font-medium text-muted-foreground">
              Enter 6-digit Room ID
            </label>
            <Input
              id="roomId"
              type="text"
              placeholder="e.g., 123456"
              value={roomIdInput}
              onChange={(e) => setRoomIdInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button
            onClick={handleJoinRoom}
            disabled={isPending || roomIdInput.length !== 6}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Join Room <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
