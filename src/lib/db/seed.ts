import fs from "fs";
import path from "path";
import { parse } from "@fast-csv/parse";
import { fileURLToPath } from "url";
import { pokemonsTable } from "./schema";
import db from ".";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pokemonsData: (typeof pokemonsTable.$inferInsert)[] = [];
fs.createReadStream(
  path.resolve(__dirname, "assets", "../../../pokeapi/data/v2/csv/pokemon.csv")
)
  .pipe(parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", async (row) => {
    const heightInCM = row.height * 10; // height in decimetres, multiply by 10 to get centimetres
    const heightInM = row.height / 10; // height in decimetres, multiply by 10 to get metres
    const weightInGrams = row.weight * 100; // weight in hectograms, multiply by 100 to get grams
    const weightInKG = row.weight / 10; // weight in hectograms, divide by 10 to get kilograms
    pokemonsData.push({
      id: row.id,
      identifier: row.identifier,
      height: heightInCM,
      weight: weightInGrams,
      bmi: weightInKG / (heightInM * heightInM),
    });
  })
  .on("end", async (rowCount: number) => {
    // insert all pokemons
    await db.insert(pokemonsTable).values(pokemonsData);

    console.log(`Parsed ${rowCount} rows`);
  });
