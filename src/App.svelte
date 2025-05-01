<script lang="ts">
  import AddObjects from "./components/addObjects.svelte";
  import BarcodeSettings from "./components/barcodeSettings.svelte";
  import Canvas from "./components/canvas.svelte";
  import LabelSettings from "./components/labelSettings.svelte";
  import TextSettings from "./components/textSettings.svelte";
  import { objects } from "./store/objects";
</script>

<main class="main" >
  <div class="container">
    <div class="fixed" >
      <button on:click={() => console.log($objects)}> log</button>
      <AddObjects />
      <LabelSettings />
      <TextSettings />
      <BarcodeSettings />
    </div>
    <div class="canvas-container" >
        <Canvas />
    </div>
  
  </div>
</main>

<style>
  .main{
    width: 100%;
    height: 100%;
  }
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .fixed{
    background-color: gray;
    position: fixed;
    z-index: 2;
  }

  .canvas-container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
