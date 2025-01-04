import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Award } from "lucide-react"

export const MasterPlan = () => {
  return (
    <Card className="flex flex-col glass-card">
      <CardHeader>
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-oxytocin/10 mb-4">
          <Award className="h-6 w-6 text-oxytocin" />
        </div>
        <CardTitle className="text-2xl">Master's</CardTitle>
        <CardDescription>For large universities</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mt-4 text-4xl font-bold">$100,000<span className="text-base font-normal text-muted-foreground">/year</span></div>
        <p className="mt-6 mb-3 text-sm text-muted-foreground">Everything in the previous packages and the following:</p>
        <ul className="space-y-3">
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Unlimited users
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Run 1000+ concurrent agents (Cloud-based with multiple GPUs)
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Multi-agent modeling
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            24/7 dedicated support
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Real-time simulations
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Custom integrations
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">Contact Sales</Button>
      </CardFooter>
    </Card>
  )
}