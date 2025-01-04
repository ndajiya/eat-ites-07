import { AssociatePlan } from "@/components/pricing/AssociatePlan"
import { BachelorPlan } from "@/components/pricing/BachelorPlan"
import { MasterPlan } from "@/components/pricing/MasterPlan"

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
          <AssociatePlan />
          <BachelorPlan />
          <MasterPlan />
        </div>
      </div>
    </div>
  )
}

export default PricingPage