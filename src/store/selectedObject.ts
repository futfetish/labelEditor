import { get, writable } from "svelte/store";
import { objects, type Element } from "./objects";
import { TextObject } from "../lib/objects/text";
import { BarcodeObject } from "../lib/objects/barcode";

export const selectedObject = writable<Element | null>(null);

// показывает, был ли выбран новый объект
export const isNewSelectedObject = writable(false);

// следим за изменением selectedObject по id
let lastSelectedId: string | null = null;
selectedObject.subscribe((obj) => {
  if (obj?.id !== lastSelectedId) {
    isNewSelectedObject.set(true);
    lastSelectedId = obj?.id ?? null;
  } else {
    isNewSelectedObject.set(false);
  }
});

export function setText(text: string) {
  const selected = get(selectedObject);
  if (!selected || selected.type !== "text") return;

  selected.text = text;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) =>
      el.id === selected.id && el.type === "text" ? selected : el
    )
  );
}

export function setFontSize(n: number) {
  const selected = get(selectedObject);
  if (!selected || selected.type !== "text") return;

  selected.fontSize = n;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) =>
      el.id === selected.id && el.type === "text" ? selected : el
    )
  );
}

export function setCenteredX(checked: boolean) {
  const selected = get(selectedObject);
  if (!selected || selected.type !== "text") return;

  selected.centeredX = checked;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) =>
      el.id === selected.id && el.type === "text" ? selected : el
    )
  );
}

export function setCenteredY(checked: boolean) {
  const selected = get(selectedObject);
  if (!selected || selected.type !== "text") return;

  selected.centeredY = checked;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) =>
      el.id === selected.id && el.type === "text" ? selected : el
    )
  );
}

export function setSscc(sscc: string) {
  const selected = get(selectedObject);
  if (!selected || selected.type !== "barcode") return;

  selected.sscc = sscc;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) =>
      el.id === selected.id && el.type === "barcode" ? selected : el
    )
  );
}

export function setRotation(rotation: number) {
  const selected = get(selectedObject);
  if (!selected) return;

  selected.rotation = rotation;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) =>
      el.id === selected.id ? selected : el
    )
  );
}

export function setWidth(width: number) {
  const selected = get(selectedObject);
  if (!selected) return;

  selected.width = width;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) => (el.id === selected.id ? selected : el))
  );
}

export function setHeight(height: number) {
  const selected = get(selectedObject);
  if (!selected) return;

  selected.height = height;
  selectedObject.set(selected);

  objects.update((arr) =>
    arr.map((el) => (el.id === selected.id ? selected : el))
  );
}