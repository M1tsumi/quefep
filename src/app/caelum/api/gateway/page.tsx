import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Gateway</h1>
      <p>
        Caelum&apos;s gateway layer is built on Discord Gateway v10 with full identify, heartbeat, ACK,
        resume, and invalid-session handling. The <code>CLGateway</code> owned by
        <code>CLClient</code> orchestrates shards, exposes event hooks, and bubbles metrics-friendly
        callbacks.
      </p>

      <h2>Sharding strategy</h2>
      <p>
        Bump shard counts as your bot scales. The configuration is forwarded to
        <code>CLMShardManager</code> so each shard tracks sequence numbers and resumes
        independently.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLClientConfiguration *config = [[CLClientConfiguration alloc] initWithToken:@"Bot YOUR_TOKEN_HERE"];
config.intents = CLIntentsGuilds | CLIntentsGuildMessages;
config.shardCount = 1; // or a higher number for large bots

CLClient *client = [[CLClient alloc] initWithConfiguration:config];
[client connectWithCompletion:nil];`}
      />

      <h2>Connection lifecycle hooks</h2>
      <p>
        <code>client.gateway</code> exposes block-based APIs for connection and session events.
        Attach logging to understand reconnect frequency or emit metrics.
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

      <h2>Resume and invalidation</h2>
      <p>
        Caelum invokes session callbacks whenever Discord confirms a resume or forces a new
        identify. Use these events to reset in-memory caches or notify operators.
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
