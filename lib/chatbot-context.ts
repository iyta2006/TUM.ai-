import { tires } from "@/lib/data/tires";
import { Tire, TireCategory, VehicleType } from "@/lib/types";

export interface TireRecommendationCriteria {
  category?: TireCategory;
  vehicleType?: VehicleType;
  maxPrice?: number;
  minPrice?: number;
  width?: number;
  aspectRatio?: number;
  rimDiameter?: number;
  brand?: string;
  bestFor?: string;
  minRating?: number;
  wetGrip?: string;
  fuelEfficiency?: string;
}

export function recommendTires(criteria: TireRecommendationCriteria): Tire[] {
  return tires.filter((t) => {
    if (criteria.category && t.category !== criteria.category) return false;
    if (criteria.vehicleType && !t.vehicleType.includes(criteria.vehicleType)) return false;
    if (criteria.maxPrice && t.price > criteria.maxPrice) return false;
    if (criteria.minPrice && t.price < criteria.minPrice) return false;
    if (criteria.width && t.size.width !== criteria.width) return false;
    if (criteria.aspectRatio && t.size.aspectRatio !== criteria.aspectRatio) return false;
    if (criteria.rimDiameter && t.size.rimDiameter !== criteria.rimDiameter) return false;
    if (criteria.brand && t.brand.toLowerCase() !== criteria.brand.toLowerCase()) return false;
    if (criteria.bestFor && !t.bestFor.includes(criteria.bestFor)) return false;
    if (criteria.minRating && t.rating < criteria.minRating) return false;
    if (criteria.wetGrip && t.performance.wetGrip !== criteria.wetGrip) return false;
    if (criteria.fuelEfficiency && t.performance.fuelEfficiency !== criteria.fuelEfficiency) return false;
    return true;
  });
}

declare global {
  interface Window {
    tireShopContext: {
      allTires: Tire[];
      currentPage: string;
      currentProduct: Tire | null;
      cart: Array<{ tire: Tire; quantity: number }>;
      recommendTires: (criteria: TireRecommendationCriteria) => Tire[];
      addToCart: (tireId: string, quantity: number) => void;
      navigateTo: (path: string) => void;
    };
  }
}

export function initChatbotContext(options: {
  currentPage: string;
  currentProduct?: Tire | null;
  cart: Array<{ tire: Tire; quantity: number }>;
  addToCart: (tireId: string, quantity: number) => void;
  navigateTo: (path: string) => void;
}) {
  if (typeof window === "undefined") return;
  window.tireShopContext = {
    allTires: tires,
    currentPage: options.currentPage,
    currentProduct: options.currentProduct ?? null,
    cart: options.cart,
    recommendTires,
    addToCart: options.addToCart,
    navigateTo: options.navigateTo,
  };
}
