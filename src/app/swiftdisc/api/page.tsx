export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>Navigate the modules below for detailed type- and member-level documentation.</p>
      <ul>
        <li><a href="/swiftdisc/api/client">Client</a> — configuration, lifecycle, shards</li>
        <li><a href="/swiftdisc/api/rest">REST</a> — rate limits, routes, request/response</li>
        <li><a href="/swiftdisc/api/gateway">Gateway</a> — intents, events, dispatch models</li>
        <li><a href="/swiftdisc/api/models">Models</a> — core entities and value types</li>
        <li><a href="/swiftdisc/api/errors">Errors</a> — error types and handling</li>
        <li><a href="/swiftdisc/api/utils">Utils</a> — helpers, caching, logging</li>
      </ul>
    </article>
  );
}
