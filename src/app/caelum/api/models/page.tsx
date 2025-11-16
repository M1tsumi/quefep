import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Models</h1>
      <p>
        Caelum exposes strongly-typed Objective-C models for the main Discord resources: users,
        guilds, channels, members, roles, and messages. These are used across both the Gateway and
        REST layers.
      </p>

      <h2>Common entities</h2>
      <ul>
        <li><code>CLUser</code>, representing a Discord user or bot identity.</li>
        <li><code>CLGuild</code>, the container for channels, roles, and members.</li>
        <li><code>CLChannel</code>, which models text, voice, stage, and thread channels.</li>
        <li><code>CLMessage</code>, including content, embeds, attachments, and metadata.</li>
        <li><code>CLRole</code>, the permission surface within a guild.</li>
      </ul>

      <h2>Inspecting models from events</h2>
      <CodeBlock
        language="objective-c"
        code={`[client onMessageCreate:^(CLMessageCreateEvent *event) {
    CLMessage *message = event.message;
    CLUser *author = message.author;

    NSLog(@"[%@] %@: %@",
          message.channelID,
          author.username,
          message.content);
}];`}
      />

      <h2>Resolving guild and member data</h2>
      <p>
        Gateway events often reference IDs. Use REST helpers to fetch the full objects when you
        need more details.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLSnowflake guildID = ...;
CLSnowflake userID = ...;

[client.rest fetchGuildWithID:guildID
                    completion:^(CLGuild * _Nullable guild, NSError * _Nullable error) {
    if (guild == nil) { return; }

    NSLog(@"Guild name: %@ (members: %ld)", guild.name, (long)guild.approximateMemberCount);
}];

[client.rest fetchMemberWithID:userID
                       inGuild:guildID
                     completion:^(CLGuildMember * _Nullable member, NSError * _Nullable error) {
    if (member == nil) { return; }

    NSLog(@"Member display name: %@", member.displayName);
}];`}
      />

      <h2>IDs and snowflakes</h2>
      <p>
        Most identifiers are represented by <code>CLSnowflake</code>, a lightweight wrapper around
        Discord&apos;s snowflake format. You can convert to and from strings when storing IDs.
      </p>
      <CodeBlock
        language="objective-c"
        code={`CLSnowflake channelID = [CLSnowflake snowflakeWithString:@"123456789012345678"];
NSString *raw = channelID.stringValue;`}
      />
    </article>
  );
}
