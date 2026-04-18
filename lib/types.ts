export interface TireSize {
  width: number;
  aspectRatio: number;
  rimDiameter: number;
  fullSize: string;
}

export interface TirePerformance {
  wetGrip: "A" | "B" | "C" | "D" | "E";
  fuelEfficiency: "A" | "B" | "C" | "D" | "E";
  noiseLevel: number;
  noiseClass: 1 | 2 | 3;
}

export interface TireWarranty {
  years: number;
  mileage: number;
}

export type TireCategory = "summer" | "winter" | "all-season" | "performance" | "off-road" | "eco";
export type VehicleType = "passenger" | "suv" | "van" | "truck" | "sports";

export interface Tire {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: TireCategory;
  vehicleType: VehicleType[];
  size: TireSize;
  loadIndex: number;
  speedRating: string;
  price: number;
  originalPrice?: number;
  stock: number;
  performance: TirePerformance;
  features: string[];
  bestFor: string[];
  seasonOptimal: string;
  warranty: TireWarranty;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  images: string[];
  tags: string[];
}

export interface CartItem {
  tire: Tire;
  quantity: number;
}

export interface TireFilters {
  categories: TireCategory[];
  brands: string[];
  priceMin: number;
  priceMax: number;
  widths: number[];
  aspectRatios: number[];
  rimDiameters: number[];
  vehicleTypes: VehicleType[];
  minRating: number;
  wetGrip: string[];
  fuelEfficiency: string[];
}

export interface TireReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  vehicleModel: string;
  verified: boolean;
}
