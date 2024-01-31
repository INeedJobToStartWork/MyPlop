import { readFileSync } from "fs";

const appConfig = JSON.parse(readFileSync(`${import.meta.url}/settings.json`, "utf8"));

export default async function (plop) {
	// await plop.load(`${import.meta.url}/profiles/${appConfig.currentProfile}`);
	// await plop.load(`./profiles/${appConfig.currentProfile}`);
}
// components - Generowane przez program nie przez usera
// pnpm MyPlop
// Każdy Component zwraca installConfig który określa czym jest i dane potrzebne
// Do instalacji
// index.ts - export default function(plop){} , export const config = {}
