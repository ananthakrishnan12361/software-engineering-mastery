import { m01p1Coverage } from "./m01-p1.coverage";
import { m01p2Coverage } from "./m01-p2.coverage";
import { m01p3Coverage } from "./m01-p3.coverage";
import { m01p4Coverage } from "./m01-p4.coverage";
import { m01p5Coverage } from "./m01-p5.coverage";
import { m02p1Coverage } from "./m02-p1.coverage";
import { m02p2Coverage } from "./m02-p2.coverage";
import { m02p3Coverage } from "./m02-p3.coverage";
import { m02p4Coverage } from "./m02-p4.coverage";
import { m03p1Coverage } from "./m03-p1.coverage";
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
  m01p4Coverage,
  m01p5Coverage,
  m02p1Coverage,
  m02p2Coverage,
  m02p3Coverage,
  m02p4Coverage,
  m03p1Coverage
];

export const MODULE_INTERVIEW_TARGETS: ModuleCoverageTarget[] = [
  {
    moduleNumber: 1,
    complete: true, // All 5 parts of Module 1 completed (10/10/10/5 interview targets met)
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  },
  {
    moduleNumber: 2,
    complete: true, // All 4 parts of Module 2 completed (10/10/10/5 interview targets met)
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  },
  {
    moduleNumber: 3,
    complete: false, // Part 1 of 4 completed
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  }
];
