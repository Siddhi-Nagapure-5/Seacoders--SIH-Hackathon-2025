import React from 'react';
import AquaIntelHeader from '@/components/AquaIntelHeader';
import AIChat from '@/components/AIChat';

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <AquaIntelHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent mb-4">
              AI Ocean Data Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              Ask me anything about ARGO float data, ocean conditions, and marine research
            </p>
          </div>
          <AIChat />
        </div>
      </main>
    </div>
  );
};

export default Chat;