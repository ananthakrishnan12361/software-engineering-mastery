import type { InterviewQuestion } from "@/entities/handbook";

export const m03p1Questions: InterviewQuestion[] = [
  {
    id: "m03-p1-iq-1",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 1,
    question: "How does Node.js handle thousands of concurrent requests if JavaScript runs on a single thread?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Only your JavaScript execution runs on a single main thread (V8). All slow I/O operations—network sockets, database TCP connections, timers, and filesystem reads—are offloaded to the OS kernel (via `epoll`/`kqueue`/`IOCP`) or libuv's background thread pool."
      },
      {
        label: "Why It Scales",
        body: "While waiting for I/O, the main thread is free to accept new requests and run ready callbacks, avoiding the memory and context-switching overhead of spawning thousands of OS threads."
      }
    ]
  },
  {
    id: "m03-p1-iq-2",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 2,
    question: "What is the difference between Buffer.alloc(size) and the deprecated new Buffer(size)?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "`Buffer.alloc(size)` zeroes out the allocated memory bytes before returning the buffer, guaranteeing predictable clean memory. The legacy `new Buffer(size)` (deprecated for security reasons) could return uninitialized heap memory containing leftover secrets or user data."
      },
      {
        label: "When Speed Matters",
        body: "If you need fast uninitialized allocation and will overwrite every single byte immediately before reading, use `Buffer.allocUnsafe(size)` explicitly so the risk is visible in code review."
      }
    ]
  },
  {
    id: "m03-p1-iq-3",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 3,
    question: "Why should you use Streams and stream/promises pipeline() instead of fs.readFile() for large files?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "`fs.readFile()` buffers the entire file into RAM before returning it, which crashes the process with Out-Of-Memory if multiple users download or upload gigabyte files simultaneously. Streams process data in small chunks (e.g., 64 KB) with constant memory."
      },
      {
        label: "Why pipeline() Beats .pipe()",
        body: "`stream/promises` `pipeline()` automatically propagates errors, closes all streams on failure or client disconnect (`AbortSignal`), and respects backpressure, whereas raw `.pipe()` leaves streams leaking on errors."
      }
    ]
  },
  {
    id: "m03-p1-iq-4",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 4,
    question: "Explain the execution order of synchronous code, process.nextTick(), Promise microtasks, setTimeout(0), and setImmediate().",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Microtask Priority",
        body: "After synchronous code finishes, Node drains the `process.nextTick()` queue completely first, followed by the Promise microtask (`queueMicrotask`) queue, before entering or advancing event loop macrotask phases."
      },
      {
        label: "Timers vs. Check Phase",
        body: "`setTimeout(fn, 0)` runs in the Timers phase and `setImmediate(fn)` runs in the Check phase (right after Poll). Inside an I/O callback (Poll phase), `setImmediate` deterministically runs before `setTimeout(fn, 0)`; at top-level main script, their order depends on process startup timing."
      }
    ]
  },
  {
    id: "m03-p1-iq-5",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 5,
    question: "What uses the libuv thread pool, and how can saturating UV_THREADPOOL_SIZE cause unrelated latency spikes?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "What Uses the Pool",
        body: "libuv's thread pool (default `4` threads) handles operations without universal non-blocking OS kernel APIs: `node:fs` file operations, `dns.lookup()`, CPU-heavy `node:crypto` (`pbkdf2`, `scrypt`, `randomBytes`), and `node:zlib` compression."
      },
      {
        label: "Contention Problem",
        body: "Because all these subsystems share the same 4 threads, four concurrent `pbkdf2` or `zlib` jobs will stall unrelated `fs` reads and `dns.lookup()` calls. Mitigate by tuning `UV_THREADPOOL_SIZE` to CPU core count, using `dns.resolve()` (async c-ares), or offloading heavy work to `worker_threads`."
      }
    ]
  },
  {
    id: "m03-p1-iq-6",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 6,
    question: "How does stream backpressure work internally in Node.js?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Every `Writable` stream maintains an internal queue bounded by `highWaterMark` (default 16 KB for standard streams, 64 KB for file streams). When `writable.write(chunk)` pushes buffered bytes at or above `highWaterMark`, `write()` returns `false`."
      },
      {
        label: "Pause and Drain",
        body: "The upstream `Readable` sees `false` and calls `.pause()` to stop reading from disk or socket. Once the `Writable` flushes enough bytes to the kernel and drops below `highWaterMark`, it emits `'drain'`, signaling the `Readable` to `.resume()`."
      }
    ]
  },
  {
    id: "m03-p1-iq-7",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 7,
    question: "Compare Worker Threads vs. Child Processes / Cluster in Node.js—when would you choose each?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Worker Threads",
        body: "`node:worker_threads` run separate V8 isolates inside the **same** OS process, giving faster startup, lower memory overhead, and optional zero-copy memory sharing via `SharedArrayBuffer` or `MessageChannel` transfers. Ideal for CPU-bound JavaScript tasks (image math, heavy parsing) via a fixed worker pool."
      },
      {
        label: "Child Processes / Cluster",
        body: "Separate OS processes have completely isolated virtual memory, heaps, and crash boundaries—an OOM or segfault in one process will not kill siblings. Prefer separate processes (or container replicas) for fault-isolated HTTP scaling or running external native binaries."
      }
    ]
  },
  {
    id: "m03-p1-iq-8",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 8,
    question: "How do V8 Hidden Classes (Shapes) and Inline Caches affect Node.js server performance?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Hidden Classes & Monomorphic ICs",
        body: "V8 assigns each object a hidden class (Map/Shape) describing property offsets. When a hot function always receives objects with the exact same property names initialized in the same order, V8's Inline Cache stays **monomorphic** and reads properties via direct memory offsets."
      },
      {
        label: "Deoptimization Traps",
        body: "Dynamically adding properties in different orders, using `delete obj.prop`, or passing varied object shapes turns call sites megamorphic, forcing slower dictionary lookups and TurboFan deoptimizations."
      }
    ]
  },
  {
    id: "m03-p1-iq-9",
    moduleNumber: 3,
    lessonId: "m03-p1",
    number: 9,
    question: "Architect a high-throughput Node.js file processing & streaming service that stays responsive under heavy load.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Clarify Workload Mix", body: "Separate fast I/O-bound HTTP routing from slow disk/network streaming and CPU-bound compression/parsing." },
      { title: "Keep Main Loop Free", body: "Ban `*Sync` APIs and heavy synchronous JSON/regex loops on the event loop thread; enforce event loop delay monitoring." },
      { title: "Stream Everything", body: "Use `fs.createReadStream` / `createWriteStream` connected with `stream/promises` `pipeline()` so memory stays constant (~64 KB/stream)." },
      { title: "Respect Backpressure", body: "Rely on `pipeline()` + `highWaterMark` tuning so slow client downloads pause upstream DB/disk reads automatically." },
      { title: "Use Safe Buffers", body: "Allocate buffers with `Buffer.alloc()` / `Buffer.from()`, enforcing strict max payload byte caps to prevent memory DoS." },
      { title: "Protect File Paths", body: "Validate filenames with `path.resolve()` + base-directory prefix checks and `fs.realpath()` against path traversal and symlink escapes." },
      { title: "Isolate CPU Work", body: "Run CPU-heavy transforms or cryptography in a fixed `worker_threads` pool sized to `os.availableParallelism()`." },
      { title: "Tune libuv Pool", body: "Set `UV_THREADPOOL_SIZE` to match core count if concurrent `fs`/`zlib` calls contend on the default 4 threads." },
      { title: "Support Cancellation", body: "Pass request `AbortSignal` into `pipeline()` and worker tasks so client disconnects abort downstream work immediately." },
      { title: "Scale Horizontally", body: "Run multiple isolated Node processes (containers or `cluster`) behind a load balancer for multi-core CPU utilization and crash isolation." },
      { title: "Graceful Shutdown", body: "On `SIGTERM`, stop accepting new connections, drain active pipelines within a deadline, and close worker pools cleanly." },
      { title: "Observe Runtime Metrics", body: "Export `monitorEventLoopDelay()`, V8 heap spaces (`v8.getHeapStatistics()`), active stream counts, and worker queue depth." }
    ]
  }
];
