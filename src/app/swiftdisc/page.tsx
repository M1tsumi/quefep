import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] items-start">
        <aside className="hidden lg:block sticky top-24">
          <nav className="text-xs text-black/60 dark:text-white/60 space-y-4">
            <div>
              <div className="text-[0.7rem] font-semibold uppercase tracking-wide mb-2">
                On this page
              </div>
              <ul className="space-y-1">
                <li>
                  <a href="#package-structure" className="hover:text-[#0ea5e9]">
                    Package structure
                  </a>
                </li>
                <li>
                  <a href="#installation" className="hover:text-[#0ea5e9]">
                    Installation &amp; basic usage
                  </a>
                </li>
                <li>
                  <a href="#configuration" className="hover:text-[#0ea5e9]">
                    Core configuration
                  </a>
                </li>
                <li>
                  <a href="#client" className="hover:text-[#0ea5e9]">
                    DiscordClient &amp; events
                  </a>
                </li>
                <li>
                  <a href="#gateway" className="hover:text-[#0ea5e9]">
                    Gateway &amp; sharding
                  </a>
                </li>
                <li>
                  <a href="#rest" className="hover:text-[#0ea5e9]">
                    REST helpers
                  </a>
                </li>
                <li>
                  <a href="#models" className="hover:text-[#0ea5e9]">
                    Models &amp; interactions
                  </a>
                </li>
                <li>
                  <a href="#voice" className="hover:text-[#0ea5e9]">
                    Voice &amp; platforms
                  </a>
                </li>
                <li>
                  <a href="#resilience" className="hover:text-[#0ea5e9]">
                    Resilience &amp; testing
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <article className="prose dark:prose-invert">
          <h1>SwiftDisc</h1>
          <p>
            SwiftDisc is a modern, async/await-based Discord API wrapper written in Swift. It is
            designed to feel like idiomatic Swift while covering the full Discord HTTP API, Gateway,
            interactions, and experimental voice support.
          </p>
          <p>
            This page is a high-level reference to the SwiftDisc API surface and architecture. Use
            it alongside the README and inline documentation when you are wiring a real bot or
            integration.
          </p>

          <h2 id="package-structure">1. Package structure &amp; modules</h2>
          <p>SwiftDisc ships as a single Swift package module:</p>
          <ul>
            <li>
              <strong>Module</strong>: <code>SwiftDisc</code> - core types such as
              <code>DiscordClient</code>, <code>DiscordConfiguration</code>, <code>Snowflake&lt;T&gt;</code>,
              models, and errors.
            </li>
            <li>
              <strong>Subsystems</strong>: Gateway client and events, REST client and rate limiter,
              caching and dispatch, command routing, and experimental voice support.
            </li>
          </ul>

          <h2 id="installation">2. Installation &amp; basic usage</h2>
          <h3>2.1. Adding SwiftDisc as a dependency</h3>
          <CodeBlock
        language="swift"
        code={`// Package.swift
dependencies: [
    .package(url: "https://github.com/M1tsumi/SwiftDisc.git", from: "0.10.0"),
],

targets: [
    .executableTarget(
        name: "MyBot",
        dependencies: [
            .product(name: "SwiftDisc", package: "SwiftDisc"),
        ]
    )
]`}
          />

          <h3>2.2. Creating a client</h3>
          <CodeBlock
        language="swift"
        code={`import SwiftDisc

let token = ProcessInfo.processInfo.environment["DISCORD_TOKEN"]!
let client = DiscordClient(token: token)

await client.connect()`}
          />
          <p>
            You can customize behavior through <code>DiscordConfiguration</code> and by either
            consuming the <code>events</code> async sequence or attaching callback properties.
          </p>

          <h2 id="configuration">3. Core configuration &amp; types</h2>
          <h3>3.1. DiscordConfiguration</h3>
          <p>
            <code>DiscordConfiguration</code> controls high-level client behavior such as intents,
            initial presence, sharding configuration, member chunk thresholds, timeouts, retry
            policy, and whether voice support is enabled.
          </p>
          <CodeBlock
        language="swift"
        code={`let config = DiscordConfiguration(
    intents: [.guilds, .guildMessages, .messageContent]
)

let client = DiscordClient(token: token, configuration: config)`}
          />

          <h3>3.2. Snowflake&lt;T&gt; and typed IDs</h3>
          <p>
            SwiftDisc wraps Discord IDs in a strongly typed <code>Snowflake&lt;Tag&gt;</code> struct with
            aliases such as <code>UserID</code>, <code>GuildID</code>, <code>ChannelID</code>, and many
            more. Models use these aliases instead of bare <code>String</code> IDs.
          </p>

          <h2 id="client">4. DiscordClient: high-level facade</h2>
          <p>
            <code>DiscordClient</code> ties together the HTTP client, Gateway, cache, optional voice
            client, and command routers. In most apps you only talk to this type.
          </p>
          <h3>4.1. Events &amp; callbacks</h3>
          <p>You can handle events via async streams or convenience callbacks.</p>
          <CodeBlock
        language="swift"
        code={`for await event in client.events {
    switch event {
    case .messageCreate(let message):
        // ...
    case .guildCreate(let guild):
        // ...
    default:
        break
    }
}`}
          />
          <CodeBlock
        language="swift"
        code={`client.onReady = { ready in
    print("Logged in as \(ready.user.username)")
}

client.onMessage = { message in
    // messageCreate shortcut
}`}
          />

          <h3>4.2. Command routers</h3>
          <p>
            Command abstractions such as <code>CommandRouter</code>, <code>SlashCommandRouter</code>,
            and <code>AutocompleteRouter</code> plug into the event pipeline and provide structured
            routing for prefix commands, slash commands, and autocomplete.
          </p>

          <h2 id="gateway">5. Gateway &amp; sharding</h2>
          <p>
            The internal <code>GatewayClient</code> manages the WebSocket connection, heartbeats,
            reconnect/resume logic, and sharding utilities. Tests in the package show how shard IDs
            are calculated and how latency is tracked.
          </p>

          <h2 id="rest">6. REST: HTTP client &amp; helpers</h2>
          <p>
            SwiftDisc exposes a typed REST layer behind <code>DiscordClient</code> with helpers for
            channels, messages, guilds, invites, templates, stickers, auto-moderation, audit logs,
            and more. Internally it uses an <code>HTTPClient</code> plus a rate limiter actor that
            respects Discord&apos;s headers.
          </p>

          <h2 id="models">7. Models overview</h2>
          <p>
            The <code>SwiftDisc</code> module contains Codable, Hashable models for guilds,
            channels, messages, users, presence, interactions, voice, auto-moderation, audit logs,
            templates, stickers, and additional Discord resources. Each mirrors the API schema while
            keeping Swift naming conventions.
          </p>

          <h2 id="interactions">8. Interactions, slash commands, and autocomplete</h2>
          <p>
            Interaction support centers around the <code>Interaction</code> model and the
            <code>SlashCommandRouter</code> and <code>AutocompleteRouter</code> types. They map
            command names and option trees to handlers, and tests in the repo demonstrate nested
            option behavior.
          </p>

          <h2 id="voice">9. Voice support (experimental)</h2>
          <p>
            Voice support is provided by <code>VoiceClient</code> and <code>VoiceGateway</code>, which
            manage per-guild voice sessions, UDP discovery, encryption, and sending Opus frames.
            This is experimental and may differ by platform.
          </p>

          <h2 id="platforms">10. Platform support &amp; Windows notes</h2>
          <p>
            SwiftDisc targets recent Apple platforms plus Windows using the Swift toolchain.
            Conditional compilation is used where <code>URLSession</code> or other APIs differ, and
            CI runs macOS builds as the primary gate with a best-effort Windows job.
          </p>

          <h2 id="resilience">11. Error handling, rate limiting, and resilience</h2>
          <p>
            REST helpers surface typed errors, while the <code>RateLimiter</code> actor updates from
            HTTP headers and queues requests to respect Discord&apos;s 429 responses. The Gateway layer
            handles heartbeats, reconnects, session resume, and shard-aware latency tracking.
          </p>

          <h2 id="testing">12. Testing, examples, and where to go next</h2>
          <p>
            The <code>SwiftDiscTests</code> target includes sharding tests, router tests, and basic
            client initialization examples. Use them as concrete templates when wiring your own
            services.
          </p>
          <ul>
            <li>
              <a href="/swiftdisc/getting-started">Getting Started</a> &ndash; installation,
              configuration, and a first bot walkthrough.
            </li>
            <li>
              <a href="/swiftdisc/api">API Reference</a> &ndash; deeper dives on Client, REST,
              Gateway, and models.
            </li>
            <li>
              <a href="/swiftdisc/changelog">Changelog</a> &ndash; release notes and upgrade
              guidance.
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
