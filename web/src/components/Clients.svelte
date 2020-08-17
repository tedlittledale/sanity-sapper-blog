<script>
  import image from "svelte-image";
  import hexToRgba from "hex-to-rgba";
  import Image from "./TileImage.svelte";
  export let clients;
</script>

<style>
  div.grid {
    background: var(--lightGrey);
  }
  article {
    position: relative;
    background: var(--genbg);
  }
  .details {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    align-items: center;
    background: var(--lightsmoke);
    width: 100%;
    height: 100%;
    padding: 10%;
    text-align: center;
  }
  h3 {
    font-size: var(--h5);
    color: var(--white);
    margin: 0;
  }
  @media only screen and (min-width: 500px) {
    .details {
      display: none;
      background: var(--smoke);
    }
    a:hover .details {
      display: grid;
    }
  }
</style>

<div class="grid tiled">
  {#each clients as { title, slug, generatedImage, generatedImage: { pallete: { lightVibrant } } }}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->

    <article style="--genbg:{hexToRgba(lightVibrant.background, '0.2')};">
      <Image {...generatedImage} cover={false} padding="25%" />

    </article>
  {/each}
</div>
