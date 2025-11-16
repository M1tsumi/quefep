import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Errors</h1>
      <p>
        SwiftDisc normalizes Discord failures into a small set of typed errors so you can handle
        them predictably from Swift.
      </p>

      <h2>REST errors</h2>
      <p>
        REST operations throw <code>SDRestError</code> values for common situations like bad
        requests, missing permissions, and rate limits.
      </p>
      <CodeBlock
        language="swift"
        code={`do {
    let message = try await client.rest.createMessage(in: channelID, content: "secret admin-only command")
    print("Sent message \(message.id)")
} catch let error as SDRestError {
    switch error {
    case .missingPermissions:
        print("Bot is missing permissions in this channel")
    case .unknownChannel:
        print("Channel no longer exists")
    default:
        print("Unexpected REST error: \(error)")
    }
} catch {
    print("Non-REST error: \(error)")
}`}
      />

      <h2>Gateway close codes</h2>
      <p>
        When the gateway closes, SwiftDisc surfaces the close code and whether the connection will
        be retried.
      </p>
      <CodeBlock
        language="swift"
        code={`client.onGatewayClose { close in
    print("Gateway closed (code: \(close.code), clean: \(close.clean))")

    if close.code == 4004 {
        print("Authentication failed. Check your bot token.")
    }
}`}
      />

      <h2>Retries and backoff</h2>
      <p>
        SwiftDisc handles transient network issues and Discord rate limits internally. For
        higher-level workflows, prefer idempotent operations and add your own backoff when
        repeating entire flows.
      </p>
    </article>
  );
}
