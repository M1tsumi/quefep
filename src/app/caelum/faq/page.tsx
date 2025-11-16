export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>FAQ</h1>

      <h2>How do I configure intents?</h2>
      <p>
        Intents are set on <code>CLClientConfiguration</code> before you create the client. See the
        Client docs for a full example.
      </p>
      <pre>
        <code>{`CLClientConfiguration *config = [[CLClientConfiguration alloc] initWithToken:@"Bot YOUR_TOKEN_HERE"];
config.intents = CLIntentsGuilds | CLIntentsGuildMessages | CLIntentsMessageContent;`}</code>
      </pre>

      <h2>Which platforms does Caelum support?</h2>
      <p>
        Caelum is designed for Objective-C projects on iOS, iPadOS, macOS, and command-line tools.
        It does not require Swift or Swift Concurrency.
      </p>

      <h2>How should I store my bot token?</h2>
      <p>
        Never hardcode tokens in source control. Use environment variables, configuration files that
        are not committed, or the Keychain on Apple platforms, then inject the string into
        <code>CLClientConfiguration</code> at startup.
      </p>

      <h2>Why am I being rate limited?</h2>
      <p>
        Discord enforces strict rate limits per route. Caelum respects these limits and will retry
        requests when possible, but you should still avoid loops that send large bursts of
        messages. Use batching where you can and add logging to watch for rate limit errors.
      </p>

      <h2>How do I handle reconnection?</h2>
      <p>
        Caelum will automatically attempt to resume gateway sessions and reconnect on transient
        failures. You can observe connection state changes and session events via the Gateway API
        to update your UI or metrics.
      </p>

      <h2>Can I write tests for my Caelum code?</h2>
      <p>
        Yes. Use the utilities described in the Utils section to inject mock REST clients or fake
        gateway events. This lets you test your command logic without hitting Discord.
      </p>
    </article>
  );
}
