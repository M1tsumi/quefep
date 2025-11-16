export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Caelum</h1>
      <p>
        Caelum is a Discord API wrapper for Objective-C focused on stability and compatibility. It
        is designed for iOS, macOS, and other Apple platforms where Objective-C is still a
        first-class language.
      </p>

      <h2>Key features</h2>
      <ul>
        <li>Objective-C first, with familiar Foundation types and patterns.</li>
        <li>Separation of concerns between Client, REST, and Gateway layers.</li>
        <li>Strongly-typed models for guilds, channels, members, and messages.</li>
        <li>Automatic rate limit handling, reconnection, and session resume.</li>
        <li>Logging, caching, and testing helpers to support real-world apps.</li>
      </ul>

      <h2>Supported platforms</h2>
      <p>
        Caelum targets modern Apple platforms that can run Objective-C code and talk to Discord:
      </p>
      <ul>
        <li>iOS and iPadOS apps.</li>
        <li>macOS menu bar apps, utilities, and full clients.</li>
        <li>Command-line tools built with Objective-C.</li>
      </ul>

      <h2>Minimal example</h2>
      <p>Here is a tiny example showing how a Caelum client might be bootstrapped:</p>
      <pre>
        <code>{`#import <Caelum/Caelum.h>

CLClientConfiguration *config = [[CLClientConfiguration alloc] initWithToken:@"Bot YOUR_TOKEN_HERE"];
config.intents = CLIntentsGuilds | CLIntentsGuildMessages;

CLClient *client = [[CLClient alloc] initWithConfiguration:config];

[client onReady:^(CLReadyEvent *event) {
    NSLog(@"Connected as %@#%@", event.user.username, event.user.discriminator);
}];

[client connectWithCompletion:nil];`}</code>
      </pre>

      <h2>Where to go next</h2>
      <ul>
        <li><a href="/caelum/getting-started">Getting Started</a> &mdash; installation and first bot.</li>
        <li><a href="/caelum/api">API Reference</a> &mdash; detailed Client, REST, and Gateway docs.</li>
        <li><a href="/caelum/faq">FAQ</a> &mdash; common questions and troubleshooting.</li>
        <li><a href="/caelum/changelog">Changelog</a> &mdash; version history and upgrade notes.</li>
      </ul>
    </article>
  );
}
