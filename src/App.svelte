<script lang="ts">
  import Canvas from "./components/canvas.svelte";
  import LeftMenu from "./features/leftMenu.svelte";
  import RightMenu from "./features/rightMenu.svelte";
</script>

<main class="main">
  <div class="container">
    <div class="fixed">
      <LeftMenu />
      <RightMenu />
    </div>
    <div class="canvas-container">
      <Canvas />
    </div>
  </div>
</main>

<style>
  .main {
    width: 100%;
    height: 100%;
  }
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .fixed {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .canvas-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
