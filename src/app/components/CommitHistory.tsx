import Link from "next/link";

interface GithubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author?: {
      name?: string;
      date?: string;
    };
  };
}

async function fetchCommits(repo: string, limit = 5): Promise<GithubCommit[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=${limit}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!res.ok) return [];

    const data = (await res.json()) as GithubCommit[];
    return data;
  } catch {
    return [];
  }
}

function formatDate(dateString?: string): string {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function splitCommitMessage(message?: string): { title: string; summary: string } {
  if (!message) {
    return { title: "Update", summary: "" };
  }

  const lines = message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const [title, ...rest] = lines;
  return {
    title: title || "Update",
    summary: rest.join(" ").trim(),
  };
}

function RepoCommits({
  name,
  repo,
  commits,
}: {
  name: string;
  repo: string;
  commits: GithubCommit[];
}) {
  return (
    <article className="rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-black/40">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <Link
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs px-3 py-1 rounded-full border border-[#78B15980] bg-[#78B159] text-black hover:bg-[#4A7C59] hover:border-[#4A7C59] transition-colors"
        >
          View Repo
        </Link>
      </div>
      {commits.length === 0 ? (
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          Could not load recent commits.
        </p>
      ) : (
        <ul className="mt-3 space-y-2 text-xs text-black/70 dark:text-white/70">
          {commits.map((commit) => {
            const { title, summary } = splitCommitMessage(commit.commit.message);
            const author = commit.commit.author?.name ?? "Unknown author";

            return (
              <li key={commit.sha} className="flex flex-col gap-1 rounded-md bg-black/5 dark:bg-white/5 p-2">
                <Link
                  href={commit.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-black dark:text-white hover:text-[#4A7C59] dark:hover:text-[#78B159]"
                >
                  {title}
                </Link>
                {summary && (
                  <p className="text-[11px] text-black/60 dark:text-white/60">
                    {summary}
                  </p>
                )}
                <span className="text-[10px] text-black/50 dark:text-white/50">
                  {author} • {formatDate(commit.commit.author?.date)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

export default async function CommitHistory() {
  const [swiftdiscCommits, caelumCommits] = await Promise.all([
    fetchCommits("M1tsumi/SwiftDisc"),
    fetchCommits("M1tsumi/Caelum"),
  ]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium text-[#78B159] text-center">
        Recent GitHub Activity
      </h2>
      <p className="text-xs text-black/60 dark:text-white/60 text-center max-w-md mx-auto">
        A quick glimpse at the latest commits across SwiftDisc and Caelum.
      </p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <RepoCommits
          name="SwiftDisc"
          repo="M1tsumi/SwiftDisc"
          commits={swiftdiscCommits}
        />
        <RepoCommits
          name="Caelum"
          repo="M1tsumi/Caelum"
          commits={caelumCommits}
        />
      </div>
    </section>
  );
}
