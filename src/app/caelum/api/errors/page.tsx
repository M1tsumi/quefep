import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Errors</h1>
      <p>
        Caelum normalizes Discord REST and Gateway failures so you can branch on predictable
        Objective-C errors instead of parsing raw payloads.
      </p>

      <h2>REST errors</h2>
      <p>
        REST operations use a Caelum-specific <code>NSError</code> domain with typed codes for common
        cases such as missing permissions, missing channels, rate limits, and validation failures.
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
        <code>CLGatewayCloseEvent</code> provides the close code, clean bit, and whether Caelum will
        resume or start a fresh identify. Watch for authentication errors (4004) or invalid session
        loops so you can alert operators.
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
        Caelum automatically retries transient HTTP failures, applies jitter to global 429s, and
        reconnects the gateway after network drops. For multi-step workflows, add your own idempotent
        logic and backoff to avoid duplicating side effects.
      </p>
    </article>
  );
}
