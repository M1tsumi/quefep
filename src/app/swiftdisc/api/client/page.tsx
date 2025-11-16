import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Client</h1>
      <p>The <code>DiscordClient</code> coordinates Gateway and REST, manages configuration, and exposes a typed async event stream.</p>

      <h2>Create and Configure</h2>
      <CodeBlock
        language="swift"
        code={`import SwiftDisc

let token = ProcessInfo.processInfo.environment["DISCORD_BOT_TOKEN"] ?? ""
let client = DiscordClient(token: token)

// Intents control which events you receive
let intents: Intents = [.guilds, .guildMessages, .messageContent]`}
      />

      <h2>Login, Connect, and Events</h2>
      <CodeBlock
        language="swift"
        code={`try await client.loginAndConnect(intents: intents)

for await event in client.events {
    switch event {
    case .ready(let info):
        print("✅ Online as \(info.user.username)")
    case .messageCreate(let message) where message.content == "!ping":
        try await client.sendMessage(channelId: message.channel_id, content: "Pong!")
    default:
        break
    }
}`}
      />

      <h2>Shutdown</h2>
      <p>Gracefully close the Gateway and flush REST work:</p>
      <CodeBlock language="swift" code={`await client.close()`} />

      <h2>Error handling</h2>
      <p>Wrap connect and REST calls in <code>do/catch</code>. Retry transient errors; surface Discord error codes to logs.</p>

      <h2>Common patterns</h2>
      <ul>
        <li>Use environment variables for secrets.</li>
        <li>Scope your intents to the minimum required.</li>
        <li>Centralize command routing in a handler and call REST via the client.</li>
      </ul>
    </article>
  );
}
