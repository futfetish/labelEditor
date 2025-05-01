<script lang="ts">
  import { selectedObject, setRotation } from "../store/selectedObject";
  import BarcodeSettings from "./barcodeSettings.svelte";
  import TextSettings from "./textSettings.svelte";
</script>

<div>
  {#if $selectedObject}
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
