import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>REST</h1>
      <p>High-level helpers over Discord REST v10 for messages, embeds, files, emoji, and more. All calls are async/await and typed.</p>

      <h2>Send a message</h2>
      <CodeBlock
        language="swift"
        code={`let message = try await client.sendMessage(
  channelId: channelId,
  content: "Hello, world!"
)`}
      />

      <h2>Embeds</h2>
      <CodeBlock
        language="swift"
        code={`let embed = Embed(title: "News", description: "All the latest")
try await client.sendMessage(channelId: channelId, embeds: [embed])`}
      />

      <h2>File uploads</h2>
      <CodeBlock
        language="swift"
        code={`let data = try Data(contentsOf: URL(fileURLWithPath: "/path/to/image.png"))
try await client.sendMessage(
  channelId: channelId,
  content: "With attachment",
  files: [Attachment(name: "image.png", data: data, mime: "image/png")]
)`}
      />

      <h2>Application Emoji (CRUD)</h2>
      <CodeBlock
        language="swift"
        code={`// Create (image should be a data URI string)
let created = try await client.createAppEmoji(
  applicationId: appId,
  name: "party",
  imageBase64: "data:image/png;base64,..."
)

let updated = try await client.updateAppEmoji(
  applicationId: appId,
  emojiId: "123",
  updates: ["name": .string("party_blob")]
)

try await client.deleteAppEmoji(applicationId: appId, emojiId: "123")`}
      />

      <h2>Rate limits</h2>
      <p>SwiftDisc respects Discord rate limits. Do not parallelize identical routes excessively; await results and handle 429 retries automatically surfaced by the client.</p>

      <h2>Topics</h2>
      <ul>
        <li>Authentication</li>
        <li>Routes and helpers</li>
        <li>Rate limiting</li>
        <li>Error handling</li>
      </ul>
    </article>
  );
}
