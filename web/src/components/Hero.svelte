<script>
  import image from "svelte-image";
  export let generatedImage;
</script>

<style>
  div.wrap {
    background-image: var(--placeholder);
    background-size: cover;
    background-position: center center;
  }
  section {
    background-image: var(--image);
    background-size: cover;
    background-position: center center;
    display: grid;
    place-items: center;
    min-height: 100vh;
  }
</style>

<div
  class="wrap"
  style="--placeholder:url({generatedImage.placeholder});--image:url({generatedImage.src});">
  <section>
    <div>
      <slot />
    </div>

  </section>
</div>
