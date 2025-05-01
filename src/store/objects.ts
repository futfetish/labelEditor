import { writable } from "svelte/store";
import type { BarcodeObject } from "../lib/objects/barcode";
import type { TextObject } from "../lib/objects/text";



export type Element = BarcodeObject | TextObject;

export const objects = writable<Element[]>([]);