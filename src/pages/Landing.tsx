import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-oxytocin">Economic</span>{" "}
            <span className="text-dopamine">Simulator</span>
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Experience real-time market dynamics, agent behavior, and economic patterns in this interactive simulation platform.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/simulator">
              <Button size="lg" className="group bg-dopamine hover:bg-dopamine/90">
                Launch Simulator
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="group border-oxytocin text-oxytocin hover:bg-oxytocin/10">
                <BookOpen className="mr-2 h-4 w-4" />
                Documentation
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 md:mt-24 grid md:grid-cols-3 gap-8"
        >
          <div className="glass-card p-6 space-y-3 border-oxytocin/20">
            <h3 className="text-xl font-semibold text-oxytocin">Agent Behavior</h3>
            <p className="text-muted-foreground">
              Watch how economic agents interact and adapt their strategies based on market conditions.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3 border-dopamine/20">
            <h3 className="text-xl font-semibold text-dopamine">Market Dynamics</h3>
            <p className="text-muted-foreground">
              Observe real-time price fluctuations and market trends across different commodities.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3 border-serotonin/20">
            <h3 className="text-xl font-semibold text-serotonin">Economic Patterns</h3>
            <p className="text-muted-foreground">
              Identify emerging patterns and cycles in the simulated economy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;