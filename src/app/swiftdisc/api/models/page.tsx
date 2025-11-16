import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Models</h1>
      <p>
        SwiftDisc exposes Swift-friendly value types for the main Discord resources: users, guilds,
        channels, messages, members, and roles. These are designed to work cleanly with Swift
        concurrency and Codable.
      </p>

      <h2>Common entities</h2>
      <ul>
        <li><code>SDUser</code>. Represents a Discord user or bot account.</li>
        <li><code>SDGuild</code>. Models a server with channels, roles, and members.</li>
        <li><code>SDChannel</code>. Covers text, voice, and thread channels.</li>
        <li><code>SDMessage</code>. Includes content, embeds, attachments, and metadata.</li>
        <li><code>SDRole</code>. Describes a permission container within a guild.</li>
      </ul>

      <h2>Inspecting models from events</h2>
      <CodeBlock
        language="swift"
        code={`for await event in client.gatewayEvents {
    switch event {
    case .messageCreate(let message):
        let author: SDUser = message.author
        print("[\(message.channelID)] \(author.username): \(message.content)")
    default:
        break
    }
}`}
      />

      <h2>Fetching additional data</h2>
      <p>
        Gateway events often include only the IDs you need. Use REST helpers to fetch full models
        when you want more detail.
      </p>
      <CodeBlock
        language="swift"
        code={`let guildID: SDSnowflake = ...
let userID: SDSnowflake = ...

let guild = try await client.rest.fetchGuild(id: guildID)
print("Guild name: \(guild.name) (approx. members: \(guild.approximateMemberCount ?? 0))")

let member = try await client.rest.fetchMember(userID: userID, in: guildID)
print("Member display name: \(member.displayName ?? member.user.username)")`}
      />

      <h2>Snowflakes and identifiers</h2>
      <p>
        Most identifiers are <code>SDSnowflake</code>, a tiny wrapper over Discord&apos;s snowflake
        format. You can convert to and from strings safely.
      </p>
      <CodeBlock
        language="swift"
        code={`let channelID = SDSnowflake("123456789012345678")
let raw = channelID.rawValue`}
      />
    </article>
  );
}
