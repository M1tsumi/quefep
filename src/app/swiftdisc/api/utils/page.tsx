import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Utils</h1>
      <p>
        SwiftDisc ships a few small utilities to make building Discord integrations more pleasant,
        including logging helpers, simple caches, and test hooks.
      </p>

      <h2>Logging</h2>
      <p>
        Plug in your own logger to capture REST and gateway diagnostics. This is especially useful
        during development and when debugging rate limits.
      </p>
      <CodeBlock
        language="swift"
        code={`let logger = SDLogger { level, message in
    print("[SwiftDisc][\(level)] \(message)")
}

client.logger = logger`}
      />

      <h2>Caching helpers</h2>
      <p>
        Depending on your app, you may want to cache guilds, channels, or members. SwiftDisc
        exposes simple in-memory cache primitives that you can wrap with your own persistence.
      </p>
      <CodeBlock
        language="swift"
        code={`let guildID: SDSnowflake = ...

// Store something in a cache you control
client.cache.set(guild, forKey: guildID)

// Later, look it up without hitting REST
if let cached: SDGuild = client.cache.value(forKey: guildID) {
    print("Using cached guild: \(cached.name)")
}`}
      />

      <h2>Testing</h2>
      <p>
        For unit tests you can provide a mock REST client or inject a fake gateway to simulate
        events without talking to Discord. This keeps tests fast and deterministic.
      </p>
      <CodeBlock
        language="swift"
        code={`let mockREST = SDMockREST()
let client = SDClient(configuration: config, rest: mockREST)

// Inject fake events into the gateway stream here in your tests
// and assert that your higher-level logic behaves correctly.`}
      />
    </article>
  );
}
