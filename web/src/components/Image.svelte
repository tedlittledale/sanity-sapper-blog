<script>
  import "lazysizes";

  export let aspectRatio;
  export let placeholder;
  export let src;
  export let srcset;
  export let alt;
  export let sizes = "auto"; // 'auto' only works when using `lazysizes`

  let padding_bottom_percentage = 100 / aspectRatio + "%";
</script>

<style>
  .wrapper {
    position: relative;
    overflow: hidden;
    height: 100%;
  }

  .aspect-ratio-holder {
    --pb: 100%;
    padding-bottom: var(--pb);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: 100%;
  }
</style>

<div class="wrapper">
  <div class="aspect-ratio-holder" style="--pb:{padding_bottom_percentage}" />

  <img
    class="lazyload"
    {src}
    srcset={placeholder}
    data-srcset={srcset}
    {sizes}
    {alt} />

  <noscript>
    <img {src} {srcset} {sizes} {alt} />
  </noscript>
</div>
