<script>

  import { dpi, heightMM, widthMM } from "../store/label";

</script>
<div>
  <h3>label settings</h3>
  <div>
    <label>width (mm):</label>
    <input type="number" bind:value={$widthMM} />
  </div>
  <div>
    <label>height (mm):</label>
    <input type="number" bind:value={$heightMM} />
  </div>
  <div>
    <label>dpi:</label>
    <input type="number" bind:value={$dpi} />
  </div>
</div>
