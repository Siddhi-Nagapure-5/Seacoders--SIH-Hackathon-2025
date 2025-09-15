import React from 'react';
import AquaIntelHeader from '@/components/AquaIntelHeader';
import AIChat from '@/components/AIChat';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MessageSquare, Zap } from 'lucide-react';

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <AquaIntelHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <h1 className="text-4xl font-bold bg-ocean-gradient bg-clip-text text-transparent">
                AI Ocean Data Assistant
              </h1>
              <Badge variant="secondary" className="ml-2">
                <Mic className="h-3 w-3 mr-1" />
                Voice Enabled
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Ask me anything about ARGO float data, ocean conditions, and marine research
            </p>
            
            {/* Voice Features Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4 text-center">
                  <Mic className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Voice Input</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-300">Speak your questions naturally</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                <CardContent className="p-4 text-center">
                  <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Smart Chat</h3>
                  <p className="text-xs text-green-600 dark:text-green-300">AI understands ocean science</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200">Real-time Data</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-300">Live ARGO float insights</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <AIChat />
        </div>
      </main>
    </div>
  );
};

export default Chat;