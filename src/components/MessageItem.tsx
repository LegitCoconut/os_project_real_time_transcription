'use client';

import type { Message } from '@/types';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        // format is a client-side function
        setFormattedDate(format(new Date(message.createdAt), "MMM d, yyyy 'at' h:mm:ss a"));
    }, [message.createdAt]);

    return (
        <div className="flex flex-col items-start animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            <Card className="max-w-2xl bg-card/80 dark:bg-card/50">
                <CardContent className="p-3">
                    <p className="text-foreground">{message.text}</p>
                </CardContent>
            </Card>
            <span className="text-xs text-muted-foreground mt-1 ml-1">
                {formattedDate}
            </span>
        </div>
    );
}
