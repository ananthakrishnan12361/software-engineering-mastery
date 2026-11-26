import fs from "node:fs";
import path from "node:path";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { viteSingleFile } from "vite-plugin-singlefile";

function createMdxPlugin(): PluginOption {
  const baseMdx = mdx({
    remarkPlugins: [remarkGfm],
    providerImportSource: "@mdx-js/react"
  });
  const baseTransform = baseMdx.transform;

  return {
    ...baseMdx,
    enforce: "pre",
    transform(code, id) {
      if (id.includes("?raw")) {
        return null;
      }
      if (typeof baseTransform === "function") {
        return baseTransform.call(this, code, id);
      }
      return null;
    }
  } as PluginOption;
}

function renameSingleFileOutput(): PluginOption {
  return {
    name: "rename-singlefile-output",
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, "dist");
      const srcHtml = path.join(distDir, "index.html");
      const targetHtml = path.join(distDir, "software_engineering_mastery.html");
      if (fs.existsSync(srcHtml)) {
        if (fs.existsSync(targetHtml)) fs.rmSync(targetHtml);
        fs.renameSync(srcHtml, targetHtml);
      }
    }
  };
}

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@content": path.resolve(import.meta.dirname, "content")
    }
  },
  plugins: [
    createMdxPlugin(),
    react({
      include: /\.(mdx|js|jsx|ts|tsx)$/
    }),
    viteSingleFile(),
    renameSingleFileOutput()
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000
  }
});
