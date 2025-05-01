<script lang="ts">
  import { selectedObject, setHeight, setRotation, setWidth } from "../store/selectedObject";
  import BarcodeSettings from "./barcodeSettings.svelte";
  import TextSettings from "./textSettings.svelte";
</script>

<div>
  {#if $selectedObject}
  <h3>object settings ({$selectedObject.type}) </h3>
    <div>
      <label>rotation:</label>
      <input
        type="number"
        value={$selectedObject.rotation}
        on:input={(e) => setRotation(Number(e.currentTarget.value))}
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

    <TextSettings />
    <BarcodeSettings />
  {/if}
</div>
