export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <h2>Installation (CocoaPods)</h2>
      <pre><code>{`pod 'Caelum', '~> 0.1'`}</code></pre>
      <h2>Installation (SPM)</h2>
      <pre><code>{`dependencies: [
  .package(url: "https://github.com/M1tsumi/Caelum", from: "0.1.0")
]`}</code></pre>
      <h2>Minimal bot (Objective-C)</h2>
      <pre><code>{`@import Caelum;

int main(int argc, char * argv[]) {
  @autoreleasepool {
    CLClient *client = [[CLClient alloc] initWithToken:@"YOUR_TOKEN"];
    [client connectWithCompletion:^(NSError *error) {
      if (error) NSLog(@"Error: %@", error);
    }];
  }
}`}</code></pre>
    </article>
  );
}
