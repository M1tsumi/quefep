export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <h2>Installation</h2>
      <h3>CocoaPods</h3>
      <pre><code>{`pod 'Caelum', '~> 0.1'`}</code></pre>
      <h3>Swift Package Manager</h3>
      <pre><code>{`dependencies: [
  .package(url: "https://github.com/M1tsumi/Caelum", from: "0.1.0")
]`}</code></pre>

      <h2>Quickstart (Objective-C)</h2>
      <pre><code>{`@import Caelum;

int main(int argc, char * argv[]) {
  @autoreleasepool {
    NSString *token = [[[NSProcessInfo processInfo] environment] objectForKey:@"DISCORD_BOT_TOKEN"] ?: @"";
    CLMClient *client = [[CLMClient alloc] initWithToken:token];

    [client loginAndConnectWithIntents:(CLMIntentGuilds | CLMIntentGuildMessages | CLMIntentMessageContent)
                           completion:^(NSError * _Nullable error) {
      if (error) {
        NSLog(@"❌ Error: %@", error);
      } else {
        NSLog(@"✅ Bot is online!");
      }
    }];

    [[NSRunLoop currentRunLoop] run];
  }
}`}</code></pre>

      <h2>Next steps</h2>
      <ul>
        <li>Review <a href="/caelum/api/client">Client</a> for lifecycle and configuration</li>
        <li>Handle events via <a href="/caelum/api/gateway">Gateway</a> and <a href="/caelum/api/models">Models</a></li>
        <li>Call HTTP endpoints using <a href="/caelum/api/rest">REST</a></li>
      </ul>
    </article>
  );
}
