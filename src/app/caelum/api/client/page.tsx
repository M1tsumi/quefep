export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Client</h1>
      <p>Primary client coordinating REST and Gateway for Objective-C apps.</p>
      <h2>Key classes</h2>
      <ul>
        <li><code>CLClient</code></li>
        <li><code>CLClientConfiguration</code></li>
        <li><code>CLIntents</code></li>
      </ul>
      <h2>Usage</h2>
      <pre><code>{`CLClient *client = [[CLClient alloc] initWithToken:@"TOKEN"];
[client connectWithCompletion:nil];`}</code></pre>
    </article>
  );
}
