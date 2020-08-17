<script context="module">
  import client from "../../sanityClient";
  export function preload({ params, query }) {
    return client
      .fetch(
        '*[_type == "caseStudy" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)'
      )
      .then(caseStudys => {
        return { caseStudys };
      })
      .catch(err => this.error(500, err));
  }
</script>

<script>
  export let caseStudys;

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#each caseStudys as caseStudy}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li>
      <a rel="prefetch" href="casestudies/{caseStudy.slug.current}">
        {caseStudy.title}
      </a>
      ({formatDate(caseStudy.publishedAt)})
    </li>
  {/each}
</ul>
