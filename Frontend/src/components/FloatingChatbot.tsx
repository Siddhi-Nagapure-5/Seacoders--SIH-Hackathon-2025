import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mic, Sparkles, Waves } from 'lucide-react';

const FloatingChatbot: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Create pulsing effect every few seconds
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Chatbot Button */}
      <div className="relative">
        {/* Ocean Wave Background Animation */}
        <div className="absolute -inset-4 rounded-full opacity-30">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 animate-pulse"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute -inset-8 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 10}%`,
                top: `${10 + i * 15}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div 
                className="w-1 h-1 bg-cyan-300 rounded-full opacity-60"
                style={{
                  boxShadow: '0 0 4px rgba(34, 211, 238, 0.6)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Ripple Effect */}
        {(isHovered || isPulsing) && (
          <div className="absolute -inset-2">
            <div className="animate-ping w-full h-full rounded-full border-2 border-cyan-400 opacity-40"></div>
            <div className="animate-ping w-full h-full rounded-full border-2 border-blue-400 opacity-30" style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}

        {/* Chat Button */}
        <Button
          onClick={handleChatClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 
            bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600
            border-2 border-white/20 hover:border-white/40
            ${isHovered ? 'scale-110' : 'scale-100'}
            ${isPulsing ? 'animate-bounce' : ''}
          `}
        >
          <div className="relative">
            <MessageSquare className="h-6 w-6 text-white" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
        </Button>

        {/* Voice Feature Badge */}
        <div className="absolute -top-2 -left-2">
          <Badge variant="secondary" className="bg-green-500 text-white text-xs px-1.5 py-0.5 animate-pulse">
            <Mic className="h-2.5 w-2.5 mr-1" />
            Voice
          </Badge>
        </div>

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-4 animate-fade-in">
            <div className="bg-black/90 text-white px-4 py-2 rounded-lg shadow-xl text-sm whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>AI Ocean Assistant</span>
                <Mic className="h-3 w-3 text-green-400" />
              </div>
              <div className="text-xs text-gray-300 mt-1">
                Ask questions with voice or text
              </div>
              
              {/* Arrow pointing to button */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
            </div>
          </div>
        )}

        {/* Ocean Waves Around Button */}
        <div className="absolute -inset-6 pointer-events-none overflow-hidden rounded-full">
          <svg className="w-full h-full animate-spin-slow" style={{ animationDuration: '20s' }}>
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0.2)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0.2)" />
              </linearGradient>
            </defs>
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <circle
              cx="50%"
              cy="50%"
              r="60%"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              strokeDasharray="3 7"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Floating Indicator */}
        <div className="absolute -top-3 -right-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FloatingChatbot;
