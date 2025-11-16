import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Gateway</h1>
      <p>
        The gateway is Discord&apos;s WebSocket interface. SwiftDisc hides identify, heartbeats, and
        resume logic behind a high-level API, but you can still configure shards and subscribe to
        events in a very explicit way.
      </p>

      <h2>Shards and connection strategy</h2>
      <p>
        For most bots you can start with a single shard. As you grow, Discord may suggest a higher
        shard count. SwiftDisc lets you pass a shard configuration when building your client.
      </p>
      <CodeBlock
        language="swift"
        code={`import SwiftDisc

let config = SDClientConfiguration(
    token: "Bot YOUR_TOKEN_HERE",
    intents: [.guilds, .guildMessages, .messageContent],
    shardCount: 1 // increase when Discord recommends it
)

let client = SDClient(configuration: config)

try await client.connect()`}
      />

      <h2>Login, connect, and events</h2>
      <p>
        Under the hood SwiftDisc maintains a WebSocket connection, sends heartbeats, and resumes
        sessions when possible. You work with async streams or closures to observe events.
      </p>
      <CodeBlock
        language="swift"
        code={`for await event in client.gatewayEvents {
    switch event {
    case .ready(let ready):
        print("Logged in as \(ready.user.username)")
    case .messageCreate(let message):
        if message.content == "!ping" {
            try await client.rest.createMessage(in: message.channelID, content: "Pong!")
        }
    default:
        break
    }
}`}
      />

      <h2>Connection lifecycle</h2>
      <p>
        You can observe low-level connection state changes if you want to surface metrics or
        display status in a UI.
      </p>
      <CodeBlock
        language="swift"
        code={`client.onConnectionStateChange { state in
    switch state {
    case .connecting:
        print("Gateway connecting…")
    case .connected:
        print("Gateway connected.")
    case .reconnecting:
        print("Gateway reconnecting…")
    case .closed(let close):
        print("Gateway closed (code: \(close.code), clean: \(close.clean))")
    }
}`}
      />

      <h2>Graceful shutdown</h2>
      <p>
        Always close the gateway when your process is exiting so Discord sees a clean close and
        your bot can resume quickly next time.
      </p>
      <CodeBlock
        language="swift"
        code={`try await client.disconnect(code: 1000, reason: "App shutting down")`}
      />
    </article>
  );
}
