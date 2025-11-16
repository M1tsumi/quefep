import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <p>
        Follow this guide to install SwiftDisc, wire up your Discord credentials, and launch a
        minimal bot that responds to commands within a few minutes.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Xcode 15 or Swift 5.9 toolchain</li>
        <li>A Discord application with a bot token and required intents enabled</li>
        <li>macOS, Linux, or container runtime capable of running async Swift processes</li>
      </ul>

      <h2>Install via Swift Package Manager</h2>
      <p>Add SwiftDisc as a dependency inside your <code>Package.swift</code>:</p>
      <CodeBlock
        language="swift"
        code={`dependencies: [
    .package(url: "https://github.com/M1tsumi/SwiftDisc.git", from: "0.8.0")
]

targets: [
    .executableTarget(
        name: "QuefBot",
        dependencies: [.product(name: "SwiftDisc", package: "SwiftDisc")]
    )
]`}
      />

      <h2>Store your bot token securely</h2>
      <ol>
        <li>Create a <code>.env</code> or secrets file that is ignored by Git.</li>
        <li>Expose the token as <code>DISCORD_BOT_TOKEN</code> before launching your process.</li>
        <li>Never hardcode credentials in source or commit history.</li>
      </ol>

      <h2>Build a minimal bot</h2>
      <p>Use Swift concurrency to connect, stream events, and respond to messages:</p>
      <CodeBlock
        language="swift"
        code={`import SwiftDisc

@main
struct HelloGuildsBot {
    static func main() async {
        let token = ProcessInfo.processInfo.environment["DISCORD_BOT_TOKEN"] ?? ""
        let client = DiscordClient(token: token)

        do {
            try await client.loginAndConnect(intents: [.guilds, .guildMessages, .messageContent])

            for await event in client.events {
                switch event {
                case .ready(let info):
                    print("✅ Logged in as \(info.user.username)")
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
            print("❌ SwiftDisc error: \(error)")
        }
    }
}`}
      />

      <h2>Next steps</h2>
      <ul>
        <li>Deep dive into lifecycle and configuration in the <a href="/swiftdisc/api/client">Client</a> docs.</li>
        <li>Stream and route events with the <a href="/swiftdisc/api/gateway">Gateway</a> guides.</li>
        <li>Compose HTTP workflows using the <a href="/swiftdisc/api/rest">REST</a> helpers.</li>
      </ul>
    </article>
  );
}
