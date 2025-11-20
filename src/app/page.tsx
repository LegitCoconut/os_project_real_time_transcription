import { Room } from '@/components/Room';
import { Toaster } from "@/components/ui/toaster";
import Image from 'next/image';

export default function Home() {

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
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
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline">EchoVault</h1>
            <p className="text-muted-foreground mt-2">Real time transcription and translation service</p>
          </header>
          <Room />
        </div>
        <Toaster />
      </main>
    </>
  );
}
