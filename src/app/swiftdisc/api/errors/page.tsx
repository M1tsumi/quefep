export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Errors</h1>
      <p>Error hierarchy, Discord API error mapping, and recovery strategies.</p>
      <ul>
        <li>Typed errors</li>
        <li>Retry policies</li>
        <li>Backoff</li>
      </ul>
    </article>
  );
}
