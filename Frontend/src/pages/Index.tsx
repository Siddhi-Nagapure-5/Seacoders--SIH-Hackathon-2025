import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Waves, 
  MessageSquare, 
  Database, 
  BarChart3, 
  Zap,
  Globe,
  Brain,
  Search,
  ArrowRight,
  Play
} from 'lucide-react';
import AquaIntelHeader from '@/components/AquaIntelHeader';
import OceanDataVisualization from '@/components/OceanDataVisualization';
import AIChat from '@/components/AIChat';
import BGCSensorsAnimation from '@/components/BGCSensorsAnimation';
import FloatingChatbot from '@/components/FloatingChatbot';
import oceanHeroImage from '@/assets/ocean-hero.jpg';

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

  return (
    <div className="min-h-screen bg-background">
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
            <Badge variant="outline" className="mb-6 bg-white/10 border-white/20 text-white">
              <Zap className="h-3 w-3 mr-2" />
              Powered by AI & RAG Technology
            </Badge>
            
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
                size="lg" 
                className="bg-primary hover:bg-primary-dark text-lg px-8 py-6"
                onClick={handleStartChatting}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Chatting with AI
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
                onClick={handleGetStarted}
              >
                <Globe className="h-5 w-5 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-surface-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Revolutionary Ocean Data Access
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AquaIntel transforms complex oceanographic data into accessible insights through AI-powered conversations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-0 shadow-ocean">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered RAG</h3>
                <p className="text-muted-foreground">
                  Advanced retrieval-augmented generation combines LLM intelligence with ARGO database knowledge
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-0 shadow-ocean">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <Database className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
                <p className="text-muted-foreground">
                  Live access to temperature, salinity, and current data from thousands of ARGO floats worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-0 shadow-ocean">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-data-warm/10 rounded-lg mb-4">
                  <BarChart3 className="h-6 w-6 text-data-warm" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Visualization</h3>
                <p className="text-muted-foreground">
                  Interactive maps, graphs, and profiles automatically generated based on your queries
                </p>
              </CardContent>
            </Card>
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
            <Badge variant="outline" className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
              <Waves className="h-3 w-3 mr-2" />
              Live Ocean Technology
            </Badge>
            
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
          
          <BGCSensorsAnimation />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mb-4">
                <Waves className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Autonomous Operation</h3>
              <p className="text-sm text-muted-foreground">
                Floats operate independently for 5-7 years, completing 10-day cycles
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4">
                <Database className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Multi-Parameter Sensing</h3>
              <p className="text-sm text-muted-foreground">
                Measures temperature, salinity, oxygen, pH, chlorophyll, and more
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/10 rounded-lg mb-4">
                <Globe className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">Global Coverage</h3>
              <p className="text-sm text-muted-foreground">
                3,800+ floats worldwide providing unprecedented ocean observations
              </p>
            </Card>
          </div>
          
          {/* CTA for BGC Section */}
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg px-12 py-6 shadow-xl"
            >
              <Globe className="h-5 w-5 mr-2" />
              Explore Interactive Ocean Data
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Click to access real-time ocean visualizations and interactive maps
            </p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Live Ocean Data Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time visualization and AI-powered analysis of global oceanographic data
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Data Visualizations - Takes 2 columns */}
            <div className="xl:col-span-2">
              <OceanDataVisualization />
            </div>
            
            {/* AI Chat Interface - Takes 1 column */}
            <div className="xl:col-span-1">
              <AIChat />
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Intelligent Architecture
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for researchers, policy makers, and the public with cutting-edge AI technology
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-surface-gradient border-0 shadow-deep">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Chat Interface</h3>
                    <p className="text-sm text-muted-foreground">Natural language queries</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                      <Brain className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">LLM + RAG</h3>
                    <p className="text-sm text-muted-foreground">AI understanding & retrieval</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-data-cool/10 rounded-full mb-4">
                      <Database className="h-8 w-8 text-data-cool" />
                    </div>
                    <h3 className="font-semibold mb-2">Vector + SQL DB</h3>
                    <p className="text-sm text-muted-foreground">Semantic & structured data</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-data-warm/10 rounded-full mb-4">
                      <BarChart3 className="h-8 w-8 text-data-warm" />
                    </div>
                    <h3 className="font-semibold mb-2">Visualization</h3>
                    <p className="text-sm text-muted-foreground">Interactive results</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ocean-gradient text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Explore Ocean Data?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Start your journey with AquaIntel and discover insights from the world's most comprehensive ocean monitoring network.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 bg-white text-blue-900 hover:bg-white/90"
              onClick={handleGetStarted}
            >
              <Globe className="h-5 w-5 mr-2" />
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
              onClick={handleExploreData}
            >
              <Search className="h-5 w-5 mr-2" />
              Explore Data Now
            </Button>
          </div>
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