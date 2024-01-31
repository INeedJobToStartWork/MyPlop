import type { multiselect } from "@clack/prompts";
import z from "zod";

export type flatMultipleClack = FlatArray<Parameters<typeof multiselect>, 0>;

const flatMultipleClackZod = z.custom<flatMultipleClack>(() => true);

export const TSelectScheme = z
	.object({
		custom: z.object({
			value: z.boolean(),
			amount: z.number().min(1) // Ask how many times can ask for custom value
		}),
		multiple: z.boolean().default(false)
	})
	.and(flatMultipleClackZod);
export type TSelectInput = z.input<typeof TSelectScheme>;

export const TComponent = z.object({
	name: z.string(),
	type: z.enum(["file", "package", "repo"]),
	url: z.string(),
	src: z.string()
});

// type TComponentRepo =

export const TConfigScheme = z.object({
	components: TComponent.array()
});
