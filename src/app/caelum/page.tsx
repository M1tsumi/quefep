import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Caelum</h1>
      <p>
        Caelum is a clean, fast Objective-C library for the Discord Gateway (v10) and REST API. It
        is designed to feel at home in UIKit/AppKit-style codebases while still exposing the full
        breadth of Discord features.
      </p>
      <p>
        This page is an overview of the major building blocks described in the full
        <code>caelum-docs.md</code> document so you can navigate the library without constantly
        switching files.
      </p>

      <h2>1. Getting started</h2>
      <h3>1.1. Installation with Swift Package Manager</h3>
      <CodeBlock
        language="swift"
        code={`dependencies: [
    .package(url: "https://github.com/M1tsumi/Caelum.git", from: "0.1.1")
],

targets: [
    .target(
        name: "YourApp",
        dependencies: [
            .product(name: "Caelum", package: "Caelum")
        ]
    )
]`}
      />

      <h3>1.2. Importing from Objective-C</h3>
      <CodeBlock
        language="objective-c"
        code={`#import <Caelum/Caelum.h>
// or, if vendored:
#import "Caelum.h"`}
      />

      <h3>1.3. High-level client</h3>
      <p>
        <code>CLMClientConfiguration</code> wires REST and Gateway together. The
        <code>CLMDiscordClient</code> exposes <code>rest</code> and <code>gateway</code> properties so
        you can choose a REST-only or full Gateway-driven architecture.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLMClientConfiguration *config = [CLMClientConfiguration defaultConfiguration];
config.restConfiguration.tokenProvider = myTokenProvider;
config.gatewayConfiguration.tokenProvider = myTokenProvider;

CLMDiscordClient *client = [[CLMDiscordClient alloc] initWithConfiguration:config];

// REST
[client.rest getCurrentUser:^(CLMRESTResponse *resp) {
    // handle
}];

// Gateway
client.gateway.delegate = self; // CLMGatewayEventDelegate
[client.gateway connect];`}
      />

      <h2>2. Architecture overview</h2>
      <p>Caelum is organised into several top-level areas:</p>
      <ul>
        <li>
          <strong>Core</strong>: logging, errors, clocks, event center, cache.
        </li>
        <li>
          <strong>REST</strong>: configuration, request/response types, rate limiter, REST client, and
          paginators.
        </li>
        <li>
          <strong>Gateway</strong>: configuration, WebSocket connection, Gateway client, shard
          manager.
        </li>
        <li>
          <strong>Client</strong>: <code>CLMDiscordClient</code> and <code>CLMClientConfiguration</code>
          tying everything together.
        </li>
        <li>
          <strong>Commands</strong>: text command framework for prefix commands.
        </li>
        <li>
          <strong>Models</strong>: snowflakes, components, auto moderation, localization, forum,
          polls, application emoji, message snapshots, and more.
        </li>
      </ul>

      <h2>3. REST client &amp; HTTP layer</h2>
      <p>
        The <code>CLMDiscordRESTClient</code> type is the main surface for talking to Discord&apos;s HTTP
        API. It is configured via <code>CLMRESTConfiguration</code> and uses <code>CLMRateLimiter</code>
        internally to respect Discord&apos;s 429 responses.
      </p>
      <p>
        Request and response types model HTTP methods, routes, JSON bodies, audit log reasons, and
        file uploads. Paginators such as <code>CLMMessagesPaginator</code> and
        <code>CLMMembersPaginator</code> wrap common paging patterns.
      </p>

      <h2>4. Gateway &amp; sharding</h2>
      <p>
        Gateway configuration (<code>CLMGatewayConfiguration</code>) holds intents, large thresholds,
        gateway URL, token provider, and optional shard information. The
        <code>CLMDiscordGatewayClient</code> implements the full Discord Gateway v10 protocol, while
        <code>CLMShardManager</code> fans that out across multiple shards when you need to scale.
      </p>

      <h2>5. Commands framework (prefix commands)</h2>
      <p>
        Caelum includes a lightweight text command framework built around
        <code>CLMCommand</code>, <code>CLMCommandContext</code>, and <code>CLMCommandRouter</code>. It
        handles prefix parsing, cooldowns, and permission checks while exposing a familiar
        Objective-C delegate style for your own logic.
      </p>

      <h2>6. Components &amp; interactions</h2>
      <p>
        For buttons, select menus, action rows, and text inputs you will use types like
        <code>CLMButton</code>, <code>CLMSelectMenu</code>, <code>CLMActionRow</code>, and
        <code>CLMTextInput</code>. Interaction payloads are represented by
        <code>CLMComponentInteraction</code>, which maps raw gateway payloads into typed Objective-C
        objects.
      </p>

      <h2>7. Auto moderation</h2>
      <p>
        AutoMod support is modeled with <code>CLMAutoModAction</code>, <code>CLMAutoModTrigger</code>,
        and <code>CLMAutoModRule</code>. REST helpers on <code>CLMDiscordRESTClient</code> let you list,
        create, modify, and delete rules.</p>

      <h2>8. Localization &amp; application install</h2>
      <p>
        Types such as <code>CLMLocale</code>, <code>CLMLocalizedString</code>, and
        <code>CLMLocaleUtils</code> make it practical to build localized application commands. The
        <code>CLMApplicationInstallUtils</code> helpers assist with install-time configuration for your
        application commands.
      </p>

      <h2>9. Forum, polls, emoji, and message snapshots</h2>
      <p>
        Caelum&apos;s model layer includes support for forum channels, polls, application emoji, and
        message snapshots. These give you strongly-typed structs around the newer Discord features
        so you do not have to hand-roll JSON payloads.
      </p>

      <h2>10. Coverage summary</h2>
      <p>
        The REST surface covers users, channels, messages, reactions, threads, guilds and members,
        roles, bans, emojis &amp; stickers (guild and application), invites, application commands,
        interactions, audit log, scheduled events, stage instances, auto moderation, voice state,
        templates, welcome screens, onboarding, polls, and forum helpers.
      </p>
      <p>
        The Gateway surface implements the full v10 protocol, including identify, heartbeats,
        reconnect/resume, shard-aware callbacks, and utilities for presence updates and guild member
        chunking.
      </p>

      <h2>11. Where to go next</h2>
      <ul>
        <li>
          <a href="/caelum/getting-started">Getting Started</a> &ndash; installation and a minimal
          Objective-C bot.
        </li>
        <li>
          <a href="/caelum/api">API Reference</a> &ndash; a rendered view of the complete
          <code>caelum-docs.md</code> document.
        </li>
        <li>
          <a href="/caelum/faq">FAQ</a> &ndash; common issues and recommended fixes.
        </li>
        <li>
          <a href="/caelum/changelog">Changelog</a> &ndash; release history and upgrade guidance.
        </li>
      </ul>
    </article>
  );
}
