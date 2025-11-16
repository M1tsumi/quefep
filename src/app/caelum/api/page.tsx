export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>Navigate the modules below for detailed class- and member-level documentation.</p>
      <ul>
        <li><a href="/caelum/api/client">Client</a></li>
        <li><a href="/caelum/api/rest">REST</a></li>
        <li><a href="/caelum/api/gateway">Gateway</a></li>
        <li><a href="/caelum/api/models">Models</a></li>
        <li><a href="/caelum/api/errors">Errors</a></li>
        <li><a href="/caelum/api/utils">Utils</a></li>
      </ul>
    </article>
  );
}
