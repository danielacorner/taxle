import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { ThemeToggle } from "./components/ThemeToggle";
import Index from "./pages/Index";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { initGA, trackPageView } from "./utils/analytics";

const queryClient = new QueryClient();

// Replace with your GA4 measurement ID
const GA_MEASUREMENT_ID = "G-5YFWS1K6GZ";

// Component to track page views
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    initGA(GA_MEASUREMENT_ID);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageViewTracker />
            <ThemeToggle />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game" element={<Game />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
