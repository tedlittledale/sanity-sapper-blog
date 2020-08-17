<script>
  export let open = false;
  export let barColor;
</script>

<style>
  svg {
    min-height: 24px;
    transition: transform 0.3s ease-in-out;
    fill: none;
  }

  svg line {
    stroke: var(--barColor);
    stroke-width: 6;
    transition: transform 0.3s ease-in-out, stroke 400ms ease-in-out;
  }
  .open svg line {
    stroke: var(--black);
  }

  button {
    background: none;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 20px;
    outline: none;
    align-self: center;
    justify-self: flex-end;
  }

  @media only screen and (min-width: 500px) {
    button {
      display: none;
    }
  }

  .open svg {
    transform: scale(0.7);
  }

  .open #top {
    transform: translate(6px, 0px) rotate(45deg);
  }

  .open #middle {
    opacity: 0;
  }

  .open #bottom {
    transform: translate(-20px, 6px) rotate(-45deg);
  }
</style>

<button
  class:open
  on:click={() => (open = !open)}
  style="--barColor:{barColor};">
  <svg width="32" height="36">
    <line id="top" x1="0" y1="6" x2="32" y2="6" />
    <line id="middle" x1="0" y1="18" x2="24" y2="18" />
    <line id="bottom" x1="0" y1="30" x2="32" y2="30" />
  </svg>
</button>
