import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  tr: () => import("./dictionaries/tr.json").then((m) => m.default),
  uk: () => import("./dictionaries/uk.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["tr"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
