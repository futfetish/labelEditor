<script lang="ts">
  import { BarcodeObject } from "../lib/objects/barcode";
  import { TextObject } from "../lib/objects/text";
  import { objects } from "../store/objects";

  const addText = () => {
    objects.update((elems) => [
      ...elems,
      new TextObject({
        text: "Sample Text",
        x: 50,
        y: 50,
        width: 200,
        height: 60,
        rotation: 0,
        draggable: true,
        ref: null,
        fontSize: 24,
        centeredX: false,
        centeredY: false,
      }),
    ]);
  };

  const addBarcode = () => {
    objects.update((elems) => [
      ...elems,
      new BarcodeObject({
        x: 100,
        y: 100,
        width: 150,
        height: 50,
        rotation: 0,
        draggable: true,
        ref: null,
        sscc: "123",
      }),
    ]);
  };
</script>

<div class="toolbar">
  <div>+</div>
  <button class="button" on:click={addText} aria-label="добавить текст"
    >Aa</button
  >
  <button class="button" on:click={addBarcode} aria-label="добавить штрихкод">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#1f1f1f"
      ><path
        d="M40-200v-560h80v560H40Zm120 0v-560h80v560h-80Zm120 0v-560h40v560h-40Zm120 0v-560h80v560h-80Zm120 0v-560h120v560H520Zm160 0v-560h40v560h-40Zm120 0v-560h120v560H800Z"
      /></svg
    >
  </button>
</div>

<style>
  .toolbar {
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }

  .button:hover {
    background-color: aliceblue;
  }
</style>
