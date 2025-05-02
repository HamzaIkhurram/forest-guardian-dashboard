
import { LoraxLogo } from "@/components/LoraxLogo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lorax-mint to-white dark:from-lorax-green dark:to-black">
      <div className="max-w-2xl px-4 py-16 text-center">
        <div className="mb-8 flex justify-center">
          <LoraxLogo large />
        </div>
        
        <h1 className="mb-6 text-4xl font-bold">
          Who we are: <span className="text-lorax-green dark:text-lorax-mint">Lorax</span>
        </h1>
        
        <p className="mb-8 text-xl text-muted-foreground">
          Real-time acoustic intelligence for forest protection.
        </p>
        
        <div className="relative mb-12 mx-auto w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-lorax-green/20 animate-pulse"></div>
          <div className="absolute inset-2.5 rounded-full bg-lorax-green/40 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute inset-5 rounded-full bg-lorax-green/60 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <div className="flex justify-center">
          <Button
            size="lg"
            className="rounded-full bg-lorax-green hover:bg-lorax-lightGreen px-8 py-6 text-lg"
            onClick={() => navigate("/dashboard")}
          >
            Enter Dashboard
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-muted-foreground">
          Guardians of the Forest
        </p>
      </div>
    </div>
  );
}
