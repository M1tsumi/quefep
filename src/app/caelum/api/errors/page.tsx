import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Errors</h1>
      <p>
        Caelum normalizes Discord API failures into a small set of error types so you can handle
        them consistently from Objective-C.
      </p>

      <h2>REST errors</h2>
      <p>
        REST operations surface <code>NSError</code> instances with a Caelum-specific domain and
        well-known codes for common situations like bad requests, missing permissions, and rate
        limiting.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client.rest createMessageInChannel:channelID
                            content:@"secret admin-only command"
                            completion:^(CLMessage * _Nullable message, NSError * _Nullable error) {
    if (error != nil) {
        if (error.code == CLRestErrorMissingPermissions) {
            NSLog(@"The bot is missing permissions in this channel.");
        } else if (error.code == CLRestErrorUnknownChannel) {
            NSLog(@"Channel no longer exists.");
        } else {
            NSLog(@"Unexpected REST error: %@", error);
        }
    }
}];`}
      />

      <h2>Gateway close codes</h2>
      <p>
        When the gateway connection closes, Caelum exposes the close code and whether the
        connection will be retried.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client.gateway onClose:^(CLGatewayCloseEvent *event) {
    NSLog(@"Gateway closed with code %ld (clean=%@)", (long)event.code, event.clean ? @"YES" : @"NO");

    if (event.code == 4004) {
        NSLog(@"Authentication failed. Check your bot token.");
    }
}];`}
      />

      <h2>Retry and backoff</h2>
      <p>
        Caelum handles transient network failures and rate limiting internally. If you build
        higher-level workflows, prefer idempotent operations and add your own backoff when
        repeating entire workflows.
      </p>
    </article>
  );
}
