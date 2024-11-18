import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SimulatorHeaderProps {
  onSimulate: () => void;
}

export const SimulatorHeader = ({ onSimulate }: SimulatorHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 px-4 sm:px-0"
    >
      <div className="text-center space-y-4">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Economic Simulator
          </h1>
        </Link>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Simulate market conditions and observe how agents react to changes in
          the economy.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onSimulate}
          size="lg"
          className="glass-card hover:bg-white/30 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg border-2 border-white/20 px-6 sm:px-8 py-4 sm:py-6 h-auto text-foreground"
        >
          <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Simulate Round
        </Button>
      </div>
    </motion.div>
  );
};