import { Room } from '@/components/Room';
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Mic, Cpu, Radio, Webhook, Settings, MessageSquare, Clock, Users, Github, FileText, Blocks } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

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

  const posterImage = PlaceHolderImages.find(img => img.id === 'project-poster');


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-[95%] md:w-[80%] mx-auto flex h-14 items-center">
          <div className="mr-auto flex items-center">
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
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link href="#authors" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Users size={16} />
                  Authors
              </Link>
              <Link href="#features" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Blocks size={16} />
                  Features
              </Link>
              <Link href="https://github.com/LegitCoconut/os_project_real_time_transcription" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={16} />
                  Codebase
              </Link>
            </nav>
            <div className="h-6 border-l border-muted-foreground/50"></div>
            <Link href="https://malabarmatrix.site" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Image src="/malabar-matrix.png" alt="Malabar Matrix Logo" width={24} height={24} className="rounded-sm" />
                Malabar Matrix
            </Link>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto min-h-[calc(100vh-3.5rem)] p-4 sm:p-6 md:p-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline">EchoVault</h1>
            <p className="text-muted-foreground mt-2">Real-time transcription and translation service</p>
          </header>

          <div className="mb-12 w-full">
            <Room />
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-12">
            <section id="authors">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                    <Users />
                    Project Authors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <div className="space-y-2">
                         <h3 className="font-semibold text-lg text-muted-foreground">Built By</h3>
                         <div className="flex justify-center items-center gap-6">
                             <Link href="https://github.com/legitcoconut" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
                                <Github size={16}/> Adithyan P
                            </Link>
                             <Link href="https://github.com/RohitAnilKumar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
                                <Github size={16}/> Rohit Anil Kumar
                            </Link>
                         </div>
                    </div>
                     <div className="space-y-3">
                        <Link href="https://github.com/LegitCoconut/os_project_real_time_transcription" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-accent hover:underline">
                            <Github size={16}/> View Project on GitHub
                        </Link>
                         <Link href="/project_report.docx" download className="flex items-center justify-center gap-2 text-accent hover:underline">
                            <FileText size={16}/> Download Project Report
                        </Link>
                    </div>
                </CardContent>
              </Card>
            </section>

            <section id="features">
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
            
            <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">Project Poster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {posterImage && (
                       <Image
                        src={"/project_poster.png"}
                        alt={"project poster!"}
                        width={1280}
                        height={720}
                        className="rounded-lg shadow-md"
                        data-ai-hint={posterImage.imageHint}
                      />
                    )}
                  </CardContent>
                </Card>
            </section>
        </div>
        <Toaster />
      </main>
    </>
  );
}
