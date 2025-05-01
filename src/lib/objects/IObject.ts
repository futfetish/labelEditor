import Konva from "konva";

export class IObject {
  id: string;
  type: "text" | "barcode";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  draggable: boolean;
  ref: Konva.Node | null;

  constructor(params: {
    type: "text" | "barcode";
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    draggable: boolean;
    ref?: Konva.Node | null;
  }) {
    this.id = crypto.randomUUID();
    this.type = params.type;
    this.x = params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;
    this.rotation = params.rotation;
    this.draggable = params.draggable;
    this.ref = params.ref ?? null;
  }
}