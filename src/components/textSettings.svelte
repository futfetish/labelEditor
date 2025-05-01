<script lang="ts">
  import {
  isNewSelectedObject,
    selectedObject,
    setCenteredX,
    setCenteredY,
    setFontSize,
    setText,
  } from "../store/selectedObject";

  let textInputRef: HTMLInputElement;

  // Следим за изменениями в selectedObject, и если тип объекта "text", ставим фокус на инпут
  $: if ($selectedObject?.type === "text"  && $isNewSelectedObject) {
    requestAnimationFrame(() => {
      textInputRef?.focus();
    });
  }
</script>

<div
  style="
      visibility: {$selectedObject?.type === 'text' ? 'visible' : 'hidden'};
      width: {$selectedObject?.type === 'text' ? 'auto' : '0px'};
      height: {$selectedObject?.type === 'text' ? 'auto' : '0px'};
      overflow: hidden;
    "
>
  <h3>text settings</h3>
  <div>
    <label>text:</label>
    <input
      on:input={(e) => setText(e.currentTarget.value)}
      bind:this={textInputRef}
      value={$selectedObject?.type === "text" ? $selectedObject.text : ""}
    />
  </div>
  <div>
    <label>font size:</label>
    <input
      on:input={(e) => setFontSize(parseInt(e.currentTarget.value))}
      type="number"
      class="fontSizeInput"
      value={$selectedObject?.type === "text" ? $selectedObject.fontSize : ""}
    />
  </div>
  <div>
    <label>Center X:</label>
    <input
      type="checkbox"
      checked={$selectedObject?.type === "text"
        ? $selectedObject.centeredX
        : false}
      on:change={(e) => setCenteredX(e.currentTarget.checked)}
    />
  </div>
  <div>
    <label>Center Y:</label>
    <input
      type="checkbox"
      checked={$selectedObject?.type === "text"
        ? $selectedObject.centeredY
        : false}
      on:change={(e) => setCenteredY(e.currentTarget.checked)}
    />
  </div>
</div>
