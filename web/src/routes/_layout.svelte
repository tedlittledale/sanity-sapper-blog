<script>
  import Nav from "../components/Nav.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  export let segment;
  let open = false;
</script>

<style>

</style>

<Sidebar bind:open />
<Nav {segment} bind:sidebar={open} />

<main>
  <slot />
</main>
