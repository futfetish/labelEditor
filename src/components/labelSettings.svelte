<script>

  import { dpi, heightMM, widthMM } from "../store/label";

</script>
<div>
  <h3>Параметры холста</h3>
  <div>
    <label>ширина (мм):</label>
    <input type="number" bind:value={$widthMM} />
  </div>
  <div>
    <label>высота (мм):</label>
    <input type="number" bind:value={$heightMM} />
  </div>
  <div>
    <label>dpi:</label>
    <input type="number" bind:value={$dpi} />
  </div>
</div>
