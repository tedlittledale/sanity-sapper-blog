<script>
  import { onMount } from "svelte";

  export let once = false;
  export let top = 0;
  export let bottom = 0;
  export let left = 0;
  export let right = 0;

  let intersecting = false;
  let visible = false;
  let outOfView = false;
  let intersectionRatio = 0;
  export let container;
  let header;
  let footer;
  let isSticky = false;
  /**
   * Sets up an intersection observer to notify when elements with the class
   * `.sticky_sentinel--top` become visible/invisible at the top of the container.
   * @param {!Element} container
   */
  const visibleTrue = () => {
    setTimeout(() => {
      console.log("asdfa");
      visible = true;
    }, 3000);
  };
  function observeHeaders(container) {
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { rootMargin: `0px 0px -${window.innerHeight / 3}px 0px` }
    );
    //document.querySelectorAll('img').forEach(img => { observer.observe(img) });
    // const observer = new IntersectionObserver(
    //   (records, observer) => {
    //     for (const record of records) {
    //       const targetInfo = record.boundingClientRect;
    //       const rootBoundsInfo = record.rootBounds;
    //       console.log({ targetInfo, rootBoundsInfo });

    //       // setTimeout(() => {
    //       //   visible = true;
    //       // }, 300);

    //       if (targetInfo.bottom < rootBoundsInfo.top) {
    //         isSticky = true;
    //       }

    //       if (
    //         targetInfo.bottom >= rootBoundsInfo.top &&
    //         targetInfo.bottom < rootBoundsInfo.bottom
    //       ) {
    //         isSticky = false;
    //       }
    //     }
    //   },
    //   {
    //     // rootMargin: '-16px',
    //     threshold: [0.01],
    //     rootMargin: "0px 0px 200px 0px"
    //   }
    //);

    observer.observe(header);
  }

  /**
   * Sets up an intersection observer to notify when elements with the class
   * `.sticky_sentinel--bottom` become visible/invisible at the botton of the
   * container.
   * @param {!Element} container
   */
  // function observeFooters(container) {
  //   const observer = new IntersectionObserver(
  //     (records, observer) => {
  //       for (const record of records) {
  //         const targetInfo = record.boundingClientRect;
  //         const stickyTarget = container;
  //         const rootBoundsInfo = record.rootBounds;
  //         const ratio = record.intersectionRatio;

  //         if (targetInfo.bottom > rootBoundsInfo.top && ratio === 1) {
  //           //fire(true, stickyTarget);
  //           isSticky = true;
  //         }

  //         if (
  //           targetInfo.top < rootBoundsInfo.top &&
  //           targetInfo.bottom < rootBoundsInfo.bottom
  //         ) {
  //           //fire(false, stickyTarget);
  //           isSticky = false;
  //         }
  //       }
  //     },
  //     {
  //       // rootMargin: '16px',
  //       // Get callback slightly before element is 100% visible/invisible.
  //       threshold: [1],
  //       rootMargin: "0px 0px -200px 0px"
  //     }
  //   );
  //   observer.observe(footer);
  // }
  onMount(() => {
    visible = false;
    if (typeof IntersectionObserver !== "undefined") {
      observeHeaders(container);
      //observeFooters(container);
    }
  });
</script>

<style>
  :root {
    --default-padding: 16px;
    --header-height: 80px;
    --sticky-pos: 10px;
  }
  div {
    position: relative;
  }
  .sticky_sentinel {
    background: yellow;
    position: absolute;
    left: 0;
    right: 0; /* needs dimensions */
    visibility: hidden;
  }
  .sticky_sentinel--top {
    /* Adjust the height and top values based on your on your sticky top position.
  e.g. make the height bigger and adjust the top so observeHeaders()'s
  IntersectionObserver fires as soon as the bottom of the sentinel crosses the
  top of the intersection container. */
    height: 40px;
    top: -24px;
  }
  .sticky_sentinel--bottom {
    bottom: 0;
    /* Height should match the top of the header when it's at the bottom of the
  intersection container. */
    height: calc(var(--header-height) + var(--default-padding));
  }
</style>

<div bind:this={container}>
  <slot {intersecting} {intersectionRatio} {visible} {outOfView} {isSticky} />
  <div class="sticky_sentinel sticky_sentinel--top" bind:this={header} />
  <div class="sticky_sentinel sticky_sentinel--bottom" bind:this={footer} />
</div>
