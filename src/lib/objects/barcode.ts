import { IObject } from "./IObject";

export class BarcodeObject extends IObject {
  declare type: "barcode";
  sscc: string;

  constructor(
    params: Omit<Omit<IObject, "type">, "id"> & {
      sscc: string;
    }
  ) {
    super({ ...params, type: "barcode" });
    this.sscc = params.sscc;
  }
}
