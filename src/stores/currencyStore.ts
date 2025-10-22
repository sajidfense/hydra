import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const CURRENCIES = {
  EUR: { symbol: '€', rate: 1, name: 'Euro' },
  USD: { symbol: '$', rate: 1.09, name: 'US Dollar' },
  GBP: { symbol: '£', rate: 0.86, name: 'British Pound' },
  CAD: { symbol: 'C$', rate: 1.48, name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', rate: 1.66, name: 'Australian Dollar' },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

interface CurrencyStore {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convertPrice: (eurPrice: number) => number;
  formatPrice: (eurPrice: number) => string;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'EUR',

      setCurrency: (currency) => set({ currency }),

      convertPrice: (eurPrice) => {
        const { currency } = get();
        return eurPrice * CURRENCIES[currency].rate;
      },

      formatPrice: (eurPrice) => {
        const { currency, convertPrice } = get();
        const converted = convertPrice(eurPrice);
        const { symbol } = CURRENCIES[currency];
        return `${symbol}${converted.toFixed(2)}`;
      },
    }),
    {
      name: 'currency-preference',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
