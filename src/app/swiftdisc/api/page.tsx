export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>
        SwiftDisc is split into focused modules so you can reason about configuration, HTTP
        requests, the gateway connection, and your domain models independently. Use this page as a
        high-level map, then dive into the dedicated sections for details.
      </p>

      <h2>Core modules</h2>
      <ul>
        <li>
          <a href="/swiftdisc/api/client">Client</a> — the main entry point. Responsible for
          configuration, shards, logging, and connecting REST + Gateway together.
        </li>
        <li>
          <a href="/swiftdisc/api/rest">REST</a> — strongly-typed wrappers around Discord&apos;s HTTP
          API with rate limiting and retry behavior.
        </li>
        <li>
          <a href="/swiftdisc/api/gateway">Gateway</a> — WebSocket connection, intents, dispatch
          events, and reconnection.
        </li>
      </ul>

      <h2>Supporting types</h2>
      <ul>
        <li>
          <a href="/swiftdisc/api/models">Models</a> — Swift value types representing guilds,
          channels, members, messages, and more. Designed for use with Swift concurrency.
        </li>
        <li>
          <a href="/swiftdisc/api/errors">Errors</a> — error enums and result types used across
          Client, REST, and Gateway.
        </li>
        <li>
          <a href="/swiftdisc/api/utils">Utils</a> — helpers for caching, logging, and small
          abstractions you can reuse in your own projects.
        </li>
      </ul>

      <h2>How to read this section</h2>
      <p>
        If you are building a new bot, start with <strong>Client</strong> to understand lifecycle
        and configuration, then review <strong>Gateway</strong> for events and
        <strong> REST</strong> for HTTP calls. Come back to <strong>Models</strong> when you want to
        explore concrete fields on Discord resources, and <strong>Errors</strong> when you are
        hardening your error handling.
      </p>
    </article>
  );
}
