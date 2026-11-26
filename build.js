#!/usr/bin/env node
/**
 * Build script for Software Engineering Mastery Handbook.
 * Merges index.html, assets/style.css, assets/app.js, and modules/*.html
 * into a standalone offline file: dist/software_engineering_mastery.html
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SHELL_PATH = path.join(ROOT, "index.html");
const CSS_PATH = path.join(ROOT, "assets", "style.css");
const JS_PATH = path.join(ROOT, "assets", "app.js");
const MODULES_DIR = path.join(ROOT, "modules");
const DIST_DIR = path.join(ROOT, "dist");
const OUT_PATH = path.join(DIST_DIR, "software_engineering_mastery.html");

const CSS_MARKER = '<link rel="stylesheet" href="assets/style.css" id="handbook-css-link" />';
const MODULES_MARKER = "<!-- BUILD:MODULES -->";
const JS_MARKER = '<script src="assets/app.js" id="handbook-js-script"></script>';

function readUtf8(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function getModuleFiles() {
  if (!fs.existsSync(MODULES_DIR)) {
    return [];
  }
  return fs
    .readdirSync(MODULES_DIR)
    .filter((name) => name.toLowerCase().endsWith(".html"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((name) => ({
      name,
      fullPath: path.join(MODULES_DIR, name),
      content: fs.readFileSync(path.join(MODULES_DIR, name), "utf8").trim()
    }));
}

function build() {
  const shell = readUtf8(SHELL_PATH);
  const css = readUtf8(CSS_PATH);
  const js = readUtf8(JS_PATH);
  const modules = getModuleFiles();

  if (!shell.includes(CSS_MARKER)) {
    throw new Error(`CSS marker not found in index.html: ${CSS_MARKER}`);
  }
  if (!shell.includes(MODULES_MARKER)) {
    throw new Error(`Modules marker not found in index.html: ${MODULES_MARKER}`);
  }
  if (!shell.includes(JS_MARKER)) {
    throw new Error(`JS marker not found in index.html: ${JS_MARKER}`);
  }

  const safeJs = js.replace(/<\/script>/gi, "<\\/script>");
  const combinedModules = modules.map((m) => `<!-- SOURCE: modules/${m.name} -->\n${m.content}`).join("\n\n");

  let output = shell;
  output = output.replace(CSS_MARKER, () => `<style id="handbook-styles">\n${css}\n</style>`);
  output = output.replace(MODULES_MARKER, () => combinedModules);
  output = output.replace(JS_MARKER, () => `<script id="handbook-script">\n${safeJs}\n</script>`);

  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, output, "utf8");

  const lessonCount = (combinedModules.match(/class="lesson(?=["\s])/g) || []).length;
  const iqCount = (combinedModules.match(/class="iq-card(?=["\s])/g) || []).length;
  const svgCount = (combinedModules.match(/<svg(?=>|\s)/g) || []).length;
  const sizeKb = (Buffer.byteLength(output, "utf8") / 1024).toFixed(1);

  console.log("Build completed successfully:");
  console.log(`  Output:   ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`  Size:     ${sizeKb} KB`);
  console.log(`  Modules:  ${modules.length} (${modules.map((m) => m.name).join(", ") || "none"})`);
  console.log(`  Lessons:  ${lessonCount}`);
  console.log(`  IQs:      ${iqCount}`);
  console.log(`  Diagrams: ${svgCount}`);
}

try {
  build();
} catch (err) {
  console.error("Build failed:", err.message);
  process.exit(1);
}
