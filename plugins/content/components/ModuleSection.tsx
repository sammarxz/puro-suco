import { ModuleProgress } from "@/utils/db.ts";
import { ProgressBar } from "@/islands/ProgressBar.tsx";
import { Post } from "../utils/posts.ts";
import { PostCard } from "./PostCard.tsx";

interface ModuleSectionProps {
  name: string;
  slug: string;
  posts: Post[];
  progress?: ModuleProgress;
}

export function ModuleSection(
  { name, slug, posts, progress }: ModuleSectionProps,
) {
  const percentage = progress
    ? Math.round((progress.completedPosts / progress.totalPosts) * 100)
    : 0;

  return (
    <section class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">{name}</h2>
        {progress && (
          <div class="w-48">
            <ProgressBar
              completed={progress.completedPosts}
              total={progress.totalPosts}
              showTimeEstimate={false}
            />
          </div>
        )}
      </div>
      <div class="pl-4 divide-y">
        {posts.map((post) => (
          <PostCard
            {...post}
            isComplete={progress?.completedPosts > 0}
          />
        ))}
      </div>
    </section>
  );
}
