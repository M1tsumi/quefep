import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Caelum Overview</h1>
      <p>
        Caelum is a production-ready Objective-C client for the Discord API. It pairs Foundation
        style APIs with typed models, automatic rate-limit handling, and an event-driven gateway so
        you can add Discord automation to iOS, macOS, and command-line tooling without bolting Swift
        onto existing codebases.
      </p>

      <h2>Why teams reach for Caelum</h2>
      <ul>
        <li><strong>Objective-C first.</strong> APIs mirror familiar UIKit/AppKit patterns, right down to blocks and Foundation collections.</li>
        <li><strong>Layered architecture.</strong> Client, REST, Gateway, and Models stay decoupled so you can replace or mock any layer.</li>
        <li><strong>Operational safety.</strong> Automatic shard negotiation, connection resume, and bucketed rate limiting are on by default.</li>
        <li><strong>Tooling hooks.</strong> Logging, cache helpers, and test doubles make it easy to integrate with existing observability stacks.</li>
      </ul>

      <h2>Supported deployment targets</h2>
      <p>Anywhere Objective-C can run a long-lived process works well:</p>
      <ul>
        <li>iOS or iPadOS background services built with UIKit/App Extensions.</li>
        <li>macOS menu bar apps, launch agents, and full desktop clients.</li>
        <li>Command-line utilities or daemons that rely on Foundation.</li>
      </ul>

      <h2>Minimal example</h2>
      <p>Bootstrapping a client requires only a configuration and a couple of event handlers:</p>
      <CodeBlock
        language="objective-c"
        code={`#import <Caelum/Caelum.h>

CLClientConfiguration *config = [[CLClientConfiguration alloc] initWithToken:@"Bot YOUR_TOKEN_HERE"];
config.intents = CLIntentsGuilds | CLIntentsGuildMessages;

CLClient *client = [[CLClient alloc] initWithConfiguration:config];

[client onReady:^(CLReadyEvent *event) {
    NSLog(@"Connected as %@#%@", event.user.username, event.user.discriminator);
}];

[client connectWithCompletion:nil];`}
      />

      <h2>Where to go next</h2>
      <ul>
        <li><a href="/caelum/getting-started">Getting Started</a>. Install the SDK and wire up your first bot.</li>
        <li><a href="/caelum/api">API Reference</a>. Dive into Client, REST, Gateway, and Models.</li>
        <li><a href="/caelum/faq">FAQ</a>. Review common issues and recommended fixes.</li>
        <li><a href="/caelum/changelog">Changelog</a>. Track releases and upgrade guidance.</li>
      </ul>
    </article>
  );
}
