import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Microscope } from "lucide-react"

export const PhDPlan = () => {
  return (
    <Card className="flex flex-col glass-card">
      <CardHeader>
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-dopamine/10 mb-4">
          <Microscope className="h-6 w-6 text-dopamine" />
        </div>
        <CardTitle className="text-2xl">PhD</CardTitle>
        <CardDescription>For advanced research institutions</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mt-4 text-4xl font-bold">$250,000+<span className="text-base font-normal text-muted-foreground">/year</span></div>
        <p className="mt-2 text-sm text-muted-foreground">Custom pricing based on needs</p>
        <p className="mt-6 mb-3 text-sm text-muted-foreground">Everything in previous packages plus:</p>
        <ul className="space-y-3">
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Scale up to 10,000+ concurrent agents
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Integration with supercomputing clusters
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Advanced AI & ML capabilities
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Custom research modules
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Real-time collaboration across institutions
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Integration with MATLAB, Python, R, STATA
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Dedicated research support team
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Advanced 3D/VR visualizations
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">Contact Research Team</Button>
      </CardFooter>
    </Card>
  )
}