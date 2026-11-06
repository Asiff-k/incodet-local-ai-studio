import { visible } from "./visible";

/** Only real, verifiable reviews go here. Never add samples. */
export type Review = { name: string; business: string; quote: string; todo?: boolean };

const all: Review[] = [];

export const reviews = visible(all, ["name", "business", "quote"]);
