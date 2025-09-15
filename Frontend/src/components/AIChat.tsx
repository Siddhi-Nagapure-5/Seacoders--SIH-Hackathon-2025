import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Database,
  BarChart3,
  Mic,
  MicOff,
  Volume2,
  AlertCircle
} from 'lucide-react';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef<any>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm AquaIntel AI, your oceanographic data assistant. Ask me anything about ARGO float data, ocean temperatures, salinity levels, or data visualizations.",
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      content: "What's the average temperature in the Arabian Sea this month?",
      timestamp: '10:31 AM'
    },
    {
      id: 3,
      type: 'bot',
      content: "Based on the latest ARGO float data from 23 active sensors in the Arabian Sea, the average sea surface temperature this month is 28.4°C (±0.8°C). The data shows a slight warming trend compared to last month (+0.3°C). Would you like me to show you the temperature profile by depth or specific geographic regions?",
      timestamp: '10:31 AM',
      hasData: true
    }
  ]);

  // Initialize speech recognition
  useEffect(() => {
    // Check if SpeechRecognition is supported
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError('');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceError(`Voice recognition error: ${event.error}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      setVoiceError('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startVoiceInput = () => {
    if (!isSupported) {
      setVoiceError('Speech recognition not supported');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    setVoiceError('');
    try {
      recognitionRef.current?.start();
    } catch (error) {
      console.error('Failed to start voice recognition:', error);
      setVoiceError('Failed to start voice recognition');
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: generateAIResponse(message),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasData: Math.random() > 0.5
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "I've analyzed the ARGO float data for that region. The ocean currents show interesting patterns with temperature variations between 24-29°C at different depths.",
      "Based on the NetCDF data, I can provide detailed salinity measurements. The latest readings show values ranging from 35.1 to 36.2 PSU across the monitored area.",
      "The satellite and in-situ measurements indicate significant oceanographic activity. Let me break down the key findings from our vector database.",
      "Excellent question! The RAG engine has identified relevant data points from our PostgreSQL database. Here's what the analysis reveals..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const suggestedQueries = [
    "Show me temperature trends for the Bay of Bengal",
    "What's the salinity profile at 500m depth?", 
    "Compare ocean data from last year",
    "Visualize current patterns in the Indian Ocean"
  ];

  return (
    <Card className="bg-card border-0 shadow-deep h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="relative">
            <MessageSquare className="h-5 w-5 text-primary" />
            <Sparkles className="h-3 w-3 text-accent absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span>AquaIntel AI Assistant</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 min-h-64">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-surface-gradient'
                }`}>
                  {msg.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>
                
                <div className={`rounded-lg px-4 py-3 ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  {msg.hasData && msg.type === 'bot' && (
                    <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-border/50">
                      <Database className="h-3 w-3 text-accent" />
                      <span className="text-xs text-muted-foreground">Data retrieved from ARGO network</span>
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Queries */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Suggested queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => setMessage(query)}
              >
                {query}
              </Button>
            ))}
          </div>
        </div>

        {/* Voice Error Display */}
        {voiceError && (
          <div className="flex items-center space-x-2 p-2 bg-destructive/10 text-destructive rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{voiceError}</span>
          </div>
        )}

        {/* Voice Status */}
        {isListening && (
          <div className="flex items-center justify-center space-x-2 p-3 bg-primary/10 rounded-lg">
            <div className="animate-pulse flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Listening... Speak now</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="flex space-x-2">
          <div className="flex-1 flex space-x-2">
            <Input
              placeholder={isListening ? "Listening for your voice..." : "Ask about ocean data, ARGO floats, or speak using the microphone..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
              disabled={isListening}
            />
            <Button 
              onClick={startVoiceInput}
              size="sm"
              variant={isListening ? "destructive" : "outline"}
              className={`${isListening ? 'animate-pulse' : ''} ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isSupported}
              title={isSupported ? (isListening ? "Stop listening" : "Start voice input") : "Voice input not supported"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button 
            onClick={handleSendMessage}
            size="sm"
            className="bg-primary hover:bg-primary-dark"
            disabled={isListening}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Voice Input Tips */}
        {isSupported && (
          <div className="text-xs text-muted-foreground text-center">
            💡 Tip: Click the microphone button to speak your question, or type normally
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIChat;