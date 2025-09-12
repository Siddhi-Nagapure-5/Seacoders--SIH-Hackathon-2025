import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Waves, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-gradient">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Waves className="h-10 w-10 text-primary animate-wave" />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-ocean-gradient bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Lost in the Ocean
          </h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for has drifted away like an ocean current. 
            Let's navigate you back to familiar waters.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.location.href = "/"}
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Return to FloatChat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
