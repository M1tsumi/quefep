import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>REST</h1>
      <p>
        Caelum&apos;s REST surface mirrors Discord API v10. Requests are automatically serialized from
        Foundation objects, bucketed for rate limiting, and exposed through <code>client.rest</code>
        so you can issue calls from anywhere in your app.
      </p>

      <h2>Creating messages</h2>
      <p>
        Use the send helpers to cover plain text, embeds, files, and follow-ups. Requests execute on
        Caelum-managed queues and call back on the queue you provide.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLSnowflake channelID = ...; // the channel you want to send to

[client.rest createMessageInChannel:channelID
                            content:@"Hello from Caelum!"
                            completion:^(CLMessage * _Nullable message, NSError * _Nullable error) {
    if (error != nil) {
        NSLog(@"Failed to send message: %@", error);
        return;
    }

    NSLog(@"Sent message with ID: %@", message.ID);
}];`}
      />

      <h2>Embeds</h2>
      <p>
        <code>CLEmbed</code> exposes builder-style helpers for rich content. Embed components map to
        Discord payloads, so anything you can do via HTTP can be expressed through Caelum.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLEmbed *embed = [CLEmbed embedWithTitle:@"Status"
                                           description:@"Everything is online."
                                                color:0x57F287];
embed.footer = [CLEmbedFooter footerWithText:@"Powered by Caelum" iconURL:nil];

[client.rest createMessageInChannel:channelID
                            content:nil
                              embed:embed
                          completion:^(CLMessage * _Nullable message, NSError * _Nullable error) {
    if (error != nil) {
        NSLog(@"Failed to send embed: %@", error);
    }
}];`}
      />

      <h2>Editing and deleting messages</h2>
      <CodeBlock
        language="objective-c"
        code={`[client.rest editMessageWithID:message.ID
                              inChannel:channelID
                                 content:@"Updated content"
                               completion:^(CLMessage * _Nullable updated, NSError * _Nullable error) {
    if (error != nil) {
        NSLog(@"Failed to edit message: %@", error);
    }
}];

[client.rest deleteMessageWithID:message.ID
                        inChannel:channelID
                        completion:^(NSError * _Nullable error) {
    if (error != nil) {
        NSLog(@"Failed to delete message: %@", error);
    }
}];`}
      />

      <h2>Rate limiting</h2>
      <p>
        Caelum tracks Discord&apos;s per-route buckets, global 429s, and retry-after headers. Transient
        failures are retried with jitter. Monitor errors if you want to emit metrics or alerting.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client.rest createMessageInChannel:channelID
                            content:@"Spamming?"
                            completion:^(CLMessage * _Nullable message, NSError * _Nullable error) {
    if (error.code == CLRestErrorRateLimited) {
        NSLog(@"Hit a rate limit; request will be retried automatically.");
    }
}];`}
      />
    </article>
  );
}
