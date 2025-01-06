import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, GraduationCap } from "lucide-react"
import { Link } from "react-router-dom"

export const BachelorPlan = () => {
  return (
    <Card className="flex flex-col glass-card relative">
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-dopamine text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
      </div>
      <CardHeader>
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-dopamine/10 mb-4">
          <GraduationCap className="h-6 w-6 text-dopamine" />
        </div>
        <CardTitle className="text-2xl">Bachelor's</CardTitle>
        <CardDescription>For growing institutions</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mt-4 text-4xl font-bold">$25,000<span className="text-base font-normal text-muted-foreground">/year</span></div>
        <ul className="mt-6 space-y-3">
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Up to 1,000 users
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Run up to 300 concurrent agents (GPU-accelerated)
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Advanced market simulations
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Priority support
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Integration capabilities
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Access to Principles tools
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Link to="/bachelors" className="w-full">
          <Button className="w-full">Get Started</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}