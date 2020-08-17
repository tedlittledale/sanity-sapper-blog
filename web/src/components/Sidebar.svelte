<script>
  export let open = false;
</script>

<style>
  aside {
    left: -100%;
    transition: left 0.3s ease-in-out;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 1000;
  }

  .open {
    left: 0;
  }
</style>

<aside
  class="absolute w-full h-full bg-gray-200 border-r-2 shadow-lg"
  class:open>
  <nav class="p-12 text-xl">
    <a class="block" href="#about">About</a>
    <a class="block" href="#contact">Contact</a>
  </nav>
</aside>
