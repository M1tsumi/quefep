export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <h2>Installation (Swift Package Manager)</h2>
      <p>Add SwiftDisc to your Package.swift:</p>
      <pre><code>{`dependencies: [
    .package(url: "https://github.com/M1tsumi/SwiftDisc.git", from: "0.8.0")
]

targets: [
    .target(name: "YourBot", dependencies: ["SwiftDisc"])
]`}</code></pre>

      <h2>Quick Start</h2>
      <p>Get a bot running in minutes:</p>
      <pre><code>{`import SwiftDisc

@main
struct MyFirstBot {
    static func main() async {
        let token = ProcessInfo.processInfo.environment["DISCORD_BOT_TOKEN"] ?? ""
        let client = DiscordClient(token: token)

        do {
            try await client.loginAndConnect(intents: [.guilds, .guildMessages, .messageContent])

            for await event in client.events {
                switch event {
                case .ready(let info):
                    print("✅ Bot is online as \(info.user.username)!")
                case .messageCreate(let message) where message.content == "!hello":
                    try await client.sendMessage(
                        channelId: message.channel_id,
                        content: "👋 Hello, \(message.author.username)!"
                    )
                default:
                    break
                }
            }
        } catch {
            print("❌ Error: \(error)")
        }
    }
}`}</code></pre>

      <h2>Next steps</h2>
      <ul>
        <li>Review <a href="/swiftdisc/api/client">Client</a> for lifecycle and configuration</li>
        <li>Handle events via <a href="/swiftdisc/api/gateway">Gateway</a></li>
        <li>Call HTTP endpoints using <a href="/swiftdisc/api/rest">REST</a></li>
      </ul>
    </article>
  );
}
