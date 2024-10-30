// cache.ts
import { kv } from "@/utils/db.ts";
import { Post } from "@/utils/content/posts.ts";
import { renderMarkdown } from "@/utils/content/markdow.ts";

interface CachedContent {
  html: string;
  headings: Array<{level: number; text: string}>;
  lastModified: number;
}

interface CachedPost extends Post {
  cachedContent?: CachedContent;
}

const CACHE_PREFIX = "content_cache";
const CACHE_VERSION = "v1";
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function getCachedContent(post: Post): Promise<CachedContent> {
  const cacheKey = [CACHE_PREFIX, CACHE_VERSION, post.moduleSlug, post.slug];
  
  // Try to get from cache first
  const cached = await kv.get<CachedContent>(cacheKey);
  
  if (cached.value) {
    // Check if cache is still valid
    const now = Date.now();
    if (now - cached.value.lastModified < CACHE_TTL) {
      return cached.value;
    }
  }

  // Cache miss or expired, generate new content
  const { html, headings } = await renderMarkdown(post.content);
  const newCache: CachedContent = {
    html,
    headings,
    lastModified: Date.now(),
  };

  // Store in cache
  await kv.set(cacheKey, newCache);
  
  return newCache;
}

// Function to preload all content into cache
export async function warmContentCache(posts: Post[]) {
  console.log("Warming content cache...");
  
  const operations = posts.map(async (post) => {
    try {
      await getCachedContent(post);
      console.log(`Cached ${post.moduleSlug}/${post.slug}`);
    } catch (error) {
      console.error(`Failed to cache ${post.moduleSlug}/${post.slug}:`, error);
    }
  });

  await Promise.all(operations);
  console.log("Content cache warming complete");
}

// Function to invalidate cache for a specific post
export async function invalidateCache(moduleSlug: string, postSlug: string) {
  const cacheKey = [CACHE_PREFIX, CACHE_VERSION, moduleSlug, postSlug];
  await kv.delete(cacheKey);
}

// Function to invalidate entire cache
export async function invalidateAllCache() {
  const prefix = [CACHE_PREFIX, CACHE_VERSION];
  const entries = kv.list({ prefix });
  
  for await (const entry of entries) {
    await kv.delete(entry.key);
  }
}