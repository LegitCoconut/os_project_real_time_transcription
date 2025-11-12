import { Room } from '@/components/Room';
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline">EchoVault</h1>
          <p className="text-muted-foreground mt-2">Your real-time message transcription archive.</p>
        </header>
        <Room />
      </div>
      <Toaster />
    </main>
  );
}
