import { ScrollArea } from "@/components/ui/scroll-area";
import { SECURITY_CLASS_INFO, SECURITY_TYPE_INFO } from "@/components/simulator/SecurityDialog/securityInfo";

export const SecuritiesSection = () => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-medium text-primary mb-4">Security Classes</h3>
          <div className="space-y-6">
            {Object.entries(SECURITY_CLASS_INFO).map(([key, security]) => (
              <div key={key} className="space-y-2 border-b pb-4 last:border-0">
                <h4 className="font-medium text-primary">{key}</h4>
                <div className="rounded-lg bg-muted p-4">
                  <code className="text-sm">{key}</code>
                </div>
                <p className="text-muted-foreground">{security.description}</p>
                
                <div className="mt-4">
                  <h5 className="font-medium text-primary">Properties</h5>
                  <div className="mt-2">
                    <span className="font-mono text-sm">characteristics</span>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      {security.characteristics.map((char, index) => (
                        <li key={index}>{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-primary mb-4">Security Types</h3>
          <div className="space-y-6">
            {Object.entries(SECURITY_TYPE_INFO).map(([key, type]) => (
              <div key={key} className="space-y-2 border-b pb-4 last:border-0">
                <h4 className="font-medium text-primary">{key}</h4>
                <div className="rounded-lg bg-muted p-4">
                  <code className="text-sm">{key}</code>
                </div>
                <p className="text-muted-foreground">{type.description}</p>
                
                <div className="mt-4">
                  <h5 className="font-medium text-primary">Properties</h5>
                  <div className="mt-2">
                    <span className="font-mono text-sm">characteristics</span>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      {type.characteristics.map((char, index) => (
                        <li key={index}>{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-primary mb-4">Market Types</h3>
          <div className="space-y-6">
            <div className="space-y-2 border-b pb-4">
              <h4 className="font-medium text-primary">Spot Market</h4>
              <div className="rounded-lg bg-muted p-4">
                <code className="text-sm">spot</code>
              </div>
              <p className="text-muted-foreground">
                Spot markets involve the immediate exchange of commodities for cash, with delivery typically occurring within a few days.
              </p>
              <div className="mt-4">
                <h5 className="font-medium text-primary">Properties</h5>
                <div className="mt-2">
                  <span className="font-mono text-sm">characteristics</span>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Immediate or near-immediate delivery</li>
                    <li>Current market prices</li>
                    <li>Direct physical trading</li>
                    <li>Lower price volatility</li>
                    <li>Suitable for immediate needs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-primary">Futures Market</h4>
              <div className="rounded-lg bg-muted p-4">
                <code className="text-sm">futures</code>
              </div>
              <p className="text-muted-foreground">
                Futures markets involve contracts for future delivery of commodities at predetermined prices, used for hedging and speculation.
              </p>
              <div className="mt-4">
                <h5 className="font-medium text-primary">Properties</h5>
                <div className="mt-2">
                  <span className="font-mono text-sm">characteristics</span>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Future delivery dates</li>
                    <li>Price locked in advance</li>
                    <li>Standardized contracts</li>
                    <li>Higher price volatility</li>
                    <li>Used for risk management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};