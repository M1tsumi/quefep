export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>FAQ</h1>
      <ul>
        <li>How do I handle intents? — Configure them on the Client and Gateway.</li>
        <li>Why am I rate limited? — Follow REST guidelines and bucket strategy.</li>
      </ul>
    </article>
  );
}
