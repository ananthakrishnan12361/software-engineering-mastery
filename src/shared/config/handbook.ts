export type ThemeMode = "dark" | "light";

export type CategoryId =
  | "fundamentals"
  | "frontend"
  | "backend"
  | "databases"
  | "architecture"
  | "ai"
  | "devops"
  | "quality"
  | "career";

export type DifficultyLevel =
  | "basic"
  | "intermediate"
  | "advanced"
  | "senior-architect"
  | "senior"
  | "architect";

export interface CategoryOption {
  value: "all" | CategoryId;
  label: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "all", label: "All Categories" },
  { value: "fundamentals", label: "Fundamentals & Languages" },
  { value: "frontend", label: "Frontend & React" },
  { value: "backend", label: "Backend & APIs" },
  { value: "databases", label: "Databases & Indexing" },
  { value: "architecture", label: "System Design & Distributed" },
  { value: "ai", label: "AI, LLM & RAG" },
  { value: "devops", label: "DevOps, Cloud & SRE" },
  { value: "quality", label: "Security & Testing" },
  { value: "career", label: "Projects, Interviews & Roadmap" }
];

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced",
  "senior-architect": "Senior / Architect",
  senior: "Senior",
  architect: "Architect"
};
