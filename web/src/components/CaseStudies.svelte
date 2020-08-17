<script>
  import image from "svelte-image";
  import hexToRgba from "hex-to-rgba";
  import Image from "./TileImage.svelte";
  export let casestudies;
</script>

<style>
  div.grid {
    background: var(--lightGrey);
    padding: 40px;
    grid-gap: 40px;
  }
  article {
    position: relative;
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
    background: rgba(0, 0, 0, 0.8);
    padding: 10px 15px;
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
  {#each casestudies as { title, slug, generatedImage, generatedImage: { pallete: { lightVibrant } } }}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <div>
      <a
        rel="prefetch"
        href="casestudies/{slug.current}"
        style="--lightsmoke:{hexToRgba(lightVibrant.background, '0.2')};--smoke:{hexToRgba(lightVibrant.background, '0.5')};--solidSmoke:{hexToRgba(lightVibrant.background, '1')};">
        <article>
          <Image {...generatedImage} />
          <div class="details">
            <h3>{title}</h3>
          </div>

        </article>
      </a>
    </div>
  {/each}
</div>
