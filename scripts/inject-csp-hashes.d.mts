/**
 * Type surface for scripts/inject-csp-hashes.mjs — consumed by
 * src/csp-build-contract.test.ts (the .mjs itself is intentionally outside
 * tsc's `include` so it stays a plain Node build step).
 */
export declare function extractInlineScripts(html: string): string[];
export declare function sha256(body: string): string;
export declare function rewriteScriptSrc(html: string, hashes: string[]): string;
