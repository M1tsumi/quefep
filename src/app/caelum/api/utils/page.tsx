import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Utils</h1>
      <p>
        Caelum ships a few small utilities to make building Discord integrations more pleasant,
        including logging helpers, simple caches, and test hooks.
      </p>

      <h2>Logging</h2>
      <p>
        Plug in your own logger to capture REST and Gateway diagnostics. This is especially useful
        during development and when debugging rate limits.
      </p>
      <CodeBlock
        language="objective-c"
        code={`id<CLLogger> logger = [CLBlockLogger loggerWithBlock:^(CLLogLevel level, NSString *message) {
    NSLog(@"[Caelum][%ld] %@", (long)level, message);
}];

client.logger = logger;`}
      />

      <h2>Caching helpers</h2>
      <p>
        Depending on your app, you may want to cache guilds, channels, or members. Caelum exposes
        simple in-memory cache primitives you can wrap with your own persistence if needed.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLSnowflake guildID = ...;

// Store something in a cache you control
[client.cache setObject:guild forKey:guildID];

// Later, look it up without hitting REST
CLGuild *cached = [client.cache objectForKey:guildID];`}
      />

      <h2>Testing</h2>
      <p>
        For unit tests you can provide a mock REST client or inject a fake gateway to simulate
        events without talking to Discord. This keeps tests fast and deterministic.
      </p>
      <CodeBlock
        language="objective-c"
        code={`id<CLRestClient> mockREST = [CLMockRestClient new];
CLClient *client = [[CLClient alloc] initWithConfiguration:config rest:mockREST gateway:nil];

// Drive your own events into the client and assert on side effects.
`}
      />
    </article>
  );
}
