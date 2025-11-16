export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>FAQ</h1>

      <h2>How do I configure intents?</h2>
      <p>
        Pass the set of intents you need when creating your client or when connecting the gateway.
        Only enable what you actually use to keep memory and event volume under control.
      </p>

      <h2>Why am I hitting REST rate limits?</h2>
      <p>
        SwiftDisc buckets requests based on Discord&apos;s rate limit headers, but you can still hit
        limits if you fire many requests in a tight loop. Prefer bulk operations, cache frequently
        accessed data, and avoid polling.
      </p>

      <h2>Can I use SwiftDisc in a Vapor or server-side Swift app?</h2>
      <p>
        Yes. SwiftDisc is designed for long-running processes and integrates well with async/await.
        You can host it inside a server-side Swift app as long as you keep the event loop running.
      </p>

      <h2>How should I store my bot token?</h2>
      <p>
        Never hardcode tokens in source. Use environment variables, configuration files excluded
        from version control, or your hosting provider&apos;s secret store.
      </p>

      <h2>What is the recommended logging strategy?</h2>
      <p>
        Start with simple stdout logging, then introduce a structured logger once your bot grows.
        Log gateway connection state, REST failures, and important domain events so you can debug
        production issues.
      </p>
    </article>
  );
}
