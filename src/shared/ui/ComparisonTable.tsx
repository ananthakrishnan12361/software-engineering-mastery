import type { ReactNode } from "react";

export interface ComparisonTableProps {
  children: ReactNode;
}

export function ComparisonTable({ children }: ComparisonTableProps) {
  return <div className="table-wrap">{children}</div>;
}
