import React from 'react';
import { MessageSquare, Waves, Search, Settings, User, BarChart3, TrendingUp, ChevronDown, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AquaIntelHeader = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Waves className="h-8 w-8 text-primary animate-wave" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse-slow"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-ocean-gradient bg-clip-text text-transparent">
                  AquaIntel
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Ocean Data Discovery
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button 
              asChild 
              variant={isActive('/chat') ? "default" : "ghost"} 
              size="sm" 
              className={isActive('/chat') ? "bg-primary text-primary-foreground" : "text-foreground"}
            >
              <Link to="/chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Link>
            </Button>
            <Button 
              asChild 
              variant={isActive('/dashboard') ? "default" : "ghost"} 
              size="sm"
              className={isActive('/dashboard') ? "bg-primary text-primary-foreground" : "text-foreground"}
            >
              <Link to="/dashboard">
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button 
              asChild 
              variant={isActive('/visualizations') ? "default" : "ghost"} 
              size="sm"
              className={isActive('/visualizations') ? "bg-primary text-primary-foreground" : "text-foreground"}
            >
              <Link to="/visualizations">
                <Search className="h-4 w-4 mr-2" />
                Visualizations
              </Link>
            </Button>
            <Button 
              asChild 
              variant={isActive('/analytics') ? "default" : "ghost"} 
              size="sm"
              className={isActive('/analytics') ? "bg-primary text-primary-foreground" : "text-foreground"}
            >
              <Link to="/analytics">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              asChild 
              variant={isActive('/settings') ? "default" : "outline"} 
              size="sm"
              className={isActive('/settings') ? "bg-primary text-primary-foreground" : ""}
            >
              <Link to="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
            
            {/* User Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                  <User className="h-4 w-4 mr-2" />
                  Account
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Sign Up</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AquaIntelHeader;
