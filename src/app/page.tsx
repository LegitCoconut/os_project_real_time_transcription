import { Room } from '@/components/Room';
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Mic, Cpu, Radio, Webhook, Settings, MessageSquare, Clock } from 'lucide-react';

export default function Home() {

  const backendFeatures = [
    {
      icon: <Mic />,
      title: "Real-Time Transcription",
      description: "Captures audio directly from your microphone for live speech-to-text conversion.",
      badge: "Audio"
    },
    {
      icon: <Cpu />,
      title: "Whisper AI Integration",
      description: "Utilizes OpenAI's powerful Whisper model for highly accurate transcriptions.",
      badge: "AI"
    },
    {
      icon: <Webhook />,
      title: "API Communication",
      description: "Sends transcribed text to the EchoVault web interface in real-time.",
      badge: "Network"
    },
    {
      icon: <Settings />,
      title: "Configurable",
      description: "Allows you to set the API endpoint, Room ID, and select the Whisper model size.",
      badge: "Setup"
    }
  ];

  const frontendFeatures = [
    {
      icon: <Radio />,
      title: "Real-Time Updates",
      description: "Displays transcribed messages instantly using Server-Sent Events (SSE) without needing a refresh.",
      badge: "Live"
    },
    {
      icon: <MessageSquare />,
      title: "Room-Based Display",
      description: "Messages are organized into private rooms, showing only the transcriptions for your session.",
      badge: "UI/UX"
    },
    {
      icon: <Clock />,
      title: "Message Grouping",
      description: "Automatically groups messages sent within the same minute for better readability and context.",
      badge: "Feature"
    }
  ];


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-[95%] md:w-[80%] mx-auto flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <a className="flex items-center space-x-2" href="/">
              <Image 
                src="/EchoVault-min.png" 
                alt="EchoVault Logo" 
                width={32} 
                height={32} 
                className="rounded-sm"
              />
              <span className="font-bold">
                EchoVault
              </span>
            </a>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background text-foreground p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline">EchoVault</h1>
            <p className="text-muted-foreground mt-2">Real-time transcription and translation service</p>
          </header>

          <div className="mb-12">
            <Room />
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">Project Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Backend (Python Script)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {backendFeatures.map(feature => (
                      <div key={feature.title} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 text-accent">{feature.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                             <h3 className="font-semibold">{feature.title}</h3>
                            <Badge variant="secondary">{feature.badge}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Frontend (Web App)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {frontendFeatures.map(feature => (
                      <div key={feature.title} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 text-accent">{feature.icon}</div>
                        <div>
                           <div className="flex items-center gap-2">
                             <h3 className="font-semibold">{feature.title}</h3>
                            <Badge variant="secondary">{feature.badge}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
        <Toaster />
      </main>
    </>
  );
}
