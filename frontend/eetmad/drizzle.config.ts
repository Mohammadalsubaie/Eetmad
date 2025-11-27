import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: "postgresql://eetmad_user:wPtzFX5Z7s2aNlQkxn1%2FerpSJtisLG9AopNMwMju2bc=@localhost:5432/eetmad_prod?sslmode=disable"
  },
  verbose: true
});
