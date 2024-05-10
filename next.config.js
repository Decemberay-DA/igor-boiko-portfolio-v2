/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
// const config = {};
const config = {
	// DONT FOREGET TO DISABLE IN PRODUCTION hahaha
	sourceMaps: true,
}

export default config
