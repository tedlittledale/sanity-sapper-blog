<script context="module">
  import urlBuilder from "@sanity/image-url";
  import urlFor from "../sanityImageUrlBuilder";
  import generateImage from "../generateImage";
  import client from "../sanityClient";
  import Hero from "../components/Hero.svelte";
  import CaseStudies from "../components/CaseStudies.svelte";
  import Clients from "../components/Clients.svelte";
  import About from "../components/About.svelte";
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params;
    const filter = `*[_type == "siteSettings"][0]{
        ...,
				heroImage {..., asset->}
      }`;
    const clientsFilter = `*[_type == "client"] | order(name desc){
        ...,
				mainImage {..., asset->}
      }`;
    const caseStudyFilter = `*[_type == "caseStudy"]{
        ...,
				mainImage {..., asset->}
      }`;

    const main = await client.fetch(filter).catch(err => this.error(500, err));
    const clients = await client
      .fetch(clientsFilter)
      .catch(err => this.error(500, err));
    const casestudies = await client
      .fetch(caseStudyFilter)
      .catch(err => this.error(500, err));
    const parsedClients = clients.map(({ mainImage, ...rest }) => ({
      generatedImage: generateImage(mainImage),
      ...rest
    }));
    const parsedCasestudies = casestudies.map(({ mainImage, ...rest }) => ({
      generatedImage: generateImage(mainImage),
      ...rest
    }));
    return {
      main: {
        ...main,
        generatedHeroImage: generateImage(main.heroImage)
      },
      clients: parsedClients,
      casestudies: parsedCasestudies
    };
  }
</script>

<script>
  export let main;
  export let clients;
  export let casestudies;
  export let generatedImage = main.generatedHeroImage;
  console.log({ main, clients, casestudies });
  const { title, description } = main;
</script>

<style>
  h3 {
    margin: 0;
    padding: 20px;
    background: var(--darkGrey);
    color: var(--white);
  }
  div {
    scroll-behavior: smooth;
  }
  @media screen and (prefers-reduced-motion: reduce) {
    div {
      scroll-behavior: auto;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>

</svelte:head>
<div>
  <div id="top">
    <Hero {generatedImage}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Hero>
  </div>
  <div id="about">
    <About />
  </div>
  <div id="work">
    <h3>Work</h3>
    <CaseStudies {casestudies} />
  </div>
  <div id="clients">
    <h3>Clients</h3>
    <Clients {clients} />
  </div>
</div>
