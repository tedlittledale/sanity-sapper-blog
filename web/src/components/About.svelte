<script>
  import image from "svelte-image";
</script>

<style>
  div.wrap {
    background: var(--grey);
  }
  section {
    display: grid;
    place-items: center;
    padding: var(--sectionPadding);
  }
  section > div {
    text-align: left;
  }

  h2 {
    font-size: var(--h6);
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 0 0rem;
  }
  p {
    font-size: var(--h3);
    font-family: var(--headingFont);
    letter-spacing: 2px;
    line-height: 1.2;
  }
</style>

<div class="wrap">
  <section>
    <div>
      <h2>HI THERE</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, vitae
        tenetur? Quidem sint ullam explicabo veniam, voluptatum dolorem
        voluptatem minima dolorum magnam expedita!
      </p>
    </div>
  </section>
</div>
