/* ==========================================================================
   Software Engineering Mastery Handbook — Client Application
   Pure offline Vanilla JS, zero external dependencies, localStorage persistence.
   ========================================================================== */
(function () {
  "use strict";

  const STORAGE_KEY = "sem_handbook_v1";

  const defaultState = {
    theme: null,
    completedLessons: {},
    bookmarks: {},
    masteryChecks: {},
    collapsedSections: {},
    filters: {
      category: "all",
      difficulty: "all",
      bookmarksOnly: false
    }
  };

  let state = loadState();
  let searchIndex = [];
  let glossaryEntries = [];
  let activeLessonId = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredCloneSafe(defaultState);
      const parsed = JSON.parse(raw);
      return {
        theme: parsed.theme || null,
        completedLessons: parsed.completedLessons || {},
        bookmarks: parsed.bookmarks || {},
        masteryChecks: parsed.masteryChecks || {},
        collapsedSections: parsed.collapsedSections || {},
        filters: {
          category: (parsed.filters && parsed.filters.category) || "all",
          difficulty: (parsed.filters && parsed.filters.difficulty) || "all",
          bookmarksOnly: Boolean(parsed.filters && parsed.filters.bookmarksOnly)
        }
      };
    } catch (_) {
      return structuredCloneSafe(defaultState);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      /* Ignore storage quota errors in restricted private modes */
    }
  }

  function structuredCloneSafe(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /* ------------------------------------------------------------------------
     Theme Management
     ------------------------------------------------------------------------ */
  function initTheme() {
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = state.theme || (prefersLight ? "light" : "dark");
    applyTheme(theme, false);

    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next, true);
      });
    }
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("theme-icon");
    if (icon) icon.innerHTML = theme === "dark" ? "&#9788;" : "&#9790;";
    if (persist) {
      state.theme = theme;
      saveState();
    }
  }

  /* ------------------------------------------------------------------------
     Lightweight Offline Syntax Highlighter
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlightCode(rawCode, lang) {
    const l = (lang || "").toLowerCase();
    if (!["js", "javascript", "ts", "typescript", "sql", "json", "bash", "sh"].includes(l)) {
      return escapeHtml(rawCode);
    }

    const tokenRegex =
      l === "sql"
        ? /(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\b(?:SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|CROSS|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|UNIQUE|PRIMARY|KEY|FOREIGN|REFERENCES|AS|AND|OR|NOT|IN|IS|NULL|WITH|RECURSIVE|OVER|PARTITION|EXPLAIN|ANALYZE|BEGIN|COMMIT|ROLLBACK|TRANSACTION)\b)/gi
        : /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?n?\b|\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|super|import|export|from|default|async|await|typeof|instanceof|in|of|true|false|null|undefined|void|interface|type|implements|readonly|enum|public|private|protected)\b|\b(?:console|Math|Number|String|Boolean|BigInt|Symbol|Array|Object|Map|Set|Promise|JSON|Date|Error|TypeError|RangeError|parseInt|parseFloat|isNaN)\b)/g;

    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(rawCode)) !== null) {
      if (match.index > lastIndex) {
        result += escapeHtml(rawCode.slice(lastIndex, match.index));
      }
      const token = match[0];
      const escaped = escapeHtml(token);
      let cls = "";

      if (token.startsWith("//") || token.startsWith("/*") || token.startsWith("--")) {
        cls = "tok-com";
      } else if (token.startsWith("'") || token.startsWith('"') || token.startsWith("`")) {
        cls = "tok-str";
      } else if (/^\d/.test(token)) {
        cls = "tok-num";
      } else if (
        /^(console|Math|Number|String|Boolean|BigInt|Symbol|Array|Object|Map|Set|Promise|JSON|Date|Error|TypeError|RangeError|parseInt|parseFloat|isNaN)$/.test(
          token
        )
      ) {
        cls = "tok-bi";
      } else {
        cls = "tok-kw";
      }

      result += cls ? `<span class="${cls}">${escaped}</span>` : escaped;
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < rawCode.length) {
      result += escapeHtml(rawCode.slice(lastIndex));
    }
    return result;
  }

  /* ------------------------------------------------------------------------
     Enhance Code Blocks & Interactive JS Demos
     ------------------------------------------------------------------------ */
  function enhanceCodeBlocks() {
    const blocks = document.querySelectorAll("#handbook-content pre > code");
    blocks.forEach((codeEl) => {
      const pre = codeEl.parentElement;
      if (!pre || pre.closest(".code-block-enhanced")) return;

      const classMatch = (codeEl.className || "").match(/language-([a-z0-9_-]+)/i);
      const lang = (pre.dataset.lang || (classMatch && classMatch[1]) || "text").toLowerCase();
      const rawCode = codeEl.textContent.replace(/^\n+|\n+$/g, "");
      const isRunnable = pre.dataset.runnable === "true" && (lang === "js" || lang === "javascript");

      const wrapper = document.createElement("div");
      wrapper.className = "code-block code-block-enhanced";
      wrapper.dataset.lang = lang;

      const toolbar = document.createElement("div");
      toolbar.className = "code-toolbar";

      const langBadge = document.createElement("span");
      langBadge.className = "code-lang";
      langBadge.textContent = lang;

      const actions = document.createElement("div");
      actions.className = "code-toolbar-actions";

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "btn-small";
      copyBtn.textContent = "Copy";
      copyBtn.addEventListener("click", () => copyText(getActiveCode(), copyBtn));
      actions.appendChild(copyBtn);

      let editorEl = null;
      let outputEl = null;

      if (isRunnable) {
        const runBtn = document.createElement("button");
        runBtn.type = "button";
        runBtn.className = "btn-small";
        runBtn.textContent = "Run Demo";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn-small";
        editBtn.textContent = "Edit";

        const resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "btn-small";
        resetBtn.textContent = "Reset";
        resetBtn.hidden = true;

        actions.prepend(resetBtn);
        actions.prepend(editBtn);
        actions.prepend(runBtn);

        editBtn.addEventListener("click", () => {
          if (!editorEl) return;
          const editing = editorEl.hidden;
          editorEl.hidden = !editing;
          pre.hidden = editing;
          resetBtn.hidden = !editing;
          editBtn.textContent = editing ? "View Highlighted" : "Edit";
        });

        resetBtn.addEventListener("click", () => {
          if (!editorEl) return;
          editorEl.value = rawCode;
          codeEl.innerHTML = highlightCode(rawCode, lang);
          if (outputEl) {
            outputEl.hidden = true;
            outputEl.textContent = "";
          }
        });

        runBtn.addEventListener("click", () => {
          if (!outputEl) return;
          runJsSandbox(getActiveCode(), outputEl);
        });
      }

      function getActiveCode() {
        return editorEl && !editorEl.hidden ? editorEl.value : rawCode;
      }

      toolbar.appendChild(langBadge);
      toolbar.appendChild(actions);

      codeEl.innerHTML = highlightCode(rawCode, lang);

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(toolbar);
      wrapper.appendChild(pre);

      if (isRunnable) {
        editorEl = document.createElement("textarea");
        editorEl.className = "demo-editor";
        editorEl.value = rawCode;
        editorEl.hidden = true;
        editorEl.setAttribute("aria-label", "Editable JavaScript code snippet");

        outputEl = document.createElement("div");
        outputEl.className = "demo-output";
        outputEl.hidden = true;

        wrapper.appendChild(editorEl);
        wrapper.appendChild(outputEl);
      }
    });
  }

  function copyText(text, btn) {
    const finish = () => {
      const orig = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = orig;
      }, 1400);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(finish).catch(() => fallbackCopy(text, finish));
    } else {
      fallbackCopy(text, finish);
    }
  }

  function fallbackCopy(text, cb) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      cb();
    } catch (_) {
      /* Ignore copy failure */
    }
    document.body.removeChild(ta);
  }

  function runJsSandbox(code, outputEl) {
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push(args.map(formatValue).join(" ")),
      warn: (...args) => logs.push("[WARN] " + args.map(formatValue).join(" ")),
      error: (...args) => logs.push("[ERROR] " + args.map(formatValue).join(" ")),
      info: (...args) => logs.push(args.map(formatValue).join(" "))
    };

    outputEl.hidden = false;
    outputEl.classList.remove("is-error");

    try {
      const fn = new Function("console", `"use strict";\n${code}`);
      const ret = fn(fakeConsole);
      if (ret !== undefined) logs.push("=> " + formatValue(ret));
      outputEl.textContent = logs.length ? logs.join("\n") : "(Executed with no console output)";
    } catch (err) {
      outputEl.classList.add("is-error");
      outputEl.textContent = `${err.name}: ${err.message}`;
    }
  }

  function formatValue(val) {
    if (typeof val === "string") return val;
    if (typeof val === "bigint") return val.toString() + "n";
    if (typeof val === "symbol") return val.toString();
    if (typeof val === "function") return `[Function: ${val.name || "anonymous"}]`;
    if (val === undefined) return "undefined";
    try {
      return JSON.stringify(val);
    } catch (_) {
      return String(val);
    }
  }

  /* ------------------------------------------------------------------------
     Collapsible Sections, Interview Reveal, Exercises & Mastery Assessments
     ------------------------------------------------------------------------ */
  function enhanceSectionsAndControls() {
    // Module expand/collapse all
    document.querySelectorAll(".module").forEach((modEl) => {
      const expandAllBtn = modEl.querySelector("[data-action='expand-all']");
      const collapseAllBtn = modEl.querySelector("[data-action='collapse-all']");
      if (expandAllBtn) {
        expandAllBtn.addEventListener("click", () => toggleModuleSections(modEl, false));
      }
      if (collapseAllBtn) {
        collapseAllBtn.addEventListener("click", () => toggleModuleSections(modEl, true));
      }
    });

    // Collapsible topic sections
    document.querySelectorAll(".topic-section").forEach((secEl) => {
      const btn = secEl.querySelector(".topic-section-header");
      const secId = secEl.id;
      if (secId && state.collapsedSections[secId]) {
        secEl.setAttribute("data-collapsed", "true");
        if (btn) btn.setAttribute("aria-expanded", "false");
      } else if (btn) {
        btn.setAttribute("aria-expanded", "true");
      }

      if (btn) {
        btn.addEventListener("click", () => {
          const isCollapsed = secEl.getAttribute("data-collapsed") === "true";
          const next = !isCollapsed;
          secEl.setAttribute("data-collapsed", String(next));
          btn.setAttribute("aria-expanded", String(!next));
          if (secId) {
            if (next) state.collapsedSections[secId] = true;
            else delete state.collapsedSections[secId];
            saveState();
          }
        });
      }
    });

    // Interview Q&A Reveal toggles & per-lesson filter pills
    document.querySelectorAll(".lesson").forEach((lessonEl) => {
      const iqCards = lessonEl.querySelectorAll(".iq-card");
      const revealAllBtn = lessonEl.querySelector("[data-action='reveal-all-iq']");
      const hideAllBtn = lessonEl.querySelector("[data-action='hide-all-iq']");
      const localFilterBtns = lessonEl.querySelectorAll(".iq-filter-btn[data-iq-filter]");

      localFilterBtns.forEach((fBtn) => {
        fBtn.addEventListener("click", () => {
          const val = fBtn.dataset.iqFilter || "all";
          localFilterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === fBtn)));
          iqCards.forEach((card) => {
            const qDiff = card.dataset.difficulty || "all";
            card.hidden = val !== "all" && qDiff !== val;
          });
        });
      });

      iqCards.forEach((card) => {
        const toggleBtn = card.querySelector(".iq-toggle-btn");
        const answerEl = card.querySelector(".iq-answer");
        if (toggleBtn && answerEl) {
          toggleBtn.addEventListener("click", () => {
            const isHidden = answerEl.hidden;
            answerEl.hidden = !isHidden;
            toggleBtn.textContent = isHidden ? "Hide Answer" : "Reveal Answer";
            toggleBtn.setAttribute("aria-expanded", String(isHidden));
          });
        }
      });

      if (revealAllBtn) {
        revealAllBtn.addEventListener("click", () => {
          iqCards.forEach((card) => {
            if (card.hidden) return;
            const ans = card.querySelector(".iq-answer");
            const btn = card.querySelector(".iq-toggle-btn");
            if (ans) ans.hidden = false;
            if (btn) {
              btn.textContent = "Hide Answer";
              btn.setAttribute("aria-expanded", "true");
            }
          });
        });
      }

      if (hideAllBtn) {
        hideAllBtn.addEventListener("click", () => {
          iqCards.forEach((card) => {
            const ans = card.querySelector(".iq-answer");
            const btn = card.querySelector(".iq-toggle-btn");
            if (ans) ans.hidden = true;
            if (btn) {
              btn.textContent = "Reveal Answer";
              btn.setAttribute("aria-expanded", "false");
            }
          });
        });
      }

      // Exercise solution toggles
      lessonEl.querySelectorAll(".exercise-card").forEach((exCard) => {
        const btn = exCard.querySelector(".exercise-toggle-btn");
        const sol = exCard.querySelector(".exercise-solution");
        if (btn && sol) {
          btn.addEventListener("click", () => {
            const isHidden = sol.hidden;
            sol.hidden = !isHidden;
            btn.textContent = isHidden ? "Hide Solution" : "Reveal Solution";
            btn.setAttribute("aria-expanded", String(isHidden));
          });
        }
      });

      // Lesson Completion Checkbox & Bookmark Button
      const lessonId = lessonEl.dataset.lessonId;
      const completeCb = lessonEl.querySelector(".lesson-complete-cb");
      const completeLabel = lessonEl.querySelector(".complete-toggle");
      const bookmarkBtn = lessonEl.querySelector(".lesson-bookmark-btn");

      if (lessonId && completeCb) {
        const isDone = Boolean(state.completedLessons[lessonId]);
        completeCb.checked = isDone;
        if (completeLabel) completeLabel.classList.toggle("is-done", isDone);

        completeCb.addEventListener("change", () => {
          if (completeCb.checked) {
            state.completedLessons[lessonId] = Date.now();
          } else {
            delete state.completedLessons[lessonId];
          }
          if (completeLabel) completeLabel.classList.toggle("is-done", completeCb.checked);
          saveState();
          refreshProgressAndNav();
        });
      }

      if (lessonId && bookmarkBtn) {
        const updateBookmarkUI = () => {
          const isSaved = Boolean(state.bookmarks[lessonId]);
          bookmarkBtn.setAttribute("aria-pressed", String(isSaved));
          bookmarkBtn.innerHTML = isSaved ? "&#9733; Bookmarked" : "&#9734; Bookmark";
        };
        updateBookmarkUI();

        bookmarkBtn.addEventListener("click", () => {
          if (state.bookmarks[lessonId]) delete state.bookmarks[lessonId];
          else state.bookmarks[lessonId] = Date.now();
          updateBookmarkUI();
          saveState();
          refreshProgressAndNav();
          if (state.filters.bookmarksOnly) applyFilters();
        });
      }

      // Mastery Assessment Checkboxes
      const masteryBox = lessonEl.querySelector(".mastery-box");
      if (masteryBox) {
        const cbs = masteryBox.querySelectorAll("input[type='checkbox'][data-mastery-id]");
        const scoreEl = masteryBox.querySelector(".mastery-score");
        const updateScore = () => {
          let checkedCount = 0;
          cbs.forEach((cb) => {
            if (cb.checked) checkedCount++;
          });
          if (scoreEl) scoreEl.textContent = `${checkedCount} / ${cbs.length} mastered`;
        };
        cbs.forEach((cb) => {
          const mid = cb.dataset.masteryId;
          cb.checked = Boolean(state.masteryChecks[mid]);
          cb.addEventListener("change", () => {
            if (cb.checked) state.masteryChecks[mid] = true;
            else delete state.masteryChecks[mid];
            saveState();
            updateScore();
          });
        });
        updateScore();
      }
    });
  }

  function toggleModuleSections(modEl, collapse) {
    modEl.querySelectorAll(".topic-section").forEach((secEl) => {
      secEl.setAttribute("data-collapsed", String(collapse));
      const btn = secEl.querySelector(".topic-section-header");
      if (btn) btn.setAttribute("aria-expanded", String(!collapse));
      if (secEl.id) {
        if (collapse) state.collapsedSections[secEl.id] = true;
        else delete state.collapsedSections[secEl.id];
      }
    });
    saveState();
  }

  /* ------------------------------------------------------------------------
     Sidebar Navigation & Progress Calculation
     ------------------------------------------------------------------------ */
  function buildSidebar() {
    const nav = document.getElementById("sidebar-nav");
    if (!nav) return;
    nav.innerHTML = "";

    const modules = document.querySelectorAll("#handbook-content .module");
    modules.forEach((modEl) => {
      const modId = modEl.id;
      const modNum = modEl.dataset.moduleNumber || "";
      const modTitle = modEl.dataset.moduleTitle || modEl.querySelector("h1")?.textContent || modId;
      const lessons = modEl.querySelectorAll(".lesson");

      const modWrap = document.createElement("div");
      modWrap.className = "nav-module";
      modWrap.dataset.moduleId = modId;

      const headerBtn = document.createElement("button");
      headerBtn.type = "button";
      headerBtn.className = "nav-module-header";
      headerBtn.setAttribute("aria-expanded", "true");

      const titleSpan = document.createElement("span");
      titleSpan.textContent = modNum ? `${modNum}. ${modTitle}` : modTitle;

      const metaSpan = document.createElement("span");
      metaSpan.className = "nav-module-meta";
      metaSpan.dataset.moduleMeta = modId;

      headerBtn.appendChild(titleSpan);
      headerBtn.appendChild(metaSpan);

      const listEl = document.createElement("div");
      listEl.className = "nav-lesson-list";

      lessons.forEach((lessonEl) => {
        const lid = lessonEl.dataset.lessonId || lessonEl.id;
        const lTitle = lessonEl.dataset.lessonTitle || lessonEl.querySelector("h2")?.textContent || lid;

        const link = document.createElement("a");
        link.href = `#${lessonEl.id}`;
        link.className = "nav-lesson-link";
        link.dataset.lessonLink = lid;

        const label = document.createElement("span");
        label.textContent = lTitle;

        const status = document.createElement("span");
        status.className = "nav-lesson-status";
        status.dataset.lessonStatus = lid;

        link.appendChild(label);
        link.appendChild(status);

        link.addEventListener("click", () => {
          setActiveLesson(lessonEl);
          closeMobileSidebar();
        });

        listEl.appendChild(link);
      });

      headerBtn.addEventListener("click", () => {
        const isOpen = headerBtn.getAttribute("aria-expanded") === "true";
        headerBtn.setAttribute("aria-expanded", String(!isOpen));
        listEl.hidden = isOpen;
      });

      modWrap.appendChild(headerBtn);
      modWrap.appendChild(listEl);
      nav.appendChild(modWrap);
    });

    const sidebarFilter = document.getElementById("sidebar-filter");
    if (sidebarFilter) {
      sidebarFilter.addEventListener("input", () => {
        const q = sidebarFilter.value.trim().toLowerCase();
        nav.querySelectorAll(".nav-module").forEach((modWrap) => {
          let anyVisible = false;
          modWrap.querySelectorAll(".nav-lesson-link").forEach((link) => {
            const match = !q || link.textContent.toLowerCase().includes(q);
            link.style.display = match ? "" : "none";
            if (match) anyVisible = true;
          });
          const modMatch = modWrap.querySelector(".nav-module-header").textContent.toLowerCase().includes(q);
          modWrap.style.display = anyVisible || modMatch ? "" : "none";
          if (modMatch && q) {
            modWrap.querySelectorAll(".nav-lesson-link").forEach((l) => (l.style.display = ""));
          }
        });
      });
    }
  }

  function refreshProgressAndNav() {
    const lessons = Array.from(document.querySelectorAll("#handbook-content .lesson"));
    const total = lessons.length;
    let completed = 0;
    let bookmarked = 0;

    lessons.forEach((lessonEl) => {
      const lid = lessonEl.dataset.lessonId;
      const isDone = Boolean(lid && state.completedLessons[lid]);
      const isBookmarked = Boolean(lid && state.bookmarks[lid]);
      if (isDone) completed++;
      if (isBookmarked) bookmarked++;

      const statusEl = document.querySelector(`[data-lesson-status="${lid}"]`);
      if (statusEl) {
        statusEl.innerHTML =
          (isBookmarked ? '<span class="status-bookmark" title="Bookmarked">&#9733;</span>' : "") +
          (isDone ? '<span class="status-done" title="Completed">&#10003;</span>' : "");
      }
    });

    document.querySelectorAll("#handbook-content .module").forEach((modEl) => {
      const modLessons = modEl.querySelectorAll(".lesson");
      let modDone = 0;
      modLessons.forEach((l) => {
        if (state.completedLessons[l.dataset.lessonId]) modDone++;
      });
      const metaEl = document.querySelector(`[data-module-meta="${modEl.id}"]`);
      if (metaEl) metaEl.textContent = `${modDone}/${modLessons.length}`;
    });

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const barFill = document.getElementById("sidebar-progress-fill");
    const barWrap = document.getElementById("sidebar-progress-bar-wrap");
    const txt = document.getElementById("sidebar-progress-text");
    const pctLabel = document.getElementById("sidebar-pct-label");
    const bmLabel = document.getElementById("sidebar-bookmarks-label");
    const topPct = document.getElementById("topbar-progress-pct");
    const bmCount = document.getElementById("bookmark-count");
    const buildMeta = document.getElementById("build-meta");

    if (barFill) barFill.style.width = `${pct}%`;
    if (barWrap) barWrap.setAttribute("aria-valuenow", String(pct));
    if (txt) txt.textContent = `${completed} / ${total} lessons`;
    if (pctLabel) pctLabel.textContent = `${pct}% complete`;
    if (bmLabel) bmLabel.textContent = `${bookmarked} bookmarked`;
    if (topPct) topPct.textContent = `${pct}%`;
    if (bmCount) bmCount.textContent = String(bookmarked);

    const modCount = document.querySelectorAll("#handbook-content .module").length;
    if (buildMeta) {
      buildMeta.textContent = `${modCount} module${modCount === 1 ? "" : "s"} · ${total} lesson${total === 1 ? "" : "s"}`;
    }
  }

  /* ------------------------------------------------------------------------
     Table of Contents (Right Aside)
     ------------------------------------------------------------------------ */
  function setActiveLesson(lessonEl) {
    if (!lessonEl) return;
    activeLessonId = lessonEl.id;

    document.querySelectorAll(".nav-lesson-link").forEach((a) => {
      a.classList.toggle("active", a.dataset.lessonLink === lessonEl.dataset.lessonId);
    });

    const tocNav = document.getElementById("toc-nav");
    if (!tocNav) return;
    tocNav.innerHTML = "";

    const obj = lessonEl.querySelector(".lesson-objectives");
    if (obj && obj.id) {
      addTocLink(tocNav, obj.id, "Learning Objectives");
    }

    lessonEl.querySelectorAll(".topic-section").forEach((sec) => {
      if (!sec.id) return;
      const letter = sec.dataset.section || "";
      const titleText = sec.querySelector(".topic-section-title-text")?.textContent || sec.id;
      addTocLink(tocNav, sec.id, letter ? `${letter}. ${titleText}` : titleText);
    });

    const mastery = lessonEl.querySelector(".mastery-box");
    if (mastery && mastery.id) {
      addTocLink(tocNav, mastery.id, "Mastery Assessment");
    }
  }

  function addTocLink(container, targetId, label) {
    const a = document.createElement("a");
    a.className = "toc-link";
    a.href = `#${targetId}`;
    a.textContent = label;
    container.appendChild(a);
  }

  function initScrollSpy() {
    const firstLesson = document.querySelector("#handbook-content .lesson");
    if (firstLesson) setActiveLesson(firstLesson);

    if (!("IntersectionObserver" in window)) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const parentLesson = entry.target.closest(".lesson");
          if (parentLesson && parentLesson.id !== activeLessonId) {
            setActiveLesson(parentLesson);
          }
          const tocNav = document.getElementById("toc-nav");
          if (tocNav) {
            tocNav.querySelectorAll(".toc-link").forEach((l) => {
              l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`);
            });
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    document.querySelectorAll("#handbook-content .topic-section[id]").forEach((sec) => {
      sectionObserver.observe(sec);
    });
  }

  /* ------------------------------------------------------------------------
     Global Search (Topics, Definitions, Code, Interview Q&A, Glossary)
     ------------------------------------------------------------------------ */
  function buildSearchAndGlossaryIndex() {
    searchIndex = [];
    glossaryEntries = [];

    document.querySelectorAll("#handbook-content .lesson").forEach((lessonEl) => {
      const lessonTitle = lessonEl.dataset.lessonTitle || lessonEl.querySelector("h2")?.textContent || "";

      // Lesson header
      searchIndex.push({
        type: "Lesson",
        title: lessonTitle,
        text: lessonEl.querySelector(".lesson-objectives")?.textContent || lessonTitle,
        targetId: lessonEl.id
      });

      // Topic sections
      lessonEl.querySelectorAll(".topic-section").forEach((sec) => {
        const title = sec.querySelector(".topic-section-title")?.textContent.trim() || "";
        const bodyText = sec.querySelector(".topic-section-body")?.textContent || "";
        searchIndex.push({
          type: "Topic",
          title: `${lessonTitle} — ${title}`,
          text: bodyText,
          targetId: sec.id || lessonEl.id
        });
      });

      // Code blocks
      lessonEl.querySelectorAll("pre code").forEach((codeEl) => {
        const sec = codeEl.closest(".topic-section");
        searchIndex.push({
          type: "Code",
          title: `${lessonTitle} (${codeEl.closest(".code-block")?.dataset.lang || "code"})`,
          text: codeEl.textContent,
          targetId: (sec && sec.id) || lessonEl.id
        });
      });

      // Interview questions & answers
      lessonEl.querySelectorAll(".iq-card").forEach((iq) => {
        const q = iq.querySelector(".iq-question")?.textContent || "";
        const a = iq.querySelector(".iq-answer")?.textContent || "";
        const diff = iq.dataset.difficulty || "";
        searchIndex.push({
          type: `Interview (${diff})`,
          title: q,
          text: `${q} ${a}`,
          targetId: iq.id || lessonEl.id
        });
      });
    });

    // Glossary definitions
    const seenTerms = new Set();
    document.querySelectorAll("#handbook-content dfn[data-definition]").forEach((dfnEl) => {
      const term = dfnEl.textContent.trim();
      const def = dfnEl.dataset.definition || "";
      if (def && !dfnEl.getAttribute("title")) {
        dfnEl.setAttribute("title", def);
      }
      const sec = dfnEl.closest(".topic-section") || dfnEl.closest(".lesson");
      const targetId = (sec && sec.id) || "";

      if (!seenTerms.has(term.toLowerCase())) {
        seenTerms.add(term.toLowerCase());
        glossaryEntries.push({ term, definition: def, targetId });
      }
      searchIndex.push({
        type: "Glossary",
        title: term,
        text: `${term}: ${def}`,
        targetId
      });
    });

    glossaryEntries.sort((a, b) => a.term.localeCompare(b.term));
  }

  function initSearch() {
    const input = document.getElementById("global-search");
    const clearBtn = document.getElementById("search-clear");
    const panel = document.getElementById("search-results");
    if (!input || !panel) return;

    function runSearch() {
      const q = input.value.trim();
      if (clearBtn) clearBtn.hidden = q.length === 0;
      if (q.length < 2) {
        panel.hidden = true;
        panel.innerHTML = "";
        return;
      }

      const lower = q.toLowerCase();
      const matches = [];
      for (let i = 0; i < searchIndex.length; i++) {
        const entry = searchIndex[i];
        const titleHit = entry.title.toLowerCase().indexOf(lower);
        const textHit = entry.text.toLowerCase().indexOf(lower);
        if (titleHit !== -1 || textHit !== -1) {
          matches.push({ entry, score: titleHit !== -1 ? 2 : 1, idx: textHit });
        }
      }

      matches.sort((a, b) => b.score - a.score);
      renderSearchResults(matches.slice(0, 25), q, panel);
    }

    input.addEventListener("input", runSearch);
    input.addEventListener("focus", () => {
      if (input.value.trim().length >= 2) runSearch();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        clearBtn.hidden = true;
        panel.hidden = true;
        input.focus();
      });
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".topbar-search")) {
        panel.hidden = true;
      }
    });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === "Escape") {
        panel.hidden = true;
        closeAllModals();
      }
    });
  }

  function renderSearchResults(matches, query, panel) {
    panel.hidden = false;
    panel.innerHTML = "";
    if (!matches.length) {
      panel.innerHTML = `<div class="search-empty">No matches for "${escapeHtml(query)}"</div>`;
      return;
    }

    matches.forEach(({ entry, idx }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "search-result-item";

      const start = Math.max(0, (idx > 0 ? idx : 0) - 40);
      const rawSnippet = entry.text.replace(/\s+/g, " ").slice(start, start + 130);
      const safeSnippet = highlightQueryMatch(rawSnippet, query);

      btn.innerHTML = `
        <div class="search-result-meta">
          <span class="badge badge-neutral">${escapeHtml(entry.type)}</span>
        </div>
        <div class="search-result-title">${escapeHtml(entry.title)}</div>
        <div class="search-result-snippet">${safeSnippet}...</div>
      `;

      btn.addEventListener("click", () => {
        panel.hidden = true;
        jumpToTarget(entry.targetId);
      });

      panel.appendChild(btn);
    });
  }

  function highlightQueryMatch(text, query) {
    const escaped = escapeHtml(text);
    const qEsc = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return escaped.replace(new RegExp(`(${qEsc})`, "ig"), "<mark>$1</mark>");
  }

  function jumpToTarget(targetId) {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;

    const sec = el.closest(".topic-section") || (el.classList.contains("topic-section") ? el : null);
    if (sec && sec.getAttribute("data-collapsed") === "true") {
      sec.setAttribute("data-collapsed", "false");
      const btn = sec.querySelector(".topic-section-header");
      if (btn) btn.setAttribute("aria-expanded", "true");
    }

    if (el.classList.contains("iq-card")) {
      const ans = el.querySelector(".iq-answer");
      const btn = el.querySelector(".iq-toggle-btn");
      if (ans) ans.hidden = false;
      if (btn) btn.textContent = "Hide Answer";
    }

    const parentLesson = el.closest(".lesson");
    if (parentLesson) {
      if (parentLesson.hidden) {
        resetAllFilters();
      }
      setActiveLesson(parentLesson);
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ------------------------------------------------------------------------
     Category, Difficulty & Bookmark Filters
     ------------------------------------------------------------------------ */
  function initFilters() {
    const catSelect = document.getElementById("category-filter");
    const diffSelect = document.getElementById("difficulty-filter");
    const bmBtn = document.getElementById("bookmarks-filter-btn");
    const clearBtn = document.getElementById("clear-filters-btn");
    const emptyResetBtn = document.getElementById("empty-reset-btn");

    if (catSelect) {
      catSelect.value = state.filters.category;
      catSelect.addEventListener("change", () => {
        state.filters.category = catSelect.value;
        saveState();
        applyFilters();
      });
    }

    if (diffSelect) {
      diffSelect.value = state.filters.difficulty;
      diffSelect.addEventListener("change", () => {
        state.filters.difficulty = diffSelect.value;
        saveState();
        applyFilters();
      });
    }

    if (bmBtn) {
      bmBtn.setAttribute("aria-pressed", String(state.filters.bookmarksOnly));
      bmBtn.addEventListener("click", () => {
        state.filters.bookmarksOnly = !state.filters.bookmarksOnly;
        bmBtn.setAttribute("aria-pressed", String(state.filters.bookmarksOnly));
        saveState();
        applyFilters();
      });
    }

    if (clearBtn) clearBtn.addEventListener("click", resetAllFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllFilters);

    applyFilters();
  }

  function resetAllFilters() {
    state.filters = { category: "all", difficulty: "all", bookmarksOnly: false };
    saveState();
    const catSelect = document.getElementById("category-filter");
    const diffSelect = document.getElementById("difficulty-filter");
    const bmBtn = document.getElementById("bookmarks-filter-btn");
    if (catSelect) catSelect.value = "all";
    if (diffSelect) diffSelect.value = "all";
    if (bmBtn) bmBtn.setAttribute("aria-pressed", "false");
    applyFilters();
  }

  function applyFilters() {
    const { category, difficulty, bookmarksOnly } = state.filters;
    let visibleLessons = 0;

    document.querySelectorAll("#handbook-content .module").forEach((modEl) => {
      let modHasVisible = false;
      modEl.querySelectorAll(".lesson").forEach((lessonEl) => {
        const lid = lessonEl.dataset.lessonId;
        const lCat = lessonEl.dataset.category || modEl.dataset.category || "all";
        const catOk = category === "all" || lCat === category;
        const bmOk = !bookmarksOnly || Boolean(state.bookmarks[lid]);

        const showLesson = catOk && bmOk;
        lessonEl.hidden = !showLesson;
        if (showLesson) {
          visibleLessons++;
          modHasVisible = true;
        }

        // Difficulty filtering on interview questions
        lessonEl.querySelectorAll(".iq-card").forEach((iq) => {
          const qDiff = iq.dataset.difficulty || "all";
          iq.hidden = difficulty !== "all" && qDiff !== difficulty;
        });
      });

      modEl.hidden = !modHasVisible;
    });

    const emptyState = document.getElementById("empty-filter-state");
    if (emptyState) emptyState.hidden = visibleLessons > 0;

    const bar = document.getElementById("active-filter-bar");
    const summary = document.getElementById("active-filter-summary");
    const activeParts = [];
    if (category !== "all") activeParts.push(`Category: ${category}`);
    if (difficulty !== "all") activeParts.push(`Interview difficulty: ${difficulty}`);
    if (bookmarksOnly) activeParts.push("Bookmarks only");

    if (bar && summary) {
      if (activeParts.length) {
        bar.hidden = false;
        summary.textContent = `Active filters — ${activeParts.join(" · ")}`;
      } else {
        bar.hidden = true;
      }
    }
  }

  /* ------------------------------------------------------------------------
     Modals: Glossary & Progress Backup
     ------------------------------------------------------------------------ */
  function initModals() {
    const glossaryBtn = document.getElementById("glossary-btn");
    const progressBtn = document.getElementById("progress-modal-btn");

    if (glossaryBtn) {
      glossaryBtn.addEventListener("click", () => {
        renderGlossary("");
        openModal("glossary-modal");
      });
    }

    const glossarySearch = document.getElementById("glossary-search");
    if (glossarySearch) {
      glossarySearch.addEventListener("input", () => renderGlossary(glossarySearch.value.trim()));
    }

    if (progressBtn) {
      progressBtn.addEventListener("click", () => {
        renderProgressModal();
        openModal("progress-modal");
      });
    }

    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
    });

    document.querySelectorAll(".modal").forEach((m) => {
      m.addEventListener("click", (e) => {
        if (e.target === m) m.hidden = true;
      });
    });

    // Export / Import / Reset
    const exportBtn = document.getElementById("export-progress-btn");
    const importInput = document.getElementById("import-progress-input");
    const resetBtn = document.getElementById("reset-progress-btn");

    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "software-engineering-mastery-progress.json";
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    if (importInput) {
      importInput.addEventListener("change", () => {
        const file = importInput.files && importInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(String(reader.result));
            state = Object.assign(structuredCloneSafe(defaultState), parsed);
            saveState();
            window.location.reload();
          } catch (_) {
            alert("Invalid JSON progress file.");
          }
        };
        reader.readAsText(file);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (!confirm("Reset all lesson completions, bookmarks, and mastery checks?")) return;
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      });
    }
  }

  function renderGlossary(query) {
    const list = document.getElementById("glossary-list");
    if (!list) return;
    const q = query.toLowerCase();
    const filtered = glossaryEntries.filter(
      (g) => !q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
    );

    if (!filtered.length) {
      list.innerHTML = `<p class="muted-note">No glossary terms match "${escapeHtml(query)}".</p>`;
      return;
    }

    list.innerHTML = filtered
      .map(
        (g) => `
      <div class="glossary-entry">
        <strong>${escapeHtml(g.term)}</strong>
        <p style="margin:4px 0 6px">${escapeHtml(g.definition)}</p>
        ${
          g.targetId
            ? `<button type="button" class="btn-small glossary-jump" data-jump="${escapeHtml(g.targetId)}">Jump to section</button>`
            : ""
        }
      </div>`
      )
      .join("");

    list.querySelectorAll(".glossary-jump").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal("glossary-modal");
        jumpToTarget(btn.dataset.jump);
      });
    });
  }

  function renderProgressModal() {
    const container = document.getElementById("progress-summary-details");
    if (!container) return;
    const lessons = document.querySelectorAll("#handbook-content .lesson").length;
    const done = Object.keys(state.completedLessons).length;
    const bm = Object.keys(state.bookmarks).length;
    const checks = Object.keys(state.masteryChecks).length;
    const pct = lessons ? Math.round((done / lessons) * 100) : 0;

    container.innerHTML = `
      <div class="table-wrap">
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          <tr><td>Lessons Completed</td><td>${done} / ${lessons} (${pct}%)</td></tr>
          <tr><td>Bookmarked Lessons</td><td>${bm}</td></tr>
          <tr><td>Mastery Checks Completed</td><td>${checks}</td></tr>
        </table>
      </div>
    `;
  }

  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.hidden = false;
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.hidden = true;
  }

  function closeAllModals() {
    document.querySelectorAll(".modal").forEach((m) => (m.hidden = true));
  }

  /* ------------------------------------------------------------------------
     Responsive Sidebar Toggle
     ------------------------------------------------------------------------ */
  function initSidebarToggle() {
    const btn = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");
    const layout = document.querySelector(".portal-layout");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (!btn || !sidebar) return;

    btn.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        const isOpen = sidebar.classList.toggle("open-mobile");
        btn.setAttribute("aria-expanded", String(isOpen));
        if (backdrop) {
          backdrop.hidden = !isOpen;
          backdrop.classList.toggle("visible", isOpen);
        }
      } else {
        const collapsed = sidebar.classList.toggle("collapsed-desktop");
        if (layout) layout.classList.toggle("sidebar-hidden", collapsed);
        btn.setAttribute("aria-expanded", String(!collapsed));
      }
    });

    if (backdrop) {
      backdrop.addEventListener("click", closeMobileSidebar);
    }
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    const btn = document.getElementById("sidebar-toggle");
    if (sidebar) sidebar.classList.remove("open-mobile");
    if (backdrop) {
      backdrop.classList.remove("visible");
      backdrop.hidden = true;
    }
    if (btn && window.innerWidth <= 900) btn.setAttribute("aria-expanded", "false");
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function boot() {
    initTheme();
    initSidebarToggle();
    enhanceCodeBlocks();
    enhanceSectionsAndControls();
    buildSidebar();
    refreshProgressAndNav();
    buildSearchAndGlossaryIndex();
    initSearch();
    initFilters();
    initModals();
    initScrollSpy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
