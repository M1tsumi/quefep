import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Client</h1>
      <p>
        The <code>CLClient</code> is the main entrypoint into Caelum. It wires together the REST
        and Gateway layers, manages connection lifecycle, and dispatches strongly-typed events to
        your Objective-C code.
      </p>

      <h2>Core types</h2>
      <ul>
        <li><code>CLClient</code>, the primary Discord client.</li>
        <li><code>CLClientConfiguration</code> for token, intents, presence, and shard configuration.</li>
        <li><code>CLIntents</code>, a bitmask describing which events you want to receive.</li>
      </ul>

      <h2>Basic setup</h2>
      <p>
        Construct a configuration, then create a <code>CLClient</code> and connect. You typically do
        this during app launch, e.g. from your app delegate.
      </p>
      <CodeBlock
        language="objective-c"
        code={`#import <Caelum/Caelum.h>

CLClientConfiguration *config = [[CLClientConfiguration alloc] initWithToken:@"Bot YOUR_TOKEN_HERE"];
config.intents = CLIntentsGuilds | CLIntentsGuildMessages | CLIntentsMessageContent;

CLClient *client = [[CLClient alloc] initWithConfiguration:config];

// Optionally configure presence
client.presence = [CLPresence presenceWithStatus:CLPresenceStatusOnline
                                         activity:[CLActivity activityWithName:@"Building bots" type:CLActivityTypePlaying]];

[client connectWithCompletion:^(NSError * _Nullable error) {
    if (error != nil) {
        NSLog(@"Failed to connect: %@", error);
        return;
    }

    NSLog(@"Caelum client connected.");
}];`}
      />

      <h2>Registering event handlers</h2>
      <p>
        Use the client&apos;s event APIs to observe gateway events like message create, ready, and
        guild updates. The exact names may differ slightly depending on the version, but the
        pattern stays the same: register a block and work with strongly-typed model objects.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client onReady:^(CLReadyEvent *event) {
    NSLog(@"Logged in as %@#%@", event.user.username, event.user.discriminator);
}];

[client onMessageCreate:^(CLMessageCreateEvent *event) {
    CLMessage *message = event.message;

    if ([message.content isEqualToString:@"!ping"]) {
        [client.rest createMessageInChannel:message.channelID
                                    content:@"Pong!"
                                    completion:^(CLMessage * _Nullable created, NSError * _Nullable error) {
            if (error != nil) {
                NSLog(@"Failed to send pong: %@", error);
            }
        }];
    }
}];`}
      />

      <h2>Shutting down</h2>
      <p>
        Always perform an explicit shutdown when your application is terminating or when you no
        longer need the client. This will close the gateway, flush REST requests, and release
        internal resources.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client disconnectWithCode:1000 reason:@"App shutting down" completion:^(NSError * _Nullable error) {
    if (error != nil) {
        NSLog(@"Error during disconnect: %@", error);
    }
}];`}
      />

      <h2>Threading and run loop notes</h2>
      <p>
        Caelum is designed to be used from typical UIKit / AppKit apps. Event callbacks are
        generally invoked on a background queue, so switch back to the main queue before touching
        UI, just as you would with any networking library.
      </p>
      <CodeBlock
        language="objective-c"
        code={`[client onMessageCreate:^(CLMessageCreateEvent *event) {
    dispatch_async(dispatch_get_main_queue(), ^{
        // Update UI or notify your controllers here.
    });
}];`}
      />
    </article>
  );
}
