import type { ComponentProps, ComponentType } from "react";
import type { MDXProvider } from "@mdx-js/react";
import type { CategoryId, DifficultyLevel } from "@/shared/config";

export type MdxComponentsProp = ComponentProps<typeof MDXProvider>["components"];

export interface InterviewSubbox {
  title: string;
  content: string;
  isCode?: boolean;
}

export interface InterviewQuestion {
  id: string;
  lessonId: string;
  moduleNumber: number;
  number: number;
  difficulty: DifficultyLevel;
  question: string;
  paragraphs?: Array<{ label?: string; body: string }>;
  numberedSteps?: Array<{ title: string; body: string }>;
  subboxes?: InterviewSubbox[];
}

export interface TocSectionMeta {
  id: string;
  letter?: string;
  title: string;
}

export interface MasteryItemMeta {
  id: string;
  label: string;
}

export interface LessonRecord {
  id: string;
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  partLabel: string;
  title: string;
  category: CategoryId;
  duration: string;
  objectives: string[];
  sections: TocSectionMeta[];
  masteryItems: MasteryItemMeta[];
  prevLessonId: string | null;
  nextLessonId: string | null;
  Content: ComponentType<{ components?: MdxComponentsProp }>;
}

export interface ModuleRecord {
  id: string;
  number: number;
  title: string;
  category: CategoryId;
  partSummary: string;
  scopeSummary: string;
  lead: string;
  lessonIds: string[];
}

export type SyllabusTopicStatus = "available" | "unwritten";

export interface SyllabusTopic {
  id: string;
  moduleNumber: number;
  title: string;
  group?: string;
  status: SyllabusTopicStatus;
  lessonId?: string;
  anchorId?: string;
}

export interface SyllabusModule {
  number: number;
  title: string;
  category: CategoryId;
  topics: SyllabusTopic[];
  notes?: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  lessonId: string;
  sectionId: string;
}

export type SearchRecordType =
  | "Syllabus Topic"
  | "Lesson"
  | "Section"
  | "Code"
  | "Interview Q&A"
  | "Glossary";

export interface SearchRecord {
  id: string;
  type: SearchRecordType;
  title: string;
  text: string;
  available: boolean;
  moduleNumber?: number;
  lessonId?: string;
  sectionId?: string;
  badgeText?: string;
}
