<script lang="ts">
  import {
    Stage,
    Layer,
    Rect,
    Text,
    Transformer,
    type KonvaDragTransformEvent,
  } from "svelte-konva";
  import { writable } from "svelte/store";
  import Konva from "konva";

  export let widthMM = 100;
  export let heightMM = 100;
  export let dpi = 203;

  const mmToPx = (mm: number, dpi: number) => (mm * dpi) / 25.4;
  let transformerRef: Konva.Transformer;
  let selectedNode: Konva.Node | null = null;

  type BaseElement = {
    type: "text" | "barcode";
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    draggable: boolean;
    ref: Konva.Node | null;
  };

  type TextElement = BaseElement & {
    type: "text";
    text: string;
  };

  type BarcodeElement = BaseElement & {
    type: "barcode";
    width: number;
    height: number;
  };

  type Element = TextElement | BarcodeElement;

  const elements = writable<Element[]>([]);

  const addText = () => {
    elements.update((elems) => [
      ...elems,
      {
        type: "text",
        text: "Sample Text",
        x: 50,
        y: 50,
        width: 200,
        height: 60,
        rotation: 0,
        draggable: true,
        ref: null,
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
        rotation: 0,
        draggable: true,
        ref: null,
      },
    ]);
  };

  function handleStageMouseDown(e: any) {
    const target = e.detail.target;

    // клик по пустому месту — сбрасываем выбор
    if (target.parent === null) {
      selectedNode = null;
      transformerRef.nodes([]);
      return;
    }

    // клик по transformer — игнорируем
    if (target.getParent()?.className === "Transformer") return;

    selectedNode = target;
    transformerRef.nodes([target]);
  }

  function onDragend(e: KonvaDragTransformEvent, el: Element) {
    const node = e.detail.target;
    el.x = node.x();
    el.y = node.y();
    elements.update((arr) => [...arr]);
  }

  function onTransformend(e: KonvaDragTransformEvent, el: Element) {
    const node = e.detail.target as Konva.Rect;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    switch (el.type) {
      case "barcode":
        node.scaleX(1);
        node.scaleY(1);

        el.x = node.x();
        el.y = node.y();
        el.width = node.width() * scaleX;
        el.height = node.height() * scaleY;
        el.rotation = node.rotation();

        elements.update((arr) => [...arr]);
        console.log($elements);
        break;
      //   case "text":
      //     el.x = node.x();
      //     el.y = node.y();
      //     el.width = node.width() * scaleX;
      //     el.height = node.height() * scaleY;
      //     el.rotation = node.rotation();

      //     elements.update((arr) => [...arr]);
      //     console.log($elements);
      //     break;
      default:
        node.scaleX(1);
        node.scaleY(1);

        el.x = node.x();
        el.y = node.y();
        el.width = node.width() * scaleX;
        el.height = node.height() * scaleY;
        el.rotation = node.rotation();

        elements.update((arr) => [...arr]);
        console.log($elements);
        break;
    }
  }

  function onTransform(e: KonvaDragTransformEvent) {
    const self = e.detail.target;
    if (self) {
      self.setAttrs({
        width: self.width() * self.scaleX(),
        height: self.height() * self.scaleY(),
        scaleX: 1,
        scaleY: 1,
      });
    }
  }
</script>

<div class="toolbar">
  <button on:click={addText}>Добавить текст</button>
  <button on:click={addBarcode}>Добавить баркод</button>
</div>

<div class="container">
  <Stage
    config={{
      width: mmToPx(widthMM, dpi),
      height: mmToPx(heightMM, dpi),
    }}
    on:mousedown={handleStageMouseDown}
    on:touchstart={handleStageMouseDown}
  >
    <Layer>
      {#each $elements as el, i (i)}
        {#if el.type === "text"}
          <Text
            bind:this={el.ref}
            config={{
              text: el.text,
              x: el.x,
              y: el.y,
              width: el.width,
              height: el.height,
              draggable: el.draggable,
              wrap: "word",
            }}
            on:dragend={(e) => {
              onDragend(e, el);
            }}
            on:transformend={(e) => {
              onTransformend(e, el);
            }}
            on:transform={(e) => {
              onTransform(e);
            }}
          />
        {:else if el.type === "barcode"}
          <Rect
            bind:this={el.ref}
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
            on:dragend={(e) => {
              onDragend(e, el);
            }}
            on:transformend={(e) => {
              onTransformend(e, el);
            }}
            on:transform={(e) => {
              onTransform(e);
            }}
            on:transform
          />
          <Text
            config={{
              text: "aggregation_barcode",
              x: el.x,
              y: el.y,
              rotation: el.rotation,
              align: "center",
              verticalAlign: "middle",
              fontSize: 14,
              fill: "black",
              width: el.width,
              height: el.height,

              listening: false,
            }}
          />
        {/if}
      {/each}
      <Transformer bind:handle={transformerRef} />
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
    display: inline-block;
  }
</style>
