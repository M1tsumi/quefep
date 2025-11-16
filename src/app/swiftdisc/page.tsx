export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>SwiftDisc Overview</h1>
      <p>
        SwiftDisc is a batteries-included Discord client for Swift. It layers a typed REST client,
        resilient Gateway connection, and ergonomic models on top of modern Swift concurrency so you
        can ship production-ready bots without reimplementing the Discord spec.
      </p>

      <h2>Why teams choose SwiftDisc</h2>
      <ul>
        <li>
          <strong>First-class async/await.</strong> Every surface is built on Swift Concurrency for
          predictable back pressure and simple control flow.
        </li>
        <li>
          <strong>Guardrails by default.</strong> Sharding, rate limiting, and sequence numbers are
          handled for you, while still exposing hooks for custom instrumentation.
        </li>
        <li>
          <strong>Typed domain models.</strong> Codable-friendly value types mirror Discord payloads,
          so you can traverse data with full IDE support.
        </li>
      </ul>

      <h2>What the docs cover</h2>
      <p>
        The SwiftDisc documentation is split between narrative guides and focused reference
        material:
      </p>
      <ul>
        <li><strong>Guides</strong> explain architecture, configuration, and recommended patterns.</li>
        <li>
          <strong>API reference</strong> drills into Client, REST, Gateway, Models, Errors, and
          Utilities with real-world snippets you can paste into your project.
        </li>
        <li>
          <strong>Resources</strong> such as the FAQ and Changelog keep you up to date on platform
          nuances.
        </li>
      </ul>

      <h2 className="text-[#0ea5e9]">Quick links</h2>
      <ul>
        <li>
          <a href="/swiftdisc/getting-started">Getting Started</a> — installation, configuration,
          and a first bot walkthrough.
        </li>
        <li>
          <a href="/swiftdisc/api">API Reference</a> — deep dives on every module.
        </li>
        <li>
          <a href="/swiftdisc/changelog">Changelog</a> — release notes and upgrade guidance.
        </li>
      </ul>
    </article>
  );
}
