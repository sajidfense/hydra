import { Globe } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CURRENCIES, CurrencyCode, useCurrencyStore } from "@/stores/currencyStore";

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrencyStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {CURRENCIES[currency].symbol}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm mb-3">Select Currency</h4>
          {Object.entries(CURRENCIES).map(([code, data]) => (
            <button
              key={code}
              onClick={() => setCurrency(code as CurrencyCode)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors ${
                currency === code ? 'bg-accent font-semibold' : ''
              }`}
            >
              {data.symbol} {data.name}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
