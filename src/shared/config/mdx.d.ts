/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { ComponentProps, ComponentType } from "react";
  import type { MDXProvider } from "@mdx-js/react";

  type MdxComponentsProp = ComponentProps<typeof MDXProvider>["components"];

  const MDXContent: ComponentType<{
    components?: MdxComponentsProp;
  }>;
  export default MDXContent;
}

declare module "*.mdx?raw" {
  const raw: string;
  export default raw;
}
