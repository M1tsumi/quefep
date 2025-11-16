import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Gateway</h1>
      <p>
        The gateway is Discord&apos;s WebSocket interface. Caelum manages identify, resume,
        heartbeats, and reconnection logic for you through <code>CLGateway</code>, which is owned
        by <code>CLClient</code>.
      </p>

      <h2>Shards and connection strategy</h2>
      <p>
        For many bots a single shard is enough. For larger deployments you can specify a shard
        count in <code>CLClientConfiguration</code>. Caelum will open one connection per shard and
        distribute events.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLClientConfiguration *config = [[CLClientConfiguration alloc] initWithToken:@"Bot YOUR_TOKEN_HERE"];
config.intents = CLIntentsGuilds | CLIntentsGuildMessages;
config.shardCount = 1; // or a higher number for large bots

CLClient *client = [[CLClient alloc] initWithConfiguration:config];
[client connectWithCompletion:nil];`}
      />

      <h2>Listening to low-level gateway events</h2>
      <p>
        In most cases you will work with the high-level event helpers on <code>CLClient</code>.
        For advanced scenarios you can subscribe directly to gateway packets or connection state
        changes.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client.gateway onConnectionStateChange:^(CLGatewayConnectionState state) {
    switch (state) {
        case CLGatewayConnectionStateConnecting:
            NSLog(@"Gateway connecting...");
            break;
        case CLGatewayConnectionStateConnected:
            NSLog(@"Gateway connected.");
            break;
        case CLGatewayConnectionStateReconnecting:
            NSLog(@"Gateway reconnecting...");
            break;
        case CLGatewayConnectionStateClosed:
            NSLog(@"Gateway closed.");
            break;
    }
}];`}
      />

      <h2>Reconnection and resume</h2>
      <p>
        Caelum automatically attempts to resume sessions when possible. If resume fails, it will
        perform a fresh identify. You can hook into these transitions for metrics or logging.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client.gateway onSessionEvent:^(CLGatewaySessionEvent *event) {
    if (event.type == CLGatewaySessionEventTypeResumed) {
        NSLog(@"Resumed Discord session.");
    } else if (event.type == CLGatewaySessionEventTypeInvalidated) {
        NSLog(@"Session invalidated; performed a fresh identify.");
    }
}];`}
      />
    </article>
  );
}
