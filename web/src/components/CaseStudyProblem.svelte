<script>
  import hexToRgba from "hex-to-rgba";
  import Image from "./Image.svelte";
  import BlockContent from "@movingbrands/svelte-portable-text";
  import IntersectionObserver from "./IntersectionObserver.svelte";
  import serializers from "./serializers";

  import { beforeUpdate, tick } from "svelte";
  export let caseStudy;
  const {
    problemSummary,
    problemDetail,
    mainImage: {
      asset: {
        metadata: { palette }
      }
    }
  } = caseStudy;
  let w;
  let h;
  let scrolled = false;

  let y;
  $: if (y >= Math.round(h * 0.7)) {
    scrolled = true;
  }
  $: if (y < Math.round(h * 0.7)) {
    scrolled = false;
  }
</script>

<style>
  .gradient-border {
    --border-width: 3px;

    position: relative;
    background: var(--lightGrey);
    border-radius: var(--border-width);
  }
  .gradient-border::after {
    position: absolute;
    content: "";
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(
      90deg,
      var(--lightGrey),
      var(--lightGrey),
      var(--lightGrey),
      var(--darkerGrey),
      var(--darkerGrey)
    );
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: calc(2 * var(--border-width));
  }
  .visible .gradient-border::after {
    animation: moveGradient 800ms 1 forwards;
  }
  @keyframes moveGradient {
    0% {
      background-position: 0 40%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  section {
    margin-top: 40px;
  }
  h2 {
    margin: 0 0 10px;
    opacity: 0.1;
  }
  h3 {
    color: var(--darkerGrey);
    margin: 0 0 10px;
    opacity: 0.1;
  }
  .visible h2,
  .visible h3 {
    transition: opacity 800ms ease-in-out;
    opacity: 1;
  }
  /* blockquote {
    padding: 0;
    margin: 0;
    font-size: var(--h4);
    quotes: "“" "”" "‘" "’";
    position: relative;
    overflow: visible;
  }
  blockquote::before {
    content: open-quote;
    display: grid;
    align-self: start;
    font-size: var(--h2);
    padding: 0 5px;
    margin: 0;
    position: absolute;
    left: -40px;
    top: -20px;
  }
  blockquote::after {
    content: close-quote;
    font-size: var(--h2);
    padding: 0 5px;
    align-self: end;
    margin: 0;
    height: 64px;
    position: absolute;
    bottom: 0px;
    right: -20px;
  } */
  .summary {
    padding: 20px 10%;
    display: grid;
    grid: 1fr / 1fr;
    grid-gap: 20px;
    align-items: start;
    /* position: sticky; */
    top: 0;
    opacity: var(--detailOpacity);
  }
  .summary div {
    padding: 30px 5%;
  }
  .detail {
    padding: 40px 15%;
  }
  .box > * {
    align-content: start;
  }
</style>

<IntersectionObserver
  let:intersecting
  let:visible
  let:intersectionRatio
  let:outOfView
  let:isSticky>
  <section
    class="problem {visible ? 'visible' : ''}"
    style="--detailHeight:{isSticky ? 0 : 'auto'};--detailOpacity:{isSticky ? 0.3 : 1};--boxBorder:{palette.darkVibrant.background};--textColor:{hexToRgba(palette.darkVibrant.foreground, '1')};">
    <div class="summary">
      <div class="gradient-border">
        <h2>The Problem</h2>
        <h3>{problemSummary}</h3>
      </div>
    </div>
    <div class="detail">
      <BlockContent blocks={problemDetail} {serializers} />
    </div>
  </section>
</IntersectionObserver>
