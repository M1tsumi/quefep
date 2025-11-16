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
  const badgeUrl = `https://img.shields.io/badge/Total%20Contributions-${encodeURIComponent(total.toString())}-78B159?style=for-the-badge&logo=github&logoColor=white`;

  return (
    <div className="fixed top-4 right-4 z-50 drop-shadow-lg">
      <img src={badgeUrl} alt={`Total contributions for ${username}: ${total}`} className="h-8 w-auto" />
    </div>
  );
}
