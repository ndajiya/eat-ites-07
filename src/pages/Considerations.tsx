import { Brain, BookOpen, Network, Atom, Users, Globe, ChartLine, ChartBar, Book, Leaf } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const considerations = [
  {
    title: "Behavioral Economics",
    icon: Brain,
    core: "Challenges the assumption of perfect rationality in neoclassical economics by incorporating insights from psychology and sociology.",
    features: [
      "Recognizes bounded rationality, where cognitive limitations affect decision-making.",
      "Explores heuristics (mental shortcuts) and biases (e.g., loss aversion, overconfidence).",
      "Studies phenomena like nudges, framing effects, and how people deviate from expected utility theory."
    ],
    figures: ["Daniel Kahneman", "Amos Tversky", "Richard Thaler"],
    applications: ["Explains consumer behavior, financial markets, and public policy design (e.g., default options in savings plans)."]
  },
  {
    title: "Institutional Economics",
    icon: BookOpen,
    core: "Emphasizes the role of institutions—social, legal, and political structures—in shaping economic behavior and outcomes.",
    features: [
      "Critiques neoclassical economics for ignoring the broader institutional context.",
      "Analyzes how institutions evolve and influence economic performance.",
      "Examines the role of power, norms, and historical contingencies."
    ],
    figures: ["Thorstein Veblen", "Douglass North", "Elinor Ostrom"],
    applications: ["Development economics, environmental policy, and corporate governance."]
  },
  {
    title: "Post-Keynesian Economics",
    icon: Network,
    core: "Expands upon John Maynard Keynes' ideas, focusing on uncertainty, money, and the dynamics of capitalist economies.",
    features: [
      "Rejects equilibrium-focused models; emphasizes disequilibrium and real-world complexities.",
      "Highlights the role of demand, uncertainty, and financial instability.",
      "Critiques the reliance on mathematical formalism in neoclassical models."
    ],
    figures: ["Joan Robinson", "Hyman Minsky", "Paul Davidson"],
    applications: ["Policies for managing economic crises, financial regulation, and unemployment."]
  },
  {
    title: "Complexity Economics",
    icon: Atom,
    core: "Treats the economy as a complex adaptive system, moving away from the equilibrium paradigm.",
    features: [
      "Models the economy as a network of interacting agents.",
      "Studies emergent phenomena, path dependency, and feedback loops.",
      "Uses computational tools like agent-based modeling and simulation."
    ],
    figures: ["Brian Arthur", "W. Brian Lane", "Eric Beinhocker"],
    applications: ["Analyzing financial crises, innovation diffusion, and systemic risks."]
  },
  {
    title: "Evolutionary Economics",
    icon: ChartLine,
    core: "Applies evolutionary principles, such as variation, selection, and adaptation, to economic processes.",
    features: [
      "Focuses on innovation, technological change, and competition over time.",
      "Rejects the static equilibrium framework.",
      "Studies how firms, industries, and economies evolve dynamically."
    ],
    figures: ["Joseph Schumpeter", "Richard Nelson", "Sidney Winter"],
    applications: ["Innovation policy, industrial dynamics, and economic development."]
  },
  {
    title: "Ecological Economics",
    icon: Leaf,
    core: "Examines the interdependence of economies and ecosystems, challenging neoclassical growth models.",
    features: [
      "Prioritizes sustainability and critiques the focus on infinite growth.",
      "Incorporates environmental constraints like resource limits and climate change.",
      "Promotes alternative measures of well-being (e.g., Genuine Progress Indicator)."
    ],
    figures: ["Nicholas Georgescu-Roegen", "Herman Daly"],
    applications: ["Environmental policy, renewable energy transitions, and circular economies."]
  },
  {
    title: "Neuroeconomics",
    icon: Brain,
    core: "Combines economics, neuroscience, and psychology to study how brain activity influences decision-making.",
    features: [
      "Uses tools like fMRI to analyze how people value options, assess risk, and make choices.",
      "Explores the neural basis of utility, trust, and cooperation.",
      "Seeks to refine behavioral models with biological insights."
    ],
    figures: [],
    applications: ["Understanding consumer preferences, addiction, and decision-making under stress."]
  },
  {
    title: "Feminist Economics",
    icon: Users,
    core: "Challenges traditional economic models by addressing gender biases and incorporating care work and unpaid labor.",
    features: [
      "Critiques the exclusion of gender and social dimensions from mainstream models.",
      "Emphasizes the importance of unpaid labor in sustaining economies.",
      "Advocates for policies that promote equity and inclusion."
    ],
    figures: ["Nancy Folbre", "Amartya Sen"],
    applications: ["Gender-sensitive economic policies, labor market reforms, and welfare analysis."]
  },
  {
    title: "Agent-Based Economics",
    icon: Network,
    core: "Focuses on modeling economies as systems of interacting agents rather than optimizing individuals.",
    features: [
      "Explores heterogeneity, bounded rationality, and emergent macroeconomic phenomena.",
      "Uses computational models to simulate decentralized interactions."
    ],
    figures: [],
    applications: ["Urban planning, financial market dynamics, and policy testing."]
  },
  {
    title: "Future Directions",
    icon: Globe,
    core: "Emerging trends and potential future developments in economic thought.",
    features: [
      "AI and Data-Driven Economics: Using machine learning and big data to analyze economic trends and predict behaviors.",
      "Sustainability-Centric Models: Focusing on long-term ecological and economic resilience.",
      "Global Inequality and Development: Addressing structural inequalities in a multipolar world economy.",
      "Integration of Ethical Frameworks: Embedding values like fairness and equity into economic models."
    ],
    figures: [],
    applications: []
  }
]

export default function Considerations() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="ghost" className="hover:bg-primary/10">
            ← Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Economic Considerations</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {considerations.map((item, index) => (
          <div
            key={index}
            className="glass-card p-6 space-y-4 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{item.core}</p>
            {item.features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.figures.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Key Figures:</h3>
                <p className="text-sm text-muted-foreground">{item.figures.join(", ")}</p>
              </div>
            )}
            {item.applications.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Applications:</h3>
                <p className="text-sm text-muted-foreground">{item.applications.join(" ")}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}