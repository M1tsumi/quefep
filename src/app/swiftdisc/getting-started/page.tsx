export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <h2>Installation</h2>
      <p>Install via Swift Package Manager by adding SwiftDisc to your Package.swift dependencies:</p>
      <pre><code>{`dependencies: [
  .package(url: "https://github.com/M1tsumi/SwiftDisc", from: "0.1.0")
]`}</code></pre>
      <h2>Minimal bot</h2>
      <pre><code>{`import SwiftDisc

@main
struct Bot {
  static func main() async throws {
    let client = Client(token: ProcessInfo.processInfo.environment["DISCORD_TOKEN"]!)
    try await client.connect()
  }
}`}</code></pre>
      <h2>Next steps</h2>
      <ul>
        <li>Read through <a href="/swiftdisc/api/client">Client</a> to understand lifecycle</li>
        <li>Explore <a href="/swiftdisc/api/gateway">Gateway</a> for events</li>
        <li>Use <a href="/swiftdisc/api/rest">REST</a> for HTTP endpoints</li>
      </ul>
    </article>
  );
}
