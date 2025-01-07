import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import db from "$lib/server/db";
import { pokemonsTable } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";

const heightSchema = z.coerce.number().positive();
const weightSchema = z.coerce.number().positive();

export const GET: RequestHandler = async ({ url }) => {
  const height = heightSchema.safeParse(url.searchParams.get("height") ?? null);
  const weight = weightSchema.safeParse(url.searchParams.get("weight") ?? null);

  if (!height.success) {
    return error(400, { message: height.error.issues[0].message });
  }

  if (!weight.success) {
    return error(400, { message: weight.error.issues[0].message });
  }

  const heightInMetres = height.data / 100;
  const trainerBMI = weight.data / (heightInMetres * heightInMetres);

  const pokemon = await db
    .select()
    .from(pokemonsTable)
    .orderBy(sql`ABS(bmi-${trainerBMI}) ASC`)
    .limit(1);

  return json(pokemon[0]);
};
