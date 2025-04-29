<script lang="ts">
  import { Stage, Layer, Rect, Text } from "svelte-konva";
  import { writable } from "svelte/store";
  import Konva from "konva";
  import { KonvaNodeEvent } from "konva/lib/types";

  export let widthMM = 100;
  export let heightMM = 100;
  export let dpi = 203;

  type Element =
    | { type: "text"; text: string; x: number; y: number; draggable: boolean }
    | {
        type: "barcode";
        x: number;
        y: number;
        width: number;
        height: number;
        draggable: boolean;
      };

  const elements = writable<Element[]>([]);

  const mmToPx = (mm: number, dpi: number) => (mm * dpi) / 25.4;

  let stageRef;

  const addText = () => {
    elements.update((elems) => [
      ...elems,
      {
        type: "text",
        text: "Sample Text",
        x: 50,
        y: 50,
        draggable: true,
      },
    ]);
  };

  const addBarcode = () => {
    elements.update((elems) => [
      ...elems,
      {
        type: "barcode",
        x: 100,
        y: 100,
        width: 150,
        height: 50,
        draggable: true,
      },
    ]);
  };
</script>

<div class="toolbar">
  <button on:click={addText}>Добавить текст</button>
  <button on:click={addBarcode}>Добавить баркод</button>
</div>
<div class="container">
  <Stage
    bind:this={stageRef}
    config={{
      width: mmToPx(widthMM, dpi),
      height: mmToPx(heightMM, dpi),
    }}
  >
    <Layer>
      {#each $elements as el, i (i)}
        {#if el.type === "text"}
          <Text
            config={{
              text: el.text,
              x: el.x,
              y: el.y,
              draggable: el.draggable,
            }}
            on:dragend={(e: unknown) => {
              const event = e as {
                detail?: { evt?: { x: number; y: number } };
              };
              if (event?.detail?.evt) {
                el.x = event.detail.evt.x;

                el.y = event.detail.evt.y;
              }
            }}
          />
        {:else if el.type === "barcode"}
          <Rect
            config={{
              x: el.x,
              y: el.y,
              width: el.width,
              height: el.height,
              fill: "#eee",
              stroke: "black",
              strokeWidth: 1,
              draggable: el.draggable,
            }}
            on:dragend={(e: unknown) => {
              const event = e as {
                detail?: { evt?: { x: number; y: number } };
              };
              if (event?.detail?.evt) {
                el.x = event.detail.evt.x;
                el.y = event.detail.evt.y;
              }
            }}
          />
          <Text
            config={{
              text: "aggregation_barcode",
              x: el.x + 5,
              y: el.y + 5,
              fontSize: 12,
              fill: "black",
            }}
          />
        {/if}
      {/each}
    </Layer>
  </Stage>
</div>

<style>
  .toolbar {
    margin-bottom: 10px;
  }

  button {
    margin-right: 10px;
  }

  .container {
    background-color: white;
    display: inline-b;
  }
</style>
