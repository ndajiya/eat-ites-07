import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"

export const AssociatePlan = () => {
  return (
    <Card className="flex flex-col glass-card">
      <CardHeader>
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-serotonin/10 mb-4">
          <BookOpen className="h-6 w-6 text-serotonin" />
        </div>
        <CardTitle className="text-2xl">Associate's</CardTitle>
        <CardDescription>Perfect for small departments</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mt-4 text-4xl font-bold">$5,000<span className="text-base font-normal text-muted-foreground">/year</span></div>
        <ul className="mt-6 space-y-3">
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Up to 100 users
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Run up to 20 concurrent agents (CPU-based)
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Basic agent-based modeling
          </li>
          <li className="flex items-center text-sm">
            <Check className="h-4 w-4 text-dopamine mr-3" />
            Email support
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Link to="/" className="w-full">
          <Button className="w-full" variant="outline">Get Started</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}