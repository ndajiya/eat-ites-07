import { ScrollArea } from "@/components/ui/scroll-area";
import { COMMODITY_CLASSES, COMMODITY_TYPES } from "@/types/commodityTypes";

export const CommoditiesSection = () => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-medium text-primary mb-4">Commodity Classes</h3>
          <div className="space-y-6">
            {Object.entries(COMMODITY_CLASSES).map(([key, commodity]) => (
              <div key={key} className="space-y-2 border-b pb-4 last:border-0">
                <h4 className="font-medium text-primary">{commodity.name}</h4>
                <div className="rounded-lg bg-muted p-4">
                  <code className="text-sm">{key}</code>
                </div>
                <p className="text-muted-foreground">{commodity.description}</p>
                
                <div className="mt-4">
                  <h5 className="font-medium text-primary">Properties</h5>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="font-mono text-sm">characteristics</span>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        {commodity.characteristics.map((char, index) => (
                          <li key={index}>{char}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-mono text-sm">examples</span>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        {commodity.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-primary mb-4">Commodity Types</h3>
          <div className="space-y-6">
            {Object.entries(COMMODITY_TYPES).map(([key, type]) => (
              <div key={key} className="space-y-2 border-b pb-4 last:border-0">
                <h4 className="font-medium text-primary">{type.name}</h4>
                <div className="rounded-lg bg-muted p-4">
                  <code className="text-sm">{key}</code>
                </div>
                <p className="text-muted-foreground">{type.description}</p>
                
                <div className="mt-4">
                  <h5 className="font-medium text-primary">Properties</h5>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="font-mono text-sm">marketCharacteristics</span>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        {type.marketCharacteristics.map((char, index) => (
                          <li key={index}>{char}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-mono text-sm">examples</span>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        {type.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};