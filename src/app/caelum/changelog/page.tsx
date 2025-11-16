export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Changelog</h1>
      <p>
        This document lists notable changes to Caelum. When you upgrade, scan the entries between
        your current version and the one you are targeting.
      </p>

      <h2>0.1.0 &mdash; Initial preview</h2>
      <ul>
        <li>First public preview of Caelum.</li>
        <li>Gateway connection management with basic reconnection.</li>
        <li>Core REST support for messages, embeds, and guild/member fetches.</li>
        <li>Foundational Objective-C models for users, guilds, channels, and messages.</li>
      </ul>

      <h2>Unreleased</h2>
      <p>Planned improvements may include additional REST endpoints and richer testing utilities.</p>
    </article>
  );
}
