export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>
        This section documents the main building blocks of Caelum: the high-level client, the REST
        and Gateway layers, the core models, and supporting utilities.
      </p>

      <h2>Modules</h2>
      <ul>
        <li>
          <a href="/caelum/api/client">Client</a> &mdash; configuration, lifecycle, event handlers,
          and shutdown.
        </li>
        <li>
          <a href="/caelum/api/rest">REST</a> &mdash; HTTP requests, rate limits, messages, and
          embeds.
        </li>
        <li>
          <a href="/caelum/api/gateway">Gateway</a> &mdash; WebSocket connection, shards,
          reconnection, and low-level events.
        </li>
        <li>
          <a href="/caelum/api/models">Models</a> &mdash; users, guilds, channels, roles, and
          snowflakes.
        </li>
        <li>
          <a href="/caelum/api/errors">Errors</a> &mdash; REST error codes, gateway close events,
          and retry strategies.
        </li>
        <li>
          <a href="/caelum/api/utils">Utils</a> &mdash; logging hooks, caches, and testing helpers.
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
