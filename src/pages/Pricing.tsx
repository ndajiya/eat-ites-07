import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, GraduationCap, Award, BookOpen } from "lucide-react"

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-oxytocin">Choose Your License Level</h1>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Select the perfect license tier for your academic institution's needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Associate's Plan */}
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
                  Basic agent-based modeling
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-dopamine mr-3" />
                  Email support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Bachelor's Plan */}
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
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Master's Plan */}
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
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-dopamine mr-3" />
                  Unlimited users
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
        </div>
      </div>
    </div>
  )
}

export default PricingPage