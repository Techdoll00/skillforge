/**
 * Dev wrapper for the standalone API server.
 *
 * The upstream `dev:api` npm script sets env vars with Unix shell syntax
 * (`TRUSTED_PROXY_COUNT=1 ...`) which does not work on Windows. This wrapper
 * sets the same dev defaults programmatically, then starts the real server.
 */

process.env.TRUSTED_PROXY_COUNT ??= "1";
process.env.TELEGRAM_BOT_API_BASE_URL ??= `http://localhost:${
  process.env.TELEGRAM_TEST_API_PORT ?? "3899"
}`;

await import("./api-standalone-server.ts");
