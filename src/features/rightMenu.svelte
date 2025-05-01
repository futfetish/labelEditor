<script>
  import LabelSettings from "../components/labelSettings.svelte";

  import ObjectSettings from "../components/objectSettings.svelte";
  import ObjectsList from "../components/objectsList.svelte";
  import { objects } from "../store/objects";
</script>

<div class="right">
    <button on:click={() => console.log($objects[0].ref)}> log </button>
  <div class="filled label-settings">
    <LabelSettings />
  </div>
  <div class="filled object-settings">
    <ObjectSettings />
  </div>
  <div class="filled" >
    <ObjectsList />
  </div>
</div>

<style>
  .filled {
    z-index: 2;
    padding: 4px;
    background-color: gray;
  }
</style>
