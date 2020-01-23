<script>
  import page from "page";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let navigationprop; // required

  const dispatch = createEventDispatcher();

  function RefreshListing() {
    dispatch("refresh", {
      text: navigationprop
    });
  }
</script>

<h2 class="sideBar_Content" on:click={RefreshListing}>{navigationprop}</h2>
