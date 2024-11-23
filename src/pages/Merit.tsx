import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, Network, Puzzle, Atom, Brain, Target, ChartBar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ResearchArea {
  id: number
  title: string
  icon: JSX.Element
  focus: string
  work: string[]
}

const researchAreas: ResearchArea[] = [
  {
    id: 1,
    title: "Behavioral Economics and Decision-Making",
    icon: <Brain className="h-6 w-6" />,
    focus: "Developing models that better capture real-world behavior, including bounded rationality, heuristics, and biases.",
    work: [
      "Advances that quantitatively integrate psychological factors into economic models.",
      "Demonstrating the effectiveness of 'nudges' in influencing consumer or firm behavior on a global scale.",
      "Development of predictive models for seemingly irrational decisions."
    ]
  },
  {
    id: 2,
    title: "Market Design and Mechanism Design",
    icon: <Puzzle className="h-6 w-6" />,
    focus: "Creating efficient systems for resource allocation and matching markets.",
    work: [
      "Development of advanced matching algorithms for markets like organ donation, school admissions, or job allocation.",
      "Expanding mechanism design theory to incorporate considerations like fairness, privacy, or environmental impact.",
      "Integration of decentralized technologies, such as blockchain, into market design."
    ]
  },
  {
    id: 3,
    title: "Game Theory and Strategic Interaction",
    icon: <Target className="h-6 w-6" />,
    focus: "Understanding how individuals or firms behave in strategic settings.",
    work: [
      "Expanding applications of game theory to solve global problems, such as climate change or cybersecurity.",
      "Contributions to the understanding of cooperation and conflict resolution in repeated games.",
      "Innovative applications of game theory to digital markets and platforms."
    ]
  },
  {
    id: 4,
    title: "Empirical Industrial Organization",
    icon: <ChartBar className="h-6 w-6" />,
    focus: "Analysis of firm behavior, market power, and competition.",
    work: [
      "Novel empirical methods to measure market power and its effect on inequality or innovation.",
      "Research on how digital platforms reshape traditional market structures and competition.",
      "Insights into regulatory policies that balance innovation with competition in tech industries."
    ]
  },
  {
    id: 5,
    title: "Economics of Information",
    icon: <Network className="h-6 w-6" />,
    focus: "The role of information asymmetry in economic decisions and markets.",
    work: [
      "Extending theories of information asymmetry to online platforms, gig economies, or decentralized markets.",
      "Developing tools to measure and mitigate information asymmetries in financial markets or healthcare.",
      "Studying the implications of misinformation and fake news on economic decisions."
    ]
  },
  {
    id: 6,
    title: "Technological Change and Automation",
    icon: <Atom className="h-6 w-6" />,
    focus: "The impact of technology on labor markets, productivity, and inequality.",
    work: [
      "Economic models capturing the interaction of AI and human labor in dynamic markets.",
      "Solutions for optimizing economic outcomes in highly automated or digital economies.",
      "Studies on how technological change reshapes consumer preferences and business strategies."
    ]
  },
  {
    id: 7,
    title: "Environmental and Resource Economics",
    icon: <Book className="h-6 w-6" />,
    focus: "Microeconomic approaches to sustainability and resource management.",
    work: [
      "Innovative pricing mechanisms for carbon emissions or natural resources.",
      "Development of micro-level policies that incentivize green behavior across industries.",
      "Mechanisms to balance development with biodiversity conservation."
    ]
  },
  {
    id: 8,
    title: "Experiments and Data Science in Microeconomics",
    icon: <Users className="h-6 w-6" />,
    focus: "Using new methods to test and refine economic theories.",
    work: [
      "Designing field experiments that reshape our understanding of key economic principles.",
      "Leveraging big data and machine learning to model individual and firm behavior in unprecedented detail.",
      "Insights into how digitalization affects consumer and firm decision-making processes."
    ]
  }
]

const Merit = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Research Areas and Contributions</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
        The goal for these contributions is to deepen our understanding of individual decision-making, 
        market behavior, or mechanisms to solve economic problems.
      </p>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchAreas.map((area) => (
            <Card key={area.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {area.icon}
                  <CardTitle>{area.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Research Focus:</h3>
                    <p className="text-muted-foreground">{area.focus}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Work:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {area.work.map((item, index) => (
                        <li key={index} className="text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Merit