import React from 'react';
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
import FloatChatHeader from '@/components/FloatChatHeader';
import OceanDataVisualization from '@/components/OceanDataVisualization';
import AIChat from '@/components/AIChat';
import oceanHeroImage from '@/assets/ocean-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatChatHeader />
      
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
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-lg px-8 py-6">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Chatting with AI
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
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
              FloatChat transforms complex oceanographic data into accessible insights through AI-powered conversations
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
            Start your journey with FloatChat and discover insights from the world's most comprehensive ocean monitoring network.
          </p>
          
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Search className="h-5 w-5 mr-2" />
            Explore Data Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Waves className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FloatChat</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Ministry of Earth Sciences (MoES) • Indian National Centre for Ocean Information Services (INCOIS)
          </p>
          <p className="text-sm text-muted-foreground">
            Problem Statement ID: 25040 • Smart India Hackathon 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;