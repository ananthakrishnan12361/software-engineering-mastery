import { m01p1Coverage } from "./m01-p1.coverage";
import { m01p2Coverage } from "./m01-p2.coverage";
import { m01p3Coverage } from "./m01-p3.coverage";
import { m01p4Coverage } from "./m01-p4.coverage";
import type { LessonCoverageSpec, ModuleCoverageTarget } from "./types";

export type {
  CodeExampleTestSpec,
  LessonCoverageSpec,
  ModuleCoverageTarget,
  SafetyMutationCheck,
  SnippetEvaluator,
  TopicCoverageEntry
} from "./types";

export const LESSON_COVERAGE_SPECS: LessonCoverageSpec[] = [
  m01p1Coverage,
  m01p2Coverage,
  m01p3Coverage,
  m01p4Coverage
];

export const MODULE_INTERVIEW_TARGETS: ModuleCoverageTarget[] = [
  {
    moduleNumber: 1,
    complete: false, // Parts 1-4 of 5 completed; Part 5 will complete the 10/10/10/5 targets
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  }
];
