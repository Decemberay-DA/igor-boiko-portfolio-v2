import { type Config } from "drizzle-kit"

import { env } from "~/env"

export default {
	schema: "./src/server/db/schema.ts",
	driver: "pg",
	dbCredentials: {
		connectionString: env.POSTGRES_URL,
	},
	url: env.POSTGRES_URL,
	tablesFilter: ["igor_boiko_the_dev_v2_*"],
	dialect: "postgresql",
} as Config
// } satisfies Config // lol dont working hahahahah
