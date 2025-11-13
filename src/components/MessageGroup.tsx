'use client';

import type { Message } from '@/types';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface MessageGroupProps {
  messages: Message[];
}

export function MessageGroup({ messages }: MessageGroupProps) {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        if (messages.length > 0) {
            setFormattedDate(format(new Date(messages[0].createdAt), "MMM d, yyyy 'at' h:mm a"));
        }
    }, [messages]);

    if (messages.length === 0) {
        return null;
    }
    
    return (
        <div className="flex flex-col items-start animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            <Card className="max-w-2xl bg-card/80 dark:bg-card/50">
                <CardContent className="p-3 space-y-2">
                    {messages.map((message, index) => (
                        <p key={index} className="text-foreground">
                            {message.message}
                        </p>
                    ))}
                </CardContent>
            </Card>
            <span className="text-xs text-muted-foreground mt-1 ml-1">
                {formattedDate}
            </span>
        </div>
    );
}
