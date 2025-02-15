import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Logo - Taxonomic Tree */}
      <div className="mb-8 relative">
        <div className="grid grid-cols-3 gap-1">
          {/* Kingdom */}
          <div className="w-8 h-8 border-2 bg-[#538D4E] border-[#538D4E]" />
          {/* Connecting line */}
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-full h-0.5 bg-[#538D4E]" />
          </div>
          {/* Phylum */}
          <div className="w-8 h-8 border-2 bg-[#538D4E] border-[#538D4E]" />
          
          {/* Vertical connectors */}
          <div className="w-8 h-8 flex justify-center">
            <div className="w-0.5 h-full bg-[#B59F3B]" />
          </div>
          <div className="w-8 h-8" />
          <div className="w-8 h-8 flex justify-center">
            <div className="w-0.5 h-full bg-[#B59F3B]" />
          </div>
          
          {/* Class */}
          <div className="w-8 h-8 border-2 bg-[#B59F3B] border-[#B59F3B]" />
          {/* Connecting line */}
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-full h-0.5 bg-[#B59F3B]" />
          </div>
          {/* Order */}
          <div className="w-8 h-8 border-2 bg-[#B59F3B] border-[#B59F3B]" />
        </div>
        
        {/* Labels */}
        <div className="absolute -left-16 top-1 text-xs text-muted-foreground">Kingdom</div>
        <div className="absolute -right-14 top-1 text-xs text-muted-foreground">Phylum</div>
        <div className="absolute -left-12 bottom-1 text-xs text-muted-foreground">Class</div>
        <div className="absolute -right-12 bottom-1 text-xs text-muted-foreground">Order</div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">Taxle</h1>

      {/* Description */}
      <p className="text-xl text-center mb-12">
        Get 6 chances to guess a <em>genus species</em> name.
      </p>

      {/* Play Button */}
      <Button
        onClick={() => navigate("/game")}
        className="px-12 py-6 text-lg"
      >
        Play
      </Button>

      {/* Date */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          })}
        </p>
      </div>
    </div>
  );
};
