export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>
        This section documents every public surface in SwiftDisc. Each page focuses on one module so
        you can zero in on lifecycle, networking, modeling, or utilities without wading through
        unrelated text.
      </p>

      <h2>Core modules</h2>
      <ul>
        <li>
          <a href="/swiftdisc/api/client">Client</a>. Configure tokens, shards, logging, and wire
          Gateway + REST together.
        </li>
        <li>
          <a href="/swiftdisc/api/rest">REST</a>. Async helpers over Discord HTTP routes with rate
          limiting and retry semantics.
        </li>
        <li>
          <a href="/swiftdisc/api/gateway">Gateway</a>. Covers WebSocket lifecycle, intents, event
          streaming, and reconnection strategy.
        </li>
      </ul>

      <h2>Supporting types</h2>
      <ul>
        <li>
          <a href="/swiftdisc/api/models">Models</a>. Codable value types for guilds, channels,
          members, messages, roles, and attachments.
        </li>
        <li>
          <a href="/swiftdisc/api/errors">Errors</a>. Typed errors surfaced across Client, REST,
          and Gateway to simplify handling.
        </li>
        <li>
          <a href="/swiftdisc/api/utils">Utils</a>. Logging hooks, cache primitives, and testing
          aids that plug into the core stack.
        </li>
      </ul>

      <h2>Suggested reading order</h2>
      <ol>
        <li>Start with <strong>Client</strong> to understand configuration and lifecycle.</li>
        <li>Jump to <strong>Gateway</strong> to learn the event model and command routing patterns.</li>
        <li>Layer in <strong>REST</strong> once you need outbound HTTP calls.</li>
        <li>Reference <strong>Models</strong> whenever you need the exact fields exposed by Discord.</li>
        <li>Consult <strong>Errors</strong> and <strong>Utils</strong> when hardening and tooling up
          your bot.
        </li>
      </ol>
    </article>
  );
}
