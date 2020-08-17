<script>
  import "lazysizes";

  export let aspectRatio;
  export let placeholder;
  export let src;
  export let srcset;
  export let alt;
  export let cover = true;
  export let padding = 0;
  export let sizes = "auto"; // 'auto' only works when using `lazysizes`

  let padding_bottom_percentage = 100 / aspectRatio + "%";
</script>

<style>
  .wrapper {
    position: absolute;
    overflow: hidden;
    width: 100%;
    padding-bottom: 100%;
    position: relative;
  }
  .inner {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: var(--pad);
  }
  img {
    object-fit: var(--fit);
    height: 100%;
    width: 100%;
  }
</style>

<div
  class="wrapper"
  style="--fit:{cover ? 'cover' : 'contain'};--pad:{padding}">
  <div class="inner">
    <img
      class="lazyload"
      {src}
      srcset={placeholder}
      data-srcset={srcset}
      {sizes}
      {alt} />
  </div>
  <noscript>
    <img {src} {srcset} {sizes} {alt} />
  </noscript>
</div>
