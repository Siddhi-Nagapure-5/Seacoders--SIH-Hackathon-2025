import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Waves, 
  MessageSquare, 
  Globe,
  TrendingUp
} from 'lucide-react';
import AquaIntelHeader from '@/components/AquaIntelHeader';
import OceanEffects from '@/components/OceanEffects';
import FloatingChatbot from '@/components/FloatingChatbot';
import oceanHeroImage from '@/assets/ocean-hero.jpg';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import BGCSensorsAnimation from '@/components/BGCSensorsAnimation';

const Index = () => {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate('/chat');
  };

  const handleExploreData = () => {
    navigate('/chat');
  };

  const handleGetStarted = () => {
    navigate('/visualizations');
  };

  const handleGoToAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <OceanEffects />
      <AquaIntelHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={oceanHeroImage} 
            alt="ARGO Ocean Data Platform" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-deep-gradient/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
           
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              AquaIntel
              <span className="block text-3xl lg:text-5xl text-accent font-normal mt-2">
                AI-Powered Ocean Data Discovery
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Democratizing access to ARGO oceanographic data through conversational AI. 
              Ask questions in natural language and get instant insights from the world's ocean monitoring network.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="xl" 
                className="bg-primary hover:bg-primary-dark text-lg btn-biolume"
                onClick={handleStartChatting}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Chatting with AI
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg btn-biolume"
                onClick={handleGetStarted}
              >
                <Globe className="h-5 w-5 mr-2" />
                Get Started
              </Button>
            </div>
            <div className="mt-4 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
              <Button 
                size="xl" 
                variant="ocean"
                className=""
                onClick={handleGoToAnalytics}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      

      

      {/* BGC Sensors Process Animation */}
      <section className="py-20 bg-gradient-to-b from-surface-gradient to-muted/30 relative overflow-hidden">
        {/* Background Ocean Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-teal-400 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
           
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              BGC Sensors in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Watch the complete lifecycle of BGC-Argo floats as they collect biogeochemical data from the ocean depths. 
              These autonomous sensors provide critical insights into ocean health and climate change.
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Animation</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Interactive Controls</span>
              </div>
            </div>
          </div>
          
          {/* BGC-Argo Float Animation */}
          <BGCSensorsAnimation />

          {/* Interact: BGC‑Argo Float Video */}
          <Card className="overflow-hidden shadow-float mt-8">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                <video 
                  src="/argo-cycle.mp4" 
                  className="w-full h-full object-contain bg-black"
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  controls
                />
              </AspectRatio>
            </CardContent>
          </Card>

        </div>
      </section>

      

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Waves className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AquaIntel</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Ministry of Earth Sciences (MoES) • Indian National Centre for Ocean Information Services (INCOIS)
          </p>
          <p className="text-sm text-muted-foreground">
            Problem Statement ID: 25040 • Smart India Hackathon 2025
          </p>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
};

export default Index;