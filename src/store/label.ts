import { writable } from "svelte/store";

export const widthMM = writable<number>(100)
export const heightMM = writable<number>(100)
export const dpi = writable<number>(203)