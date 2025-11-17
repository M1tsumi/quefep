<div align="center">

# Caelum

**Objective‑C Discord Gateway & REST library**

*Last updated: 2025-11-16*

</div>

Caelum is a clean, fast, Objective‑C–native library for the Discord Gateway (v10) and REST API.

This document provides a **developer‑oriented overview of all features and public surfaces** exposed by Caelum so you can build Discord bots and integrations directly from this file plus the headers.

For full type signatures, always refer to the headers under `Source` (or the umbrella headers `Caelum.h` / `include/Caelum/Caelum.h`).

---

## Table of contents

- [1. Getting Started](#1-getting-started)
- [2. Architecture Overview](#2-architecture-overview)
- [3. Core Utilities](#3-core-utilities)
- [4. REST Client & HTTP Layer](#4-rest-client--http-layer)
- [5. Gateway & Sharding](#5-gateway--sharding)
- [6. Commands Framework (Prefix Commands)](#6-commands-framework-prefix-commands)
- [7. Components & Interactions](#7-components--interactions)
- [8. Auto Moderation](#8-auto-moderation)
- [9. Localization & Application Install](#9-localization--application-install)
- [10. Forum, Polls, Application Emoji, Message Snapshots](#10-forum-polls-application-emoji-message-snapshots)
- [11. Feature & Endpoint Coverage Summary](#11-feature--endpoint-coverage-summary)
- [12. Where to Go Next](#12-where-to-go-next)

---

## 1. Getting Started

### 1.1. Installation (SwiftPM)

Add Caelum to `Package.swift`:

```swift
.dependencies: [
    .package(url: "https://github.com/M1tsumi/Caelum.git", from: "0.1.1")
],
.targets: [
    .target(
        name: "YourApp",
        dependencies: [
            .product(name: "Caelum", package: "Caelum")
        ]
    )
]
```

Import from Objective‑C:

```objc
#import <Caelum/Caelum.h>
// or, if vendored:
#import "Caelum.h"
```

### 1.2. Tokens – `CLMTokenProvider`

Authentication is abstracted behind:

```objc
@protocol CLMTokenProvider <NSObject>
- (nullable NSString *)botToken;
@end
```

You implement this protocol once in your app and plug it into:

- `CLMRESTConfiguration.tokenProvider`
- `CLMGatewayConfiguration.tokenProvider`

so REST and Gateway can obtain the bot token when needed.

### 1.3. High‑Level Client – `CLMDiscordClient`

The high‑level client wires REST and Gateway together from a shared configuration:

- `CLMClientConfiguration`
  - Holds `CLMRESTConfiguration` and `CLMGatewayConfiguration`.
  - `+ defaultConfiguration` sets sensible defaults:
    - REST base URL `https://discord.com/api/v10/`, timeout 30s.
    - Gateway URL `wss://gateway.discord.gg/?v=10&encoding=json`.

- `CLMDiscordClient`
  - Properties:
    - `rest` – `CLMDiscordRESTClient` instance.
    - `gateway` – `CLMDiscordGatewayClient` instance.
  - Initialisers:
    - `initWithREST:gateway:` – inject your own instances.
    - `initWithConfiguration:` – build from `CLMClientConfiguration`.

Typical bootstrapping:

```objc
CLMClientConfiguration *config = [CLMClientConfiguration defaultConfiguration];
config.restConfiguration.tokenProvider = myTokenProvider;
config.gatewayConfiguration.tokenProvider = myTokenProvider;

CLMDiscordClient *client = [[CLMDiscordClient alloc] initWithConfiguration:config];

// REST
[client.rest getCurrentUser:^(CLMRESTResponse *resp) { /* handle */ }];

// Gateway
client.gateway.delegate = self; // adopt CLMGatewayEventDelegate
[client.gateway connect];
```

---

## 2. Architecture Overview

Caelum is organised into the following top‑level modules (as seen in `Caelum.h`):

- **Core**
  - `CLMLogger`, `CLMDefaultLogger`
  - `CLMErrors` (`CLMErrorDomain`, `CLMErrorCode`)
  - `CLMClock`, `CLMSystemClock`
  - `CLMEventCenter`, `CLMEventListener`
  - `CLMCachePolicy`, `CLMCacheManager`, `CLMCacheEntry`
- **REST**
  - `CLMRESTConfiguration`, `CLMRESTRequest`, `CLMRESTResponse`
  - `CLMRateLimiter`
  - `CLMDiscordRESTClient`
  - Paginators: `CLMMessagesPaginator`, `CLMMembersPaginator`
- **Gateway**
  - `CLMGatewayConfiguration`, `CLMIntents`
  - `CLMWebSocketConnection`
  - `CLMDiscordGatewayClient`, `CLMGatewayEventDelegate`
  - Sharding: `CLMShardManager`, `CLMShardManagerDelegate`
- **Client**
  - `CLMDiscordClient`, `CLMClientConfiguration`
- **Commands (text command scaffolding)**
  - `CLMCommand`, `CLMCommandContext`
  - `CLMCommandRouter`
  - `CLMCommandCooldownManager`
  - `CLMCommandPermissionChecker`
- **Models**
  - IDs: `CLMSnowflake`
  - Components & interactions: `CLMComponents`, `CLMButton`, `CLMSelectMenu`, `CLMSelectMenuOption`, `CLMActionRow`, `CLMTextInput`, `CLMComponentInteraction`
  - Auto moderation: `CLMAutoModAction`, `CLMAutoModTrigger`, `CLMAutoModRule`
  - Localization: `CLMLocale`, `CLMLocaleUtils`, `CLMLocalizedString`
  - Forum: `CLMForumChannel`, `CLMForumTag`
  - Polls: `CLMPoll`, `CLMPollAnswer`
  - Application Emoji: `CLMApplicationEmoji`
  - Message snapshots: `CLMMessageSnapshot`
  - Application install helpers: `CLMApplicationInstallUtils` and related enums

Together, these surface **all features described in the README coverage matrix**.

---

## 3. Core Utilities

### 3.1. Logging – `CLMLogger`, `CLMDefaultLogger`

- `CLMLogger` protocol defines `logWithLevel:message:`.
- `CLMDefaultLogger` is a simple implementation you can replace with your own.

### 3.2. Errors – `CLMErrorDomain`, `CLMErrorCode`

- Error domain: `CLMErrorDomain`.
- Error codes: `CLMErrorUnknown`, `CLMErrorNetwork`, `CLMErrorDecode`, `CLMErrorUnauthorized`, `CLMErrorRateLimited`, `CLMErrorServer`.
- Returned primarily in `CLMRESTResponse.error`.

### 3.3. Time – `CLMClock`, `CLMSystemClock`

- Abstracts clock access via `now`.
- `CLMSystemClock` is the built‑in implementation.

### 3.4. IDs – `CLMSnowflake`

- Wraps Discord snowflake IDs (`unsigned long long`).
- Provides `initWithString:` and `stringValue` for safe conversion.

### 3.5. Event Center – `CLMEventCenter`

- Converts raw events into a simple pub/sub model:
  - Register listener: `addListenerForEvent:queue:block:` → returns `CLMEventToken`.
  - Remove listener: `removeListenerWithToken:`.
  - Publish event: `postEvent:payload:`.
- `+ shared` exposes a singleton event bus.

### 3.6. Cache – `CLMCachePolicy`, `CLMCacheManager`

- `CLMCachePolicy`
  - Time‑to‑live (`timeToLive`), max items (`maxItems`).
  - `+ policyWithTTL:maxItems:` factory.
- `CLMCacheManager`
  - Namespaced key–value cache for arbitrary objects.
  - APIs to set/get/remove/prune cached entries.

---

## 4. REST Client & HTTP Layer

### 4.1. Request/Response Types

- **`CLMRESTConfiguration`** – base URL, timeout, token provider.
- **`CLMRESTRequest`** – HTTP method, route, optional JSON body, audit log reason, and optional multipart files via `CLMRESTFilePart`.
- **`CLMRESTResponse`** – status code, decoded `JSONObject`, and `NSError` (including rate‑limit and decode failures).
- **`CLMRateLimiter`** – internal per‑route queueing to respect Discord 429s.

### 4.2. Main REST Client – `CLMDiscordRESTClient`

The REST client is the primary surface for talking to Discord’s HTTP API. It exposes **typed helpers** that cover:

- Users & current application
- Channels & messages (including attachments and crossposting)
- Reactions
- Threads
- Webhooks (management and execution)
- Guilds and guild widgets
- Roles & guild members
- Bans
- Emojis (guild) and stickers
- Application Emojis
- Invites
- Application commands (global & guild)
- Interactions (callbacks, followups, modals)
- Audit log
- Scheduled events
- Stage instances
- Auto moderation rules
- Voice state modifications
- Guild templates
- Welcome screen
- Onboarding
- Polls
- Forum helpers

Each helper corresponds to a specific Discord v10 endpoint. For the **exact method names and parameters**, see `Source/REST/CLMDiscordRESTClient.h`. They are grouped there with comments per category; the mapping is 1‑to‑1 with the feature list above.

### 4.3. Pagination – `CLMMessagesPaginator`, `CLMMembersPaginator`

- `CLMMessagesPaginator`
  - Created with a `CLMDiscordRESTClient`, `channelID`, and page size.
  - `nextPageWithCompletion:` fetches the next batch of messages.
  - `hasMoreHint` indicates whether more pages are likely available.
- `CLMMembersPaginator`
  - Similar pattern for guild members, using the `after` cursor.

These wrap common paging patterns (messages and members) while staying close to the underlying REST methods.

---

## 5. Gateway & Sharding

### 5.1. Gateway Configuration – `CLMGatewayConfiguration`, `CLMIntents`

- Intents bitmask: `CLMIntents` (e.g. `CLMIntentGuilds`, `CLMIntentGuildMessages`).
- Properties:
  - `intents` – required to receive specific event categories.
  - `largeThreshold` – member count threshold for guild payloads.
  - `gatewayURL` – defaults to the official Discord Gateway v10 URL.
  - `tokenProvider` – same `CLMTokenProvider` abstraction.
  - `shardId`, `shardCount` – sharding configuration (optional).

### 5.2. Low‑Level WebSocket – `CLMWebSocketConnection`

- Connects to a URL with optional headers.
- Delivers parsed JSON objects to `CLMWebSocketConnectionDelegate` callbacks.
- Used internally by the gateway client; you rarely need it directly unless customising transport.

### 5.3. Gateway Client – `CLMDiscordGatewayClient`

Implements the full Discord Gateway v10 protocol:

- Handles Identify (OP 2), Hello (OP 10), Heartbeat (OP 1), Heartbeat ACK (OP 11).
- Tracks session ID and sequence, supports Resume (OP 6), Reconnect (OP 7), Invalid Session (OP 9).
- Routes Dispatch (OP 0) events to a delegate with both generic and shard‑aware callbacks.
- Exposes helpers for:
  - `sendPresenceUpdate:` (Presence Update, OP 3).
  - `requestGuildMembers:query:userIDs:limit:presences:nonce:` (Request Guild Members, OP 8).

Events are delivered via `CLMGatewayEventDelegate`, including typed helpers for:

- Any dispatch event name + raw payload
- Interactions – `gatewayDidReceiveInteraction:` with `CLMComponentInteraction`
- Guild members chunk events
- Connect/disconnect notifications (with optional shard ID)

### 5.4. Shard Manager – `CLMShardManager`

For high‑scale bots, `CLMShardManager` manages multiple `CLMDiscordGatewayClient` instances:

- Created with a base `CLMGatewayConfiguration` and a shard count.
- Starts and stops all shards (`startAll`, `stopAll`).
- Implements `CLMGatewayEventDelegate` and forwards events to `CLMShardManagerDelegate` with shard IDs.
- Provides `clientForGuildId:` to resolve the shard responsible for a particular guild.

---

## 6. Commands Framework (Prefix Commands)

Caelum includes a lightweight MEE6‑style text command framework.

### 6.1. Command Context – `CLMCommandContext`

Encapsulates the environment for a text command execution:

- Raw message JSON.
- Parsed message content and arguments.
- `guildId`, `channelId`, `authorId`.
- Bound `rest` and (optional) `gateway` clients for issuing API calls.

### 6.2. Command Protocol – `CLMCommand`

To define a command, implement `CLMCommand`:

- `name` – primary command name.
- `commandDescription` – short human‑readable description.
- `aliases` – additional trigger names (optional).
- `cooldownSeconds` – per‑user cooldown handled by `CLMCommandCooldownManager`.
- `requiredPermissions` – symbolic permission names (e.g. `"MANAGE_MESSAGES"`).
- `executeWithContext:completion:` – your command logic.

### 6.3. Command Router – `CLMCommandRouter`

The router ties Gateway `MESSAGE_CREATE` events to your `CLMCommand` objects:

- Construct with a REST and optional Gateway client.
- Configure a prefix (e.g. `!`, `?`).
- Register commands with `registerCommand:`.
- Optionally add middlewares (`CLMCommandMiddleware`) for cross‑cutting concerns (logging, metrics, etc.).
- Optionally set a `permissionChecker` (`CLMCommandPermissionChecker`) to enforce guild permissions.
- On each `MESSAGE_CREATE`, pass the payload to `handleMessageCreatePayload:`.

The router:

1. Checks the prefix.
2. Parses the command name and arguments.
3. Applies cooldowns and permission checks.
4. Builds `CLMCommandContext` and calls the command implementation.

### 6.4. Cooldowns – `CLMCommandCooldownManager`

Internal support for `cooldownSeconds` on commands:

- Tracks per‑user invocation timestamps.
- Exposed as `router.cooldowns` if you need direct control or custom feedback.

### 6.5. Permissions – `CLMCommandPermissionChecker`

A pluggable interface for your permission logic:

- Given a user ID, required permission names, and an optional guild ID, returns whether the user is allowed to run the command.

---

## 7. Components & Interactions

Caelum provides full support for message components and interaction payloads.

### 7.1. Component Types – `CLMComponents`

- Component type enum: buttons, action rows, select menus (string, user, role, mentionable, channel), and text inputs.
- Button style enum: primary, secondary, success, danger, link.
- Components error domain plus error codes for invalid layouts, invalid fields, out‑of‑range values, and serialization issues.

### 7.2. Buttons – `CLMButton`

Model for a Discord button component with:

- Style, label, emoji (name/id/animated), custom ID, URL, disabled flag.
- JSON conversion helpers: `fromJSON:` and `toJSON`.

### 7.3. Select Menus – `CLMSelectMenu`, `CLMSelectMenuOption`, `CLMSelectMenuBuilder`

- `CLMSelectMenu` models the select component itself (type, `customId`, min/max values, placeholder, disabled, options, and optional channel types).
- `CLMSelectMenuOption` models one option (label, value, description, emoji, default flag).
- `CLMSelectMenuBuilder` is a fluent builder for valid select menus and performs validation in `build:`.

### 7.4. Action Rows – `CLMActionRow`

- Represents a container (row) of components.
- Exposes `validateComponents:` and JSON helpers.

### 7.5. Text Inputs – `CLMTextInput`

- Supports modal text input components (short and paragraph styles).
- Properties for label, required flag, min/max length, default value, and placeholder.

### 7.6. Interaction Model – `CLMComponentInteraction`

- Represents `INTERACTION_CREATE` payloads for components and modals.
- Contains IDs (interaction, application, guild, channel), type, component type, custom ID, selected values, resolved entities, and modal submission fields.
- `+ fromGatewayPayload:` maps raw gateway payloads into this model.

Together with the REST interaction helpers (callbacks, followups, modals), this provides full coverage for Discord components and UI flows.

---

## 8. Auto Moderation

Caelum models AutoMod rules, triggers, and actions, and provides REST helpers for managing them via `CLMDiscordRESTClient`.

### 8.1. Models

- `CLMAutoModAction`
  - Enum `CLMAutoModActionType`: block message, send alert message, timeout.
  - Properties for custom message, alert channel, and timeout duration.
  - JSON conversion helpers.
- `CLMAutoModTrigger`
  - Enum `CLMAutoModTriggerType`: keyword, spam, keyword preset, mention spam.
  - Keyword filters, regex patterns, allow lists.
  - Mention spam thresholds.
  - Keyword preset IDs (`CLMAutoModKeywordPreset`).
- `CLMAutoModRule`
  - Rule ID, guild ID, name, event type, trigger type & metadata, actions, enabled flag, exempt roles/channels.
  - JSON helpers for constructing create/modify payloads.

### 8.2. REST Coverage

`CLMDiscordRESTClient` exposes methods to:

- List rules in a guild.
- Get a rule by ID.
- Create a rule from JSON.
- Modify a rule.
- Delete a rule.

---

## 9. Localization & Application Install

### 9.1. Localization

- `CLMLocale` – extensible string enum for supported locales (e.g. `CLMLocale_enUS`, `CLMLocale_esES`, etc.).
- `CLMLocaleUtils` – helper for listing supported locales and checking if a key is supported.
- `CLMLocalizedString` – base string plus a map of locale → localized text, with JSON representation used in Discord payloads.

These types are especially useful when building application commands with localized names and descriptions.

### 9.2. Application Install Helpers – `CLMApplicationInstallUtils`

- Enums modelling integration types and application command context types (`guild`, `bot DM`, `private channel`).
- `CLMApplicationInstallUtils` exposes a helper to apply install fields to command JSON used with application command REST operations.

---

## 10. Forum, Polls, Application Emoji, Message Snapshots

### 10.1. Forum – `CLMForumChannel`, `CLMForumTag`

- Models Discord forum channels: layout, sort order, available tags, default reaction emoji, thread rate limit.
- `CLMForumChannel` can be constructed from JSON and converted back to a patch payload.
- `CLMForumTag` models individual tags and their emoji metadata.

### 10.2. Polls – `CLMPoll`, `CLMPollAnswer`

- `CLMPoll` models a poll question, answer options, multiselect flag, and optional duration.
- `CLMPollAnswer` models individual answers and their emoji.
- Combined with REST helpers for sending poll messages and fetching poll voters.

### 10.3. Application Emoji – `CLMApplicationEmoji`

- Represents an application‑scoped emoji and its flags (requires colons, managed, animated).
- Helpers for building create/modify payloads.
- Used alongside REST methods for listing/creating/modifying/deleting application emoji.

### 10.4. Message Snapshots – `CLMMessageSnapshot`

- Stores message metadata suitable for link previews and embeds (message ID, channel ID, guild ID, author name/id, excerpt, jump URL).
- `toEmbedJSON` builds a Discord embed representing the snapshot.

---

## 11. Feature & Endpoint Coverage Summary

Caelum’s REST surface (`CLMDiscordRESTClient`) covers, at the time of this documentation:

- **Users** – current user, arbitrary user.
- **Channels** – get/modify/delete channels; typing indicator; webhooks in a channel.
- **Messages** – list, send, edit, delete; attachments (multipart); pins; bulk delete; crossposting.
- **Reactions** – add/remove own reaction; list users; remove user reaction; delete all reactions or by emoji.
- **Threads** – create from message or standalone; join/leave; manage members; list archived/joined/active.
- **Guilds** – get/modify guild; list channels/members; prune count/start; widgets; vanity URL; integrations.
- **Guild Members** – get/modify/kick; add/remove roles; search; pagination.
- **Roles** – list/create/delete roles.
- **Bans** – ban/unban; list bans; get a specific ban.
- **Guild Emojis & Stickers** – full CRUD for guild emojis and stickers.
- **Application Emojis** – list/get/create/modify/delete application‑scoped emojis.
- **Invites** – create/delete invites with optional settings and audit log reasons.
- **Application Commands** – global & guild list/create/edit/delete.
- **Interactions** – initial callbacks (defer/update/reply/present modal), original response CRUD, followup CRUD.
- **Audit Log** – fetch with user, action type, and pagination filters.
- **Scheduled Events** – list/create/modify/delete events and list subscribed users.
- **Stage Instances** – create/modify/delete/get.
- **Auto Moderation** – list/get/create/modify/delete AutoMod rules.
- **Voice State** – modify your own or another user’s voice state in a guild.
- **Templates** – list/get/create/modify/sync/delete guild templates.
- **Welcome Screen** – get/modify the guild welcome screen.
- **Onboarding** – get/modify guild onboarding configuration.
- **Polls** – send messages with polls; fetch poll answer users.
- **Forum** – helpers for forum channels and tags when patching channels.

The Gateway surface (`CLMDiscordGatewayClient` + `CLMShardManager`) covers:

- Identify, Hello, Heartbeats, Heartbeat ACKs.
- Automatic session tracking and Resume.
- Reconnect and Invalid Session handling with jittered re‑identify.
- READY event session capture.
- Presence updates and guild members chunk requests.
- Sharding and shard‑aware event callbacks.

The Commands, Components, AutoMod, Localization, Polls, Forum, Emoji, and Snapshot models provide strongly‑typed representations and helpers for building correct JSON payloads.

---

## 12. Where to Go Next

- For exact method signatures and full parameter lists, open the headers referenced in this document (e.g. `CLMDiscordRESTClient.h`, `CLMDiscordGatewayClient.h`, `CLMCommandRouter.h`).
- Use this `caelum-docs.md` as an **index of capabilities** and as a starting point for exploring the API surface when building your bot or integration.
