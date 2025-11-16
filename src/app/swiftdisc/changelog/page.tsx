export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Changelog</h1>
      <p>
        This log summarizes notable changes between SwiftDisc versions. For breaking changes, look
        for entries marked as <strong>Breaking</strong> and review the linked migration notes.
      </p>

      <h2>0.8.0</h2>
      <ul>
        <li>Refined async/await APIs on the client and REST layers.</li>
        <li>Improved gateway reconnection logic and logging.</li>
        <li>Expanded model coverage for newer Discord resources.</li>
      </ul>

      <h2>0.7.0</h2>
      <ul>
        <li>Stabilized core Client API and event stream.</li>
        <li>Initial support for message content intent where available.</li>
      </ul>

      <h2>0.1.0</h2>
      <ul>
        <li>Initial public preview of SwiftDisc.</li>
      </ul>
    </article>
  );
}
