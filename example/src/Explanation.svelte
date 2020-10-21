<style>
  para {
    display: block;
    margin: 16px 32px;
    font-size: var(--font-regular);
    text-indent: 24px;
  }
  .center {
    text-align: center;
  }
  explanation-panel img {
    margin-bottom: 0;
  }
  a {
    text-decoration: none;
    color: var(--dark);
  }
</style>

<explanation-panel>
  <div class="center" style="margin-top:24px">
    <a href="https://github.com/relm-us/svelt-yjs">
      <img width="32" src="/github-logo.svg" alt="github" />
      <div style="color:black">Get Svelt-yjs</div>
    </a>
  </div>
  <para>
    <a href="https://github.com/relm-us/svelt-yjs">Svelt-yjs</a>
    is a library for your Svelte app that lets you build Svelte stores from Yjs
    types. When built on the client-side Yjs library, your Svelte app gets
    transport-agnostic synchronization across networks (e.g.
    <a href="https://github.com/yjs/y-webrtc">y-webrtc</a>,
    <a href="https://github.com/yjs/y-websocket">y-websocket</a>, etc.) and
    undo/redo management basically for free.
  </para>
  <para>
    <a href="https://yjs.dev">Yjs</a>
    is often thought of as a way to make collaborative text editing work in a
    browser, but its underlying technology is amenable to a variety of web use
    cases. We think
    <a href="https://svelte.dev">Svelte</a>
    and Yjs are positioned to make collaborative,
    <a href="https://www.inkandswitch.com/local-first.html">local-first</a>
    apps much easier to build.
  </para>
  <para>
    At
    <a href="https://github.com/relm-us">Relm</a>, for example, we've been using
    it as the synchronization layer between participants in a
    <a href="https://www.relm.us">collaborative 3D world</a>.
  </para>
</explanation-panel>
