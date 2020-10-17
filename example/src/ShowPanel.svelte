<script>
  export let title;
  export let subtitle;
</script>

<style>
  panel {
    border-top: 1px solid var(--medium);
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  main-title {
    font-size: 150%;
    font-weight: bold;

    text-align: center;
    color: var(--punch);
    margin: 16px auto 0 auto;
  }
  subtitle {
    display: block;
    text-align: center;
    font-size: 16px;
    color: var(--dark);
    margin-bottom: 16px;
  }
</style>

<panel>
  {#if title}
    <main-title>{title}</main-title>
  {/if}
  {#if subtitle}
    <subtitle>{subtitle}</subtitle>
  {/if}
  <slot />
</panel>
