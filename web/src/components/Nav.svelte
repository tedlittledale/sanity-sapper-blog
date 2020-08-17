<script>
  import { beforeUpdate, tick } from "svelte";
  import Hamburger from "./Hamburger.svelte";
  import Logo from "./Logo.svelte";
  export let segment;
  export let sidebar = false;
  let w;
  let h;
  let scrolled = false;

  let y;
  $: if (y >= Math.round(h * 0.3)) {
    scrolled = true;
  }
  $: if (y < Math.round(h * 0.3)) {
    scrolled = false;
  }
</script>

<style lang="scss">
  nav.desktop {
    background: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    width: 100%;
    color: var(--black);
    font-weight: 300;
    padding: 0 1em;
    top: 0;
    transition: opacity 400ms ease-in-out;
    opacity: calc(1 * var(--visible));
    z-index: 10000;
  }
  nav.mobile {
    display: none;
  }
  @media only screen and (max-width: 499px) {
    nav.desktop {
      display: none;
    }
    nav.mobile {
      display: grid;
      background: var(--mobilenavbackground);
      transition: background 400ms ease-in-out;
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vw;
      z-index: 1000;
      grid: 1fr / auto auto;
      > div {
        align-self: center;
        justify-self: flex-end;
      }
    }
  }

  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid: 1fr / auto auto auto 1fr;
  }
  @media only screen and (max-width: 499px) {
    ul {
      display: none;
    }
  }
  li {
    display: block;
  }

  h5 {
    margin: 0;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(0, 0, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    color: var(--black);
  }
</style>

<svelte:window bind:scrollY={y} bind:innerHeight={h} />
<nav
  class="mobile"
  style="--mobilenavbackground:{!!segment || scrolled ? 'rgba(255, 255, 255, 0.9)' : 'none'};">
  <Logo textColor={!!segment || scrolled ? 'black' : 'white'} />
  <div>
    <Hamburger
      bind:open={sidebar}
      barColor={!!segment || scrolled ? 'black' : 'white'} />
  </div>

</nav>
<nav
  class="desktop"
  style="--visible:{!!segment || scrolled ? 1 : 0};position:{!segment ? 'fixed' : 'relative'};">

  <ul>

    <li>
      <h5>
        <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
      </h5>
    </li>
    <li>
      <h5>
        <a class={segment === 'about' ? 'selected' : ''} href="about">about</a>
      </h5>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <h5>
        <a
          rel="prefetch"
          class={segment === 'blog' ? 'selected' : ''}
          href="casestudies">
          case studies
        </a>
      </h5>
    </li>
    <li />
  </ul>
</nav>
