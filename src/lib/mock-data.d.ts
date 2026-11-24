export interface DiscoveryResource {
  title: string;
  kind: string;
  description: string;
  url: string;
}
export interface Discovery {
  id: string;
  query: string;
  category: string;
  tag: string;
  title: string;
  summary: string;
  question: string;
  readTime: string;
  symbol: string;
  accent: string;
  searchTerms: string[];
  source: { name: string; title: string; url: string };
  resources: DiscoveryResource[];
}
export const DISCOVERIES: Discovery[];
export const INTEREST_AREAS: string[];
export const OPPORTUNITY_RESOURCES: Array<{
  name: string; type: string; area: string; description: string; url: string;
  tags: string[]; mark: string; tone: string;
}>;
export const DEMO_QUESTIONS: Array<{
  id: string; area: string; difficulty: string; prompt: string;
  options: [string, string][];
  answer: string; explanation: string;
}>;
export function normalizeText(value: unknown): string;
export function findDiscovery(term: string): Discovery;
export function searchDiscoveries(term: string): Discovery[];
