<script>
  import { objects } from "../store/objects";
  import { selectedObject } from "../store/selectedObject";
</script>

<div>
    <h3>object list</h3>
  {#each $objects as obj}
    <button on:click={() => selectedObject.set(obj)} class="button {obj.id === $selectedObject?.id ? 'active' : ''}">
      {obj.type}</button
    >
  {/each}
</div>

<style>
  .button {
    border: none;
    display: flex;
    width: 100%;
    text-align: left;
    padding: 8px;
  }

  .active{
    background-color: lightblue !important;
  }

  .button:hover {
    background-color: aliceblue;
  }
</style>
