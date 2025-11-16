export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Client</h1>
      <p>Core client responsible for configuration, sharding, gateway connections, and REST coordination.</p>
      <h2>Key types</h2>
      <ul>
        <li><code>Client</code></li>
        <li><code>ClientOptions</code></li>
        <li><code>Intents</code></li>
      </ul>
      <h2>Usage</h2>
      <pre><code>{`let client = Client(token: "YOUR_TOKEN", options: .init(intents: [.guilds, .messages]))
try await client.connect()`}</code></pre>
      <h2>Lifecycle</h2>
      <ul>
        <li>Initialization</li>
        <li>Login / Connect</li>
        <li>Event handling</li>
        <li>Shutdown</li>
      </ul>
    </article>
  );
}
