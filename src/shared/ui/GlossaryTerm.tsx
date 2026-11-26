import type { ReactNode } from "react";

export interface GlossaryTermProps {
  definition: string;
  children: ReactNode;
}

export function GlossaryTerm({ definition, children }: GlossaryTermProps) {
  return (
    <dfn data-definition={definition} title={definition}>
      {children}
    </dfn>
  );
}
