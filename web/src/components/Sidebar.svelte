<script>
  export let open = false;
  export let segment;
</script>

<style>
  aside {
    left: -100%;
    transition: left 0.3s ease-in-out;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: rgba(255, 255, 255, 0.95);
    z-index: 1000;
  }

  .open {
    left: 0;
  }

  ul {
    margin: 70px 0 0 30px;
    padding: 0;
    display: grid;
    grid: 1fr / 1fr;
  }

  li {
    display: block;
  }
  h5 {
    margin: 0;
  }
</style>

<aside
  class="absolute w-full h-full bg-gray-200 border-r-2 shadow-lg"
  class:open>
  <ul>

    <li>
      <h5>
        <a
          on:click={() => (open = false)}
          class={segment === undefined ? 'selected' : ''}
          href="/#">
          home
        </a>
      </h5>
    </li>
    <li>
      <h5>
        <a
          on:click={() => (open = false)}
          class={segment === 'about' ? 'selected' : ''}
          href="/#about">
          about
        </a>
      </h5>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <h5>
        <a
          on:click={() => (open = false)}
          rel="prefetch"
          class={segment === 'blog' ? 'selected' : ''}
          href="/#work">
          work
        </a>
      </h5>
    </li>
    <li />
  </ul>
</aside>
