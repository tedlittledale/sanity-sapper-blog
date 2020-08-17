<script context="module">
  import Image from "../../components/Image.svelte";
  import urlBuilder from "@sanity/image-url";
  import urlFor from "../../sanityImageUrlBuilder";
  import generateImage from "../../generateImage";
  import client from "../../sanityClient";
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "../../components/serializers";
  import CaseStudyHero from "../../components/CaseStudyHero.svelte";
  import CaseStudyProblem from "../../components/CaseStudyProblem.svelte";
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params;
    const filter = `*[_type == "caseStudy" && slug.current == $slug][0]{
        ...,
				mainImage {..., asset->}
			}`;
    const projection = `{
      ...,
      body[]{
        ...,
        children[]{
          ...,
          _type == 'authorReference' => {
            _type,
            author->
          }
        }
      }
    }`;

    const query = filter + projection;
    const caseStudy = await client
      .fetch(query, { slug })
      .catch(err => this.error(500, err));
    console.log({ caseStudy });
    return {
      caseStudy: {
        ...caseStudy,
        generatedMainImage: generateImage(caseStudy.mainImage)
      }
    };
  }
</script>

<script>
  export let caseStudy;
  let h;
  console.log({ caseStudy });
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
    justify-items: center;
    align-items: center;
    z-index: 10;
  }
  div > div {
    height: var(--height);
  }
</style>

<svelte:head>
  <title>{caseStudy.title}</title>
</svelte:head>
<div bind:clientHeight={h} style="--pageHeight:{h}px;">
  <div>

    <CaseStudyHero {caseStudy} />
    <CaseStudyProblem {caseStudy} />
    <CaseStudyProblem {caseStudy} />
  </div>
</div>
<!-- <div class="content">
  <BlockContent blocks={caseStudy.problemDetail} {serializers} />
</div> -->
