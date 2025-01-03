import db from "$lib/server/db";
import { pokemonsTable } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { sql } from "drizzle-orm";

const FormSchema = z.object({
  height: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
});

export const load: PageServerLoad = async ({ url }) => {
  if (!url.searchParams.has("height") || !url.searchParams.has("weight")) {
    return;
  }

  const form = FormSchema.safeParse({
    height: url.searchParams.get("height"),
    weight: url.searchParams.get("weight"),
  });

  if (!form.success) {
    return fail(400, { message: form.error.message });
  }

  const heightInMetres = form.data.height / 100;
  const trainerBMI = form.data.weight / (heightInMetres * heightInMetres);

  const pokepal = await db
    .select()
    .from(pokemonsTable)
    .orderBy(sql`ABS(bmi-${trainerBMI}) ASC`)
    .limit(1);

  console.log(trainerBMI, pokepal);

  return {
    success: true,
    pokepal: pokepal[0],
    query: {
      height: form.data.height,
      weight: form.data.weight,
    },
  };
};
