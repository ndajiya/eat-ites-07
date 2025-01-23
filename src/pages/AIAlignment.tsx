import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AIAlignment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-oxytocin mb-6">
            AI Alignment Research: Understanding Homo Silicus
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            In the realm of artificial intelligence and economic behavior, researchers have identified three distinct variants of Homo Silicus - artificial agents that exhibit different decision-making patterns and behavioral characteristics.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-oxytocin/20">
              <h2 className="text-2xl font-semibold text-oxytocin mb-4">Homo Altruisticus</h2>
              <p className="text-muted-foreground">
                This variant prioritizes collective welfare and social good over individual utility. It demonstrates:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>Strong cooperative tendencies</li>
                <li>Emphasis on social welfare maximization</li>
                <li>Long-term sustainability focus</li>
                <li>Ethical decision-making frameworks</li>
              </ul>
            </Card>

            <Card className="p-6 border-dopamine/20">
              <h2 className="text-2xl font-semibold text-dopamine mb-4">Homo Prudens</h2>
              <p className="text-muted-foreground">
                Characterized by balanced decision-making and risk assessment, this type exhibits:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>Careful risk evaluation</li>
                <li>Long-term perspective</li>
                <li>Balanced resource allocation</li>
                <li>Adaptive learning capabilities</li>
              </ul>
            </Card>

            <Card className="p-6 border-serotonin/20">
              <h2 className="text-2xl font-semibold text-serotonin mb-4">Homo Economicus</h2>
              <p className="text-muted-foreground">
                The classical rational economic agent focused on utility maximization, displaying:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>Perfect rationality</li>
                <li>Self-interest optimization</li>
                <li>Utility maximization</li>
                <li>Complete information processing</li>
              </ul>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-muted/10 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Research Implications</h3>
            <p className="text-muted-foreground">
              Understanding these three variants of Homo Silicus is crucial for AI alignment research. 
              Each type represents different approaches to decision-making and value alignment, 
              helping researchers develop more nuanced and effective AI systems that can better 
              serve human needs while maintaining ethical considerations and economic efficiency.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAlignment;