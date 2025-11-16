<div align="center">

# SwiftDisc

**Modern async/await Discord API wrapper for Swift**

*Last updated: 2025-11-16*

</div>

SwiftDisc is a modern, async/await-based Discord API wrapper written in Swift. It is designed to feel like idiomatic Swift, while covering the full Discord HTTP API, Gateway, interactions, and (experimental) voice support.

This document is a **developer-oriented reference** to the SwiftDisc API surface and architecture. It complements `README.md` (getting started, examples) and `SwiftDiscDocs.txt` (inline notes) by giving you a single place to understand **what is available** and **how it fits together**.

---

## Table of contents

- [1. Package structure & modules](#1-package-structure--modules)
- [2. Installation & basic usage](#2-installation--basic-usage)
- [3. Core configuration & types](#3-core-configuration--types)
- [4. `DiscordClient`: high-level facade](#4-discordclient-high-level-facade)
- [5. Event model & dispatcher](#5-event-model--dispatcher)
- [6. Gateway & sharding](#6-gateway--sharding)
- [7. REST: HTTPClient & client helpers](#7-rest-httpclient--client-helpers)
- [8. Models overview](#8-models-overview)
- [9. Interactions, slash commands, and autocomplete](#9-interactions-slash-commands-and-autocomplete)
- [10. Voice support (experimental)](#10-voice-support-experimental)
- [11. Platform support & Windows notes](#11-platform-support--windows-notes)
- [12. Error handling, rate limiting, and resilience](#12-error-handling-rate-limiting-and-resilience)
- [13. Testing & examples](#13-testing--examples)
- [14. Related documentation](#14-related-documentation)

---

## 1. Package structure & modules

SwiftDisc is distributed as a Swift Package with a single primary library target:

- **Module**: `SwiftDisc`
  - Core types: `DiscordClient`, `DiscordConfiguration`, `Snowflake<T>`, models, errors.
  - Subsystems:
    - Gateway: `GatewayClient`, `GatewayEvent`, `DiscordEvent`, `WebSocket`.
    - REST: `HTTPClient`, `RateLimiter`, REST helper methods on `DiscordClient`.
    - Voice (experimental): `VoiceClient`, `VoiceGateway`, `Secretbox`.
    - Caching & dispatch: `Cache`, `EventDispatcher`.
    - Command routing: `CommandRouter`, `SlashCommandRouter`, `AutocompleteRouter`.
    - Models: channels, messages, guilds, members, invites, templates, stickers, interactions, auto-moderation, audit logs, scheduled events, etc.

The test target `SwiftDiscTests` provides examples of sharding, slash commands, and basic client initialization.

---

## 2. Installation & basic usage

### 2.1. Adding SwiftDisc as a dependency

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/M1tsumi/SwiftDisc.git", from: "0.10.0"),
],

.targets: [
    .executableTarget(
        name: "MyBot",
        dependencies: [
            .product(name: "SwiftDisc", package: "SwiftDisc"),
        ]
    )
]
```

### 2.2. Creating a client

```swift
import SwiftDisc

let token = ProcessInfo.processInfo.environment["DISCORD_TOKEN"]!
let client = DiscordClient(token: token)

await client.connect()
```

You can configure behavior through `DiscordConfiguration` (see below) and by setting callback properties or consuming the `events` stream.

---

## 3. Core configuration & types

### 3.1. `DiscordConfiguration`

`DiscordConfiguration` controls high-level client behavior:

- **intents**: Gateway intents bitmask to subscribe to specific event categories.
- **presence**: Initial presence/activity.
- **shardCount / shardIndex**: Sharding configuration.
- **largeThreshold**: Member chunking threshold.
- **requestTimeouts / retryPolicy**: HTTP behavior (if exposed in your version).
- **voiceEnabled**: Whether to enable experimental voice support.

You typically construct it and pass it to `DiscordClient.init`:

```swift
let config = DiscordConfiguration(
    intents: [.guilds, .guildMessages, .messageContent]
)
let client = DiscordClient(token: token, configuration: config)
```

### 3.2. `Snowflake<T>` and typed IDs

SwiftDisc uses a strongly-typed `Snowflake<T>` wrapper for all Discord IDs:

```swift
public struct Snowflake<Tag>: Codable, Hashable, CustomStringConvertible {
    public let rawValue: String
}
```

Common aliases include:

- `UserID`, `GuildID`, `ChannelID`, `MessageID`, `RoleID`, `EmojiID`.
- `ApplicationID`, `ApplicationCommandID`, `WebhookID`.
- `GuildScheduledEventID`, `StageInstanceID`, `StickerID`, `StickerPackID`, `SKUID`.
- `AuditLogEntryID`, `AutoModerationRuleID`, and others.

Where a model refers to an ID, it uses the appropriate alias instead of bare `String`.

---

## 4. `DiscordClient`: high-level facade

`DiscordClient` is the main entry point; it ties together HTTP, Gateway, voice, cache, and routing.

Key properties and components:

- **HTTP**: internal `HTTPClient` for REST calls.
- **Gateway**: internal `GatewayClient` for WebSocket connection and events.
- **Voice**: optional `VoiceClient` when voice is enabled.
- **Cache**: `cache` property with users, channels, messages, guilds.
- **Events**: `public var events: AsyncStream<DiscordEvent>`.

### 4.1. Events & callbacks

You can consume events in two ways:

1. **Async sequence**:

   ```swift
   for await event in client.events {
       switch event {
       case .messageCreate(let message):
           // ...
       case .guildCreate(let guild):
           // ...
       default:
           break
       }
   }
   ```

2. **Callback properties**:

   ```swift
   client.onReady = { ready in
       print("Logged in as \(ready.user.username)")
   }

   client.onMessage = { message in
       // messageCreate shortcut
   }
   ```

### 4.2. Command routers

SwiftDisc includes command abstractions `CommandRouter` and `SlashCommandRouter`:

- **Prefix commands** via `commands: CommandRouter?`
- **Slash commands** via `slashCommands: SlashCommandRouter?`
- **Autocomplete** via `autocomplete: AutocompleteRouter?`

You attach routers with:

```swift
let commands = CommandRouter(prefix: "!")
client.useCommands(commands)

let slash = SlashCommandRouter()
client.useSlashCommands(slash)

let auto = AutocompleteRouter()
client.useAutocomplete(auto)
```

Routers integrate with the event pipeline via `EventDispatcher`, which looks at message and interaction events and invokes the appropriate handlers.

### 4.3. Extensions / Cogs

SwiftDisc supports modular extensions (`SwiftDiscExtension`) loaded into the client:

- `public func loadExtension(_ ext: SwiftDiscExtension) async`
- `public func unloadExtensions() async`

Extensions can:

- Register handlers.
- Attach commands or slash commands.
- Hold independent state.

---

## 5. Event model & dispatcher

### 5.1. `DiscordEvent`

`DiscordEvent` is the main enum produced by the Gateway, covering events like:

- `ready(ReadyEvent)`
- `guildCreate(Guild)` / `guildUpdate(Guild)` / `guildDelete(GuildUnavailable)`
- `messageCreate(Message)` / `messageUpdate(Message)` / `messageDelete(MessageDelete)`
- Reaction events, typing start, member events, voice state updates, etc.

### 5.2. `EventDispatcher`

`EventDispatcher` is an internal component that:

- Updates the **cache** when events arrive (users, guilds, channels, messages).
- Dispatches to callback adapters (`onMessage`, `onReady`, etc.).
- Routes events into command routers and slash command routers.

You don’t normally call it directly; it’s wired inside `DiscordClient`.

---

## 6. Gateway & sharding

### 6.1. `GatewayClient`

Handles the raw WebSocket connection to Discord’s Gateway:

- Identifies with intents and shard info.
- Receives payloads, decodes into `DiscordEvent`.
- Sends heartbeats using an actor-isolated heartbeat loop.
- Handles reconnect and resume logic.

### 6.2. Sharding utilities

Sharding support includes:

- A `ShardedEvent` wrapper with:
  - `shardId`
  - underlying `DiscordEvent`
  - `receivedAt` timestamp
  - `shardLatency: TimeInterval?`

- Helpers to compute which shard a guild belongs to.
- Tests in `ShardingTests.swift` that show how to calculate shard IDs and expected behavior.

---

## 7. REST: HTTPClient & client helpers

### 7.1. `HTTPClient`

An internal structure used by `DiscordClient` to talk to Discord’s HTTP API.

- Uses `URLSession` on Apple / FoundationNetworking platforms.
- On Windows and platforms without URLSession, a stub implementation exists so the package compiles; actual HTTP behavior may be limited.
- Handles:
  - Request construction and JSON encoding/decoding.
  - Rate limiting via an actor `RateLimiter` that updates from HTTP headers.
  - API errors via a shared `APIErrorBody` model.

As a user of SwiftDisc, you normally use **high-level REST methods** on `DiscordClient` instead of calling `HTTPClient` directly.

### 7.2. Common REST methods on `DiscordClient`

The client exposes a wide range of methods (names may differ slightly depending on version), including:

- **Channels**:
  - Create/edit/delete channels.
  - Edit permissions.
  - Trigger typing indicator.

- **Messages**:
  - Send, edit, delete, crosspost messages.
  - Manage reactions.

- **Guilds**:
  - Fetch guilds, members, roles.
  - Manage bans, kicks, role assignments.

- **Invites**:
  - Create and delete invites.

- **Templates**:
  - Fetch and sync templates.

- **Stickers**:
  - Manage guild stickers and packs.

- **Scheduled events and stages**:
  - Create/edit/delete scheduled events.
  - Manage stage instances.

- **Auto-moderation**:
  - Create/edit/delete auto-moderation rules.

- **Audit logs**:
  - Fetch audit log entries with typed IDs.

These helpers are thin wrappers over HTTP endpoints, using typed models and `Snowflake` IDs to maximize type safety.

---

## 8. Models overview

SwiftDisc defines Codable, Hashable models mapping the Discord API schema into Swift structures. Some key ones:

- **Guild** and related:
  - `Guild`, `GuildMember`, `GuildRole`, `GuildWidgetSettings`, `PartialGuild`.

- **Channels & messages**:
  - `Channel`, `Message`, `MessageReference`, `Attachment`, `Embed`, `Reaction`.

- **Users & presence**:
  - `User`, `Presence`, `Activity`.

- **Interactions & commands**:
  - `Interaction` (slash commands, context menu, autocomplete).
  - `ApplicationCommand`, `ApplicationCommandOption`, `ApplicationCommandData`.

- **Voice & stage**:
  - `VoiceState`, `VoiceRegion`, `StageInstance`.

- **Moderation & logs**:
  - `AutoModerationRule` and children.
  - `AuditLog`, `AuditLogEntry`, with typed references.

- **Misc**:
  - `Emoji`, `Webhook`, `Invite`, `Template`, `Sticker`, `StickerPack`.

Each model uses typed IDs and mirrors Discord’s JSON keys via `CodingKeys` when required.

---

## 9. Interactions, slash commands, and autocomplete

SwiftDisc’s interaction support revolves around:

- `Interaction` model representing interaction payloads.
- `SlashCommandRouter` that maps command names and option trees to handlers.
- `AutocompleteRouter` that provides autocomplete responses for options.

Typical flow:

1. Create a `SlashCommandRouter` and register commands.
2. Attach it to the client with `useSlashCommands`.
3. Implement handlers that accept interaction data and respond via REST helpers.

Tests in `SlashCommandRouterTests` show how nested options are interpreted.

---

## 10. Voice support (experimental)

Voice support is experimental and may require platform-specific setup.

### 10.1. `VoiceClient`

Responsible for:

- Managing per-guild voice sessions.
- Joining/leaving voice channels.
- Performing UDP IP discovery to determine the external IP/port.
- Handling voice state/server update events.
- Encrypting and sending Opus frames via RTP.

### 10.2. `VoiceGateway` & `Secretbox`

- **VoiceGateway**: minimal gateway that speaks the Discord voice protocol (HELLO, READY, SELECT_PROTOCOL, SESSION_DESCRIPTION, heartbeats).
- **Secretbox**: implementation of XSalsa20-Poly1305 using `Secretbox` and `salsa20`/`hsalsa20` primitives for audio encryption.

Because this relies on low-level networking and crypto primitives, behavior may differ by platform.

---

## 11. Platform support & Windows notes

SwiftDisc targets:

- iOS 14+
- macOS 11+
- tvOS 14+
- watchOS 7+
- Windows (Swift 5.9+ / 6.x)

### 11.1. Windows specifics

- Uses Swift’s Windows toolchain (e.g. 6.2-RELEASE) and Visual Studio 2022 + Windows SDK.
- Some APIs like `URLSessionConfiguration.waitsForConnectivity` are guarded with `#if !os(Windows)` to avoid compile-time errors.
- `HTTPClient` conditionally uses `FoundationNetworking` and has a stub path for platforms without full URLSession support.

Your CI is configured to:

- Run macOS builds/tests as the primary gate.
- Run Windows builds/tests in a **best-effort** job using Swift 6.2.

---

## 12. Error handling, rate limiting, and resilience

### 12.1. REST errors

- `HTTPClient` decodes error responses into `APIErrorBody` where available.
- Errors are surfaced via thrown Swift errors from `DiscordClient` REST methods.

### 12.2. Rate limiting

- `RateLimiter` is an actor that tracks bucket state from headers.
- Every HTTP response updates the limiter via `await rateLimiter.updateFromHeaders(...)`.
- Requests are queued or delayed to respect Discord’s limits.

### 12.3. Gateway resilience

- Automatic heartbeating.
- Reconnect/re-identify logic when the connection drops.
- Shard-aware event wrappers (`ShardedEvent`) to monitor latency.

---

## 13. Testing & examples

### 13.1. Unit tests

`SwiftDiscTests` contains:

- **ShardingTests**: shard calculations, latency measurement.
- **SlashCommandRouterTests**: nested option parsing behavior.
- **SwiftDiscTests**: basic client initialization smoke test.

These tests serve as small usage examples.

### 13.2. Example bot pattern

A minimal, robust bot might:

1. Read token from `DISCORD_TOKEN`.
2. Construct `DiscordConfiguration` with appropriate intents.
3. Create `DiscordClient`.
4. Set `onReady` and `onMessage` callbacks.
5. Attach command/slash routers.
6. Call `await client.connect()` and keep the process alive.

---

## 14. Related documentation

- **README.md**: high-level intro, quick start, platform requirements, CI status, and build/test instructions.
- **CHANGELOG.md**: version history and notable changes.
- **SwiftDiscDocs.txt** / **InstallGuide.txt**: additional narrative and setup help.

This `swiftdisc-docs.md` document is meant as a living, high-level map of the API. For exact signatures, always refer to the source in `Sources/SwiftDisc` and your IDE’s symbol navigation.
