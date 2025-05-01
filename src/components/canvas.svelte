<script lang="ts">
  import {
    Layer,
    Rect,
    Stage,
    Text,
    Transformer,
    type KonvaDragTransformEvent,
  } from "svelte-konva";
  import { mmToPx } from "../utils/mmToPx";
  import { objects, type Element } from "../store/objects";
  import type Konva from "konva";
  import { selectedObject } from "../store/selectedObject";
  import { dpi, heightMM, widthMM } from "../store/label";

  let selectedNode: Konva.Node | null = null;
  let transformerRef: Konva.Transformer;

  function handleStageMouseDown(e: any) {
    const target = e.detail.target;

    // клик по пустому месту — сбрасываем выбор
    if (target.parent === null) {
      selectedNode = null;
      transformerRef.nodes([]);
      selectedObject.set(null);
      return;
    }

    // клик по transformer — игнорируем
    if (target.getParent()?.className === "Transformer") return;
    selectedNode = target;
    transformerRef.nodes([target]);
  }

  function onDragend(e: KonvaDragTransformEvent, obj: Element) {
    const node = e.detail.target;
    obj.x = parseFloat(node.x().toFixed(5));
    obj.y = parseFloat(node.y().toFixed(5));

    if ($selectedObject && obj.id === $selectedObject.id) {
      selectedObject.set(obj);
    }

    objects.update((arr) => [...arr]);
  }

  function onTransformend(e: KonvaDragTransformEvent, obj: Element) {
    const node = e.detail.target as Konva.Rect;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);

    obj.x = parseFloat(node.x().toFixed(5));
    obj.y = parseFloat(node.y().toFixed(5));
    obj.width = parseFloat((node.width() * scaleX).toFixed(5));
    obj.height = parseFloat((node.height() * scaleY).toFixed(5));
    obj.rotation = parseFloat(node.rotation().toFixed(5));

    if ($selectedObject && obj.id === $selectedObject.id) {
      selectedObject.set(obj);
    }

    objects.update((arr) => [...arr]);
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

  function onClickObject(obj: Element) {
    selectedObject.set(obj);
  }
</script>

<div class="stageContainer">
  <Stage
    config={{
      width: mmToPx($widthMM, $dpi),
      height: mmToPx($heightMM, $dpi),
    }}
    on:mousedown={handleStageMouseDown}
    on:touchstart={handleStageMouseDown}
  >
    <Layer>
      {#each $objects as obj, i (i)}
        {#if obj.type === "text"}
          <Text
            bind:this={obj.ref}
            on:mousedown={() => onClickObject(obj)}
            config={{
              text: obj.text,
              x: obj.x,
              y: obj.y,
              width: obj.width,
              height: obj.height,
              draggable: obj.draggable,
              wrap: "word",
              fontSize: obj.fontSize,
              align: obj.centeredX ? "center" : "left",
              verticalAlign: obj.centeredY ? "middle" : "top",
              rotation: obj.rotation,
            }}
            on:dragend={(e) => onDragend(e, obj)}
            on:transformend={(e) => onTransformend(e, obj)}
            on:transform={(e) => onTransform(e)}
          />
        {:else if obj.type === "barcode"}
          <Rect
            bind:this={obj.ref}
            on:mousedown={() => onClickObject(obj)}
            config={{
              x: obj.x,
              y: obj.y,
              width: obj.width,
              height: obj.height,
              fill: "#eee",
              stroke: "black",
              strokeWidth: 1,
              draggable: obj.draggable,
            }}
            on:dragend={(e) => onDragend(e, obj)}
            on:transformend={(e) => onTransformend(e, obj)}
            on:transform={(e) => onTransform(e)}
          />
          <Text
            config={{
              text: `aggregation barcode: ${obj.sscc}`,
              x: obj.x,
              y: obj.y,
              rotation: obj.rotation,
              align: "center",
              verticalAlign: "middle",
              fontSize: 14,
              fill: "black",
              width: obj.width,
              height: obj.height,
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
  .stageContainer {
    background-color: white;
    display: inline-block;
  }
</style>
