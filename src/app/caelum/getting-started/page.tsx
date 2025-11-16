import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <p>
        Use this guide to install Caelum, configure credentials, and bring an Objective-C bot online
        with minimal boilerplate.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Xcode 15 or the latest Objective-C toolchain on macOS.</li>
        <li>A Discord application with a bot token and intents enabled in the Developer Portal.</li>
        <li>A long-running process (macOS app, daemon, or CLI) that can keep a run loop alive.</li>
      </ul>

      <h2>Install Caelum</h2>
      <h3>CocoaPods</h3>
      <CodeBlock language="bash" code={`pod 'Caelum', '~> 0.1'`} />

      <h3>Swift Package Manager</h3>
      <CodeBlock
        language="swift"
        code={`dependencies: [
    .package(url: "https://github.com/M1tsumi/Caelum.git", from: "0.1.0")
]

targets: [
    .executableTarget(
        name: "CaelumBot",
        dependencies: [.product(name: "Caelum", package: "Caelum")]
    )
]`}
      />

      <h2>Provide credentials securely</h2>
      <ol>
        <li>Store the bot token in your keychain, launch agent plist, or environment variables.</li>
        <li>Expose it at runtime as <code>DISCORD_BOT_TOKEN</code> to avoid hardcoding secrets.</li>
        <li>Grant the intents that match your use case (e.g., Guilds, Guild Messages, Message Content).</li>
      </ol>

      <h2>Hello Caelum</h2>
      <p>The following example logs in, listens for <code>!ping</code>, and keeps the run loop alive:</p>
      <CodeBlock
        language="objective-c"
        code={`@import Caelum;

int main(int argc, char * argv[]) {
    @autoreleasepool {
        NSString *token = [[[NSProcessInfo processInfo] environment] objectForKey:@"DISCORD_BOT_TOKEN"] ?: @"";
        CLClientConfiguration *config = [[CLClientConfiguration alloc] initWithToken:token];
        config.intents = CLIntentsGuilds | CLIntentsGuildMessages | CLIntentsMessageContent;

        CLClient *client = [[CLClient alloc] initWithConfiguration:config];

        [client onReady:^(CLReadyEvent *event) {
            NSLog(@"✅ Logged in as %@#%@", event.user.username, event.user.discriminator);
        }];

        [client onMessageCreate:^(CLMessageCreateEvent *event) {
            if ([event.message.content isEqualToString:@"!ping"]) {
                [client.rest createMessageInChannel:event.message.channelID
                                            content:@"Pong!"
                                            completion:nil];
            }
        }];

        [client connectWithCompletion:^(NSError * _Nullable error) {
            if (error) {
                NSLog(@"❌ Connection failed: %@", error);
            }
        }];

        [[NSRunLoop currentRunLoop] run];
    }
}`}
      />

      <h2>Next steps</h2>
      <ul>
        <li>Learn more about lifecycle and configuration in the <a href="/caelum/api/client">Client</a> docs.</li>
        <li>Stream gateway events with <a href="/caelum/api/gateway">Gateway</a> and leverage typed entities from <a href="/caelum/api/models">Models</a>.</li>
        <li>Compose outbound workflows using the <a href="/caelum/api/rest">REST</a> helpers.</li>
      </ul>
    </article>
  );
}
