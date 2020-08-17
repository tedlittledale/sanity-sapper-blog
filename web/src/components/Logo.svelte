<script>
  export let textColor;
</script>

<style>
  a {
    padding: 0px;
    align-self: center;
    justify-self: flex-start;
    margin-left: 20px;
    color: var(--textColor);
    transition: color 100ms ease-in-out;
  }
  h4 {
    margin: 0;
  }
</style>

<a href="/" style="--textColor:{textColor};">
  <h4>EC</h4>
</a>
