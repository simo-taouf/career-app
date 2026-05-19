export type Tier = "starter" | "pro" | "premium";
export type Track = "linkedin" | "career";

export const tracks: Track[] = ["linkedin", "career"];

export const tiers: Record<Track, Tier[]> = {
  linkedin: ["starter", "pro", "premium"],
  career:   ["starter", "pro"],
};

export const popularByTrack: Record<Track, Tier> = {
  linkedin: "pro",
  career:   "pro",
};
