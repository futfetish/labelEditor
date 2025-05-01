import { IObject } from "./IObject";

export class TextObject extends IObject {
    declare type: "text"
    text: string ;
    fontSize: number;
    centeredX: boolean;
    centeredY: boolean;
  
    constructor(params: Omit<Omit<IObject, 'type'>, 'id'> & {
      text: string;
      fontSize: number;
      centeredX: boolean;
      centeredY: boolean;
    }) {
      super({ ...params, type: "text" });
      this.text = params.text;
      this.fontSize = params.fontSize;
      this.centeredX = params.centeredX;
      this.centeredY = params.centeredY;
    }
  }
  