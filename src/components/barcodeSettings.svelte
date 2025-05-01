<script lang="ts">
  import { isNewSelectedObject, selectedObject, setSscc } from "../store/selectedObject";

  let ssccInputRef: HTMLInputElement;

  // реактивная проверка и установка фокуса
  $: if ($selectedObject?.type === "barcode" && $isNewSelectedObject) {
    requestAnimationFrame(() => {
      ssccInputRef?.focus();
    });
  }
</script>

<div
  style="
    visibility: {$selectedObject?.type === 'barcode' ? 'visible' : 'hidden'};
    width: {$selectedObject?.type === 'barcode' ? 'auto' : '0px'};
    height: {$selectedObject?.type === 'barcode' ? 'auto' : '0px'};
    overflow: hidden;
  "
>
  <div>
    <label>SSCC:</label>
    <input
      bind:this={ssccInputRef}
      on:input={(e) => setSscc(e.currentTarget.value)}
      value={$selectedObject?.type === "barcode" ? $selectedObject.sscc : ""}
    />
  </div>
</div>
