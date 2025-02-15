import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-1">
          {Array(9).fill(0).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 border-2 ${
                i === 4 ? "bg-[#538D4E] border-[#538D4E]" : // Center square green
                i === 3 ? "bg-[#B59F3B] border-[#B59F3B]" : // Left-middle square yellow
                "border-[#3A3A3C]"
              }`}
            />
          ))}
        </div>
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
