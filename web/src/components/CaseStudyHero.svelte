<script context="module">
  import hexToRgba from "hex-to-rgba";
  import Image from "./Image.svelte";
</script>

<script>
  export let caseStudy;
  let windowHeight;
  const {
    mainImage: {
      asset: {
        metadata: { palette }
      }
    }
  } = caseStudy;
  console.log({ palette });
</script>

<style>
  .hero {
    position: relative;
  }
  .heroText {
    position: absolute;
    display: grid;
    width: 100%;
    height: 100%;
    justify-items: end;
    align-items: end;
    z-index: 10;
    box-sizing: border-box;
  }
  @media only screen and (min-width: 500px) {
    .heroText {
      padding: 0% 0% 5% 25%;
    }
  }
  h1 {
    background: var(--textBg);
    color: var(--textColor);
    padding: 20px 40px;
    border-radius: 0px 0 0 0px;
  }
  .image {
    height: var(--heroHeight);
    width: auto;
    overflow: hidden;
    align-content: center;
    background: red;
  }

  .image > div {
    height: 100%;
  }
  @media only screen and (min-width: 499px) {
    .image > div {
      width: 100%;
      height: auto;
    }
  }
</style>

<svelte:window bind:innerHeight={windowHeight} />
<section
  class="hero"
  style="--heroHeight:{windowHeight - 38}px;--textBg:{hexToRgba('#fff', '0.7')};--textColor:{hexToRgba('#000', '1')};">
  <div class="heroText">
    <h1>{caseStudy.title}</h1>
  </div>
  <div class="image">
    <div>
      <Image {...caseStudy.generatedMainImage} />
    </div>
  </div>

</section>
