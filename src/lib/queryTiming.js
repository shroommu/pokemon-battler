import { performance } from "node:perf_hooks";

const shouldLogTimings = process.env.LOG_DB_TIMINGS === "true";

export async function timedQuery(queryName, queryFn) {
  if (!shouldLogTimings) {
    return queryFn();
  }

  const start = performance.now();
  try {
    return await queryFn();
  } finally {
    const durationMs = Math.round((performance.now() - start) * 100) / 100;
    console.log(`[db-timing] ${queryName}: ${durationMs}ms`);
  }
}
