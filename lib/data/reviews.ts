import { TireReview } from "@/lib/types";

const reviewPool: Omit<TireReview, "id">[] = [
  { author: "Klaus M.", rating: 5, date: "2026-02-14", title: "Absolutely convincing", body: "I've been running these tires for the second season now and I'm thrilled. Braking distances on wet roads are noticeably shorter than my old tires. Highly recommended!", vehicleModel: "VW Golf VIII GTI", verified: true },
  { author: "Sabine R.", rating: 5, date: "2026-01-28", title: "Exactly right for my car", body: "PremiumTire recommended them and the advice was spot on. The tires fit perfectly and the driving feel has improved noticeably.", vehicleModel: "BMW 3 Series", verified: true },
  { author: "Thomas B.", rating: 4, date: "2025-12-10", title: "Very good tire, slightly noisy", body: "Performance is excellent, but on the motorway at 130 km/h it's a little louder than expected. Wet braking is genuinely top-notch though.", vehicleModel: "Audi A4", verified: true },
  { author: "Monika S.", rating: 4, date: "2025-11-22", title: "Good value for money", body: "Compared directly to my old tires (same brand, previous generation), noticeably better on wet roads. Price is fair.", vehicleModel: "Mercedes C-Class", verified: false },
  { author: "Rainer W.", rating: 5, date: "2025-10-05", title: "Test winner in real-world use", body: "I did a lot of research before choosing these and was absolutely not disappointed. Grip on all surfaces is impressive.", vehicleModel: "Porsche Cayenne", verified: true },
  { author: "Anja K.", rating: 3, date: "2025-09-17", title: "Decent for the price", body: "Reasonable for the money. Not a test winner, but does the job in everyday use. Would invest a little more next time.", vehicleModel: "Ford Focus", verified: true },
  { author: "Dieter F.", rating: 5, date: "2026-03-01", title: "Noticeably better than the predecessor", body: "10,000 km in and no issues. Handling is precise and road noise is minimal. Very satisfied.", vehicleModel: "BMW M4", verified: true },
];

export function getReviewsForTire(tireId: string): TireReview[] {
  const seed = tireId.charCodeAt(0) + tireId.charCodeAt(1);
  const count = 3 + (seed % 3);
  return reviewPool.slice(0, count).map((r, i) => ({ ...r, id: `${tireId}-r${i}` }));
}
