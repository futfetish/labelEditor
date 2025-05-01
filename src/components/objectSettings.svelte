<script lang="ts">
  import {
    selectedObject,
    setHeight,
    setRotation,
    setWidth,
    setX,
    setY,
  } from "../store/selectedObject";
  import BarcodeSettings from "./barcodeSettings.svelte";
  import TextSettings from "./textSettings.svelte";
</script>

<div>
  {#if $selectedObject}
    <h3>object settings ({$selectedObject.type})</h3>

    <div>
      <label>x:</label>
      <input
        type="number"
        value={$selectedObject?.x ?? 0}
        on:input={(e) => setX(parseFloat(e.currentTarget.value))}
        step="0.00001"
      />
    </div>

    <div>
      <label>y:</label>
      <input
        type="number"
        value={$selectedObject?.y ?? 0}
        on:input={(e) => setY(parseFloat(e.currentTarget.value))}
        step="0.00001"
      />
    </div>

    <div>
      <label>width:</label>
      <input
        type="number"
        value={$selectedObject.width}
        on:input={(e) => setWidth(Number(e.currentTarget.value))}
      />
    </div>

    <div>
      <label>height:</label>
      <input
        type="number"
        value={$selectedObject.height}
        on:input={(e) => setHeight(Number(e.currentTarget.value))}
      />
    </div>

    <div>
      <label>rotation:</label>
      <input
        type="number"
        value={$selectedObject.rotation}
        on:input={(e) => setRotation(Number(e.currentTarget.value))}
      />
    </div>
    
    <TextSettings />
    <BarcodeSettings />
  {/if}
</div>
