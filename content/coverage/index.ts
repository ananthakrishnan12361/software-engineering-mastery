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
import { m03p2Coverage } from "./m03-p2.coverage";
import { m03p3Coverage } from "./m03-p3.coverage";
import { m03p4Coverage } from "./m03-p4.coverage";
import { m04p1Coverage } from "./m04-p1.coverage";
import { m04p2Coverage } from "./m04-p2.coverage";
import { m04p3Coverage } from "./m04-p3.coverage";
import { m05p1Coverage } from "./m05-p1.coverage";
import { m05p2Coverage } from "./m05-p2.coverage";
import { m05p3Coverage } from "./m05-p3.coverage";
import { m05p4Coverage } from "./m05-p4.coverage";
import { m06p1Coverage } from "./m06-p1.coverage";
import { m06p2Coverage } from "./m06-p2.coverage";
import { m07p1Coverage } from "./m07-p1.coverage";
import { m07p2Coverage } from "./m07-p2.coverage";
import { m07p3Coverage } from "./m07-p3.coverage";
import { m08p1Coverage } from "./m08-p1.coverage";
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
  m03p1Coverage,
  m03p2Coverage,
  m03p3Coverage,
  m03p4Coverage,
  m04p1Coverage,
  m04p2Coverage,
  m04p3Coverage,
  m05p1Coverage,
  m05p2Coverage,
  m05p3Coverage,
  m05p4Coverage,
  m06p1Coverage,
  m06p2Coverage,
  m07p1Coverage,
  m07p2Coverage,
  m07p3Coverage,
  m08p1Coverage
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
    complete: true, // All 4 parts of Module 3 completed (10/10/10/5 interview targets met)
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  },
  {
    moduleNumber: 4,
    complete: true, // All 3 parts of Module 4 completed (10/10/10/5 interview targets met)
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  },
  {
    moduleNumber: 5,
    complete: true, // All 4 parts of Module 5 completed (10/10/10/5 interview targets met)
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  },
  {
    moduleNumber: 6,
    complete: true, // All 2 parts of Module 6 completed (10/10/10/5 interview targets met)
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  },
  {
    moduleNumber: 7,
    complete: true, // All 3 parts of Module 7 completed (10/10/10/5 interview targets met)
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  },
  {
    moduleNumber: 8,
    complete: false, // Module 8 Part 1 of 4 complete — M08-P2..P4 pending
    targets: {
      basic: 10,
      intermediate: 10,
      advanced: 10,
      "senior-architect": 5
    }
  }
];
