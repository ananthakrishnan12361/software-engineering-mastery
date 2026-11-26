export interface TopicCoverageEntry {
  /** Exact topic title matching `content/syllabus.ts` and `COURSE_modeule_in_detiles.md` */
  topicTitle: string;
  /** Explicit `<TopicAnchor id="..." />` inside the lesson MDX */
  anchorId: string;
  /** Exact Markdown heading line(s) (`#### ...`) covering this topic in substantive prose */
  explanationHeadings: string[];
  /** Exact heading/example title(s) with a runnable `<CodeBlock` in the MDX */
  exampleTitles?: string[];
  /** Required only if `exampleTitles` is empty; explains why runnable code is unsuitable */
  noCodeReason?: string;
  /** 1+ interview question IDs in `content/interviews/<lessonId>.questions.ts` */
  interviewQuestionIds: string[];
  /** 1+ `<ExerciseCard title="..."` titles in the lesson MDX */
  exerciseTitles: string[];
}

export type SnippetEvaluator = (extraHarnessJs: string) => unknown;

export interface SafetyMutationCheck {
  description: string;
  /** Transform raw MDX snippet to strip/bypass the safety protection */
  mutateCode: (rawSnippet: string) => string;
  /** Must PASS on original MDX snippet and FAIL/THROW when mutated */
  verifyProtection: (run: SnippetEvaluator) => void;
}

export interface CodeExampleTestSpec {
  /** 1-based position of this `<CodeBlock runnable` in the lesson MDX */
  blockIndex: number;
  label: string;
  expectedStdoutIncludes: string[];
  minStdoutLines: number;
  testValidAndInvalidInputs: (run: SnippetEvaluator) => void;
  safetyMutations?: SafetyMutationCheck[];
}

export interface ModuleCoverageTarget {
  moduleNumber: number;
  complete: boolean;
  /** Default 10/10/10/5 unless documented otherwise */
  targets: Record<string, number>;
}

export interface LessonCoverageSpec {
  lessonId: string;
  moduleNumber: number;
  mdxPath: string;
  topics: TopicCoverageEntry[];
  codeTests: CodeExampleTestSpec[];
}
