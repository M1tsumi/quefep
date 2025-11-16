async function fetchRepoCommitCountForUser(repo: string, username: string): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=100`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      return 0;
    }

    const data = (await res.json()) as { login?: string; contributions?: number }[];
    const contributor = data.find((entry) => entry.login?.toLowerCase() === username.toLowerCase());
    return contributor?.contributions ?? 0;
  } catch {
    return 0;
  }
}

export default async function TotalCommitsBadge() {
  const username = "M1tsumi";
  const repos = ["M1tsumi/SwiftDisc", "M1tsumi/Caelum"];
  const counts = await Promise.all(repos.map((repo) => fetchRepoCommitCountForUser(repo, username)));
  const total = counts.reduce((acc, count) => acc + count, 0);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[#78B15980] bg-white/80 px-4 py-2 text-xs uppercase tracking-wide text-black/70 shadow-sm dark:border-[#78B15966] dark:bg-[#0e0e0e80] dark:text-white/80">
      <span className="text-[11px] font-medium text-[#4A7C59] dark:text-[#78B159]">Total Commits</span>
      <span className="text-lg font-semibold text-black dark:text-white">{total.toLocaleString()}</span>
    </div>
  );
}
