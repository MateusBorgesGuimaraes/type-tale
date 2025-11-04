import { Rating } from "@/types/rating";

export function calcRatingAvg(rating: Rating) {
  const total =
    rating.writingQuality +
    rating.updateStability +
    rating.plotDevelopment +
    rating.charactersBuilding +
    rating.worldBuilding;

  return total / 5;
}
