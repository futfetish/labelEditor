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
  let seletedTextElement: TextElement | null = null;
  let seletedBarcodeElement: BarcodeElement | null = null;
  let textInputRef: HTMLInputElement;
  let ssccInputRef: HTMLInputElement;

  type BaseElement = {
    id: string;
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
    fontSize: number;
    centeredX: boolean;
    centeredY: boolean;
  };

  type BarcodeElement = BaseElement & {
    type: "barcode";
    width: number;
    height: number;
    sscc: string; // добавлено поле sscc
  };

  type Element = TextElement | BarcodeElement;

  const elements = writable<Element[]>([]);

  const addText = () => {
    elements.update((elems) => [
      ...elems,
      {
        id: crypto.randomUUID(),
        type: "text",
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
      },
    ]);
  };

  const addBarcode = () => {
    elements.update((elems) => [
      ...elems,
      {
        id: crypto.randomUUID(),
        type: "barcode",
        x: 100,
        y: 100,
        width: 150,
        height: 50,
        rotation: 0,
        draggable: true,
        ref: null,
        sscc: "123",
      },
    ]);
  };

  function handleStageMouseDown(e: any) {
    const target = e.detail.target;

    // клик по пустому месту — сбрасываем выбор
    if (target.parent === null) {
      selectedNode = null;
      transformerRef.nodes([]);
      setSelectedTextElement(null);
      setSelectedBarcodeElement(null); // сбрасываем выбранный баркод
      return;
    }

    // клик по transformer — игнорируем
    if (target.getParent()?.className === "Transformer") return;
    selectedNode = target;
    transformerRef.nodes([target]);

    if (target instanceof Konva.Text) {
      setSelectedBarcodeElement(null); // сбрасываем выбранный баркод
    } else if (target instanceof Konva.Rect) {
      setSelectedTextElement(null); // сбрасываем выбранный текст
    }
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
    node.scaleX(1);
    node.scaleY(1);

    el.x = node.x();
    el.y = node.y();
    el.width = node.width() * scaleX;
    el.height = node.height() * scaleY;
    el.rotation = node.rotation();

    elements.update((arr) => [...arr]);
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

  function setText(text: string) {
    if (seletedTextElement === null) return;

    elements.update((arr) =>
      arr.map((el) => {
        if (el.type === "text" && el.id === seletedTextElement!.id) {
          return { ...el, text };
        }
        return el;
      })
    );
  }

  function setFontSize(n: number) {
    if (seletedTextElement === null) return;

    elements.update((arr) =>
      arr.map((el) => {
        if (el.type === "text" && el.id === seletedTextElement!.id) {
          return { ...el, fontSize: n };
        }
        return el;
      })
    );
  }

  function setCenteredX(checked: boolean) {
    if (seletedTextElement === null) return;
    seletedTextElement.centeredX = checked;

    elements.update((arr) =>
      arr.map((el) => {
        if (el.type === "text" && el.id === seletedTextElement!.id) {
          return { ...el, centeredX: checked };
        }
        return el;
      })
    );
  }

  function setCenteredY(checked: boolean) {
    if (seletedTextElement === null) return;
    seletedTextElement.centeredY = checked;

    elements.update((arr) =>
      arr.map((el) => {
        if (el.type === "text" && el.id === seletedTextElement!.id) {
          return { ...el, centeredY: checked };
        }
        return el;
      })
    );
  }

  async function setSelectedTextElement(el: TextElement | null) {
    seletedTextElement = el;
    if (el) {
      requestAnimationFrame(() => {
        textInputRef.focus();
      });
    }
  }

  async function setSelectedBarcodeElement(el: BarcodeElement | null) {
    seletedBarcodeElement = el;
    if (el) {
      requestAnimationFrame(() => {
        ssccInputRef.focus();
      });
    }
  }

  function setSscc(sscc: string) {
    if (seletedBarcodeElement === null) return;

    elements.update((arr) =>
      arr.map((el) => {
        if (el.type === "barcode" && el.id === seletedBarcodeElement!.id) {
          return { ...el, sscc };
        }
        return el;
      })
    );
  }
</script>

<div class="container">
  <div>
    <div class="toolbar">
      <button on:click={addText}>Добавить текст</button>
      <button on:click={addBarcode}>Добавить баркод</button>
    </div>

    <div class="logElements" on:click={() => logElements()}>log elements</div>

    <div>
        <h3>Параметры холста</h3>
        <div>
          <label>ширина (мм):</label>
          <input type="number" bind:value={widthMM} />
        </div>
        <div>
          <label>высота (мм):</label>
          <input type="number" bind:value={heightMM} />
        </div>
        <div>
          <label>dpi:</label>
          <input type="number" bind:value={dpi} />
        </div>
      </div>

    <div
      style="
    visibility: {seletedTextElement ? 'visible' : 'hidden'};
    width: {seletedTextElement ? 'auto' : '0px'};
    height: {seletedTextElement ? 'auto' : '0px'};
    overflow: hidden;
  "
    >
      <h3>text settings</h3>
      <div>
        <label>text:</label>
        <input
          on:input={(e) => setText(e.currentTarget.value)}
          bind:this={textInputRef}
          value={seletedTextElement?.text}
        />
      </div>
      <div>
        <label> font size:</label>
        <input
          on:input={(e) => setFontSize(parseInt(e.currentTarget.value))}
          type="number"
          class="fontSizeInput"
          value={seletedTextElement?.fontSize}
        />
      </div>
      <div>
        <label>Center X:</label>
        <input
          type="checkbox"
          checked={seletedTextElement?.centeredX}
          on:change={(e) => setCenteredX(e.currentTarget.checked)}
        />
      </div>
      <div>
        <label>Center Y:</label>
        <input
          type="checkbox"
          checked={seletedTextElement?.centeredY}
          on:change={(e) => setCenteredY(e.currentTarget.checked)}
        />
      </div>
    </div>

    <div
      style="
    visibility: {seletedBarcodeElement ? 'visible' : 'hidden'};
    width: {seletedBarcodeElement ? 'auto' : '0px'};
    height: {seletedBarcodeElement ? 'auto' : '0px'};
    overflow: hidden;
  "
    >
      <h3>barcode settings</h3>
      <div>
        <label>SSCC:</label>
        <input
          bind:this={ssccInputRef}
          on:input={(e) => setSscc(e.currentTarget.value)}
          value={seletedBarcodeElement?.sscc}
        />
      </div>
    </div>
  </div>

  <div class="stageContainer">
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
              on:mousedown={() => setSelectedTextElement(el)}
              config={{
                text: el.text,
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height,
                draggable: el.draggable,
                wrap: "word",
                fontSize: el.fontSize,
                align: el.centeredX ? "center" : "left",
                verticalAlign: el.centeredY ? "middle" : "top",
              }}
              on:dragend={(e) => onDragend(e, el)}
              on:transformend={(e) => onTransformend(e, el)}
              on:transform={(e) => onTransform(e)}
            />
          {:else if el.type === "barcode"}
            <Rect
              bind:this={el.ref}
              on:mousedown={() => setSelectedBarcodeElement(el)}
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
              on:dragend={(e) => onDragend(e, el)}
              on:transformend={(e) => onTransformend(e, el)}
              on:transform={(e) => onTransform(e)}
            />
            <Text
              config={{
                text: `aggregation barcode: ${el.sscc}`,
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
</div>

<style>
  .toolbar {
    margin-bottom: 10px;
  }

  button {
    margin-right: 10px;
  }

  .container {
    display: flex;
  }

  .stageContainer {
    background-color: white;
    display: inline-block;
  }

  .fontSizeInput {
    width: 50px;
  }

  .logElements {
    cursor: pointer;
  }
</style>
