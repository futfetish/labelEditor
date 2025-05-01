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
      new BarcodeObject( {
        x: 100,
        y: 100,
        width: 150,
        height: 50,
        rotation: 0,
        draggable: true,
        ref: null,
        sscc: "123",
      })
     
    ]);
  };
</script>

<div class="toolbar">
  <button on:click={addText}>Добавить текст</button>
  <button on:click={addBarcode}>Добавить баркод</button>
</div>
