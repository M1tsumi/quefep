import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>REST</h1>
      <p>
        Caelum&apos;s REST layer wraps Discord&apos;s HTTP API with Objective-C friendly models, automatic
        serialization, and built-in rate limiting. It is exposed through <code>client.rest</code>.
      </p>

      <h2>Creating messages</h2>
      <p>
        The most common operation is sending messages. Use the convenience helpers on the REST
        client to send plain text, embeds, or both.
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
        Use <code>CLEmbed</code> to construct rich embedded content. Fields, colors, and authors
        are all created with small helper methods.
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
        Caelum tracks Discord&apos;s per-route rate limit buckets and transparently retries requests
        when necessary. You normally do not need to handle this yourself, but you can observe
        errors for logging or metrics.
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
