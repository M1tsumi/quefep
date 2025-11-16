export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>
        This section serves as the map for every public surface in Caelum. Each module has its own
        deep dive so you can focus on configuration, transport, or modeling without sifting through
        unrelated content.
      </p>

      <h2>Modules</h2>
      <ul>
        <li>
          <a href="/caelum/api/client">Client</a>. Covers configuration, lifecycle management,
          event handlers, and shutdown semantics.
        </li>
        <li>
          <a href="/caelum/api/rest">REST</a>. Details HTTP helpers, rate limits, message
          composition, and embeds.
        </li>
        <li>
          <a href="/caelum/api/gateway">Gateway</a>. Documents shards, WebSocket lifecycle,
          reconnection, and low-level events.
        </li>
        <li>
          <a href="/caelum/api/models">Models</a>. Lists the Objective-C value types for users,
          guilds, channels, roles, and snowflakes.
        </li>
        <li>
          <a href="/caelum/api/errors">Errors</a>. Explains REST error domains, gateway close
          events, and retry strategies.
        </li>
        <li>
          <a href="/caelum/api/utils">Utils</a>. Highlights logging hooks, cache helpers, and
          testing utilities.
        </li>
      </ul>

      <h2>Suggested reading order</h2>
      <ol>
        <li>Start with <a href="/caelum/api/client">Client</a> to understand the overall lifecycle.</li>
        <li>Read <a href="/caelum/api/gateway">Gateway</a> to see how events enter your app.</li>
        <li>Study <a href="/caelum/api/rest">REST</a> for sending messages and managing resources.</li>
        <li>Refer to <a href="/caelum/api/models">Models</a> as you work with entities.</li>
        <li>Consult <a href="/caelum/api/errors">Errors</a> and <a href="/caelum/api/utils">Utils</a> when hardening your app.</li>
      </ol>
    </article>
  );
}
