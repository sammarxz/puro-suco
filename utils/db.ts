import { getPosts, Post } from "../plugins/content/utils/posts.ts";

const DENO_KV_PATH_KEY = "DENO_KV_PATH";

let path = undefined;

if (
  (await Deno.permissions.query({ name: "env", variable: DENO_KV_PATH_KEY }))
    .state === "granted"
) {
  path = Deno.env.get(DENO_KV_PATH_KEY);
}

export const kv = await Deno.openKv(path);

// Module
interface UserProgress {
  userId: string;
  moduleSlug: string;
  postSlug: string;
  completedAt: Date;
}

interface ModuleProgress {
  totalPosts: number;
  completedPosts: number;
  lastCompletedAt?: Date;
}

// Função para marcar um post como completo
export async function markPostAsComplete(
  userId: string,
  moduleSlug: string,
  postSlug: string
) {
  const progressKey = ["user_progress", userId, moduleSlug, postSlug];
  const progress: UserProgress = {
    userId,
    moduleSlug,
    postSlug,
    completedAt: new Date(),
  };

  const atomicOp = kv.atomic()
    .set(progressKey, progress);

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to mark post as complete");
}

// Função para desmarcar um post como completo
export async function markPostAsIncomplete(
  userId: string,
  moduleSlug: string,
  postSlug: string
) {
  const progressKey = ["user_progress", userId, moduleSlug, postSlug];
  
  const res = await kv.delete(progressKey);
  return res;
}

// Verificar se um post está completo
export async function isPostComplete(
  userId: string,
  moduleSlug: string,
  postSlug: string
): Promise<boolean> {
  const res = await kv.get<UserProgress>([
    "user_progress",
    userId,
    moduleSlug,
    postSlug,
  ]);
  return res.value !== null;
}

// Obter progresso de um módulo específico
export async function getModuleProgress(
  userId: string,
  moduleSlug: string
): Promise<ModuleProgress> {
  const entries = kv.list<UserProgress>({
    prefix: ["user_progress", userId, moduleSlug],
  });
  
  const completedPosts: UserProgress[] = [];
  for await (const entry of entries) {
    completedPosts.push(entry.value);
  }

  // Obter total de posts do módulo
  const moduleEntries = await Array.fromAsync(
    kv.list<Post>({ prefix: ["content", moduleSlug] })
  );
  
  return {
    totalPosts: moduleEntries.length,
    completedPosts: completedPosts.length,
    lastCompletedAt: completedPosts.length > 0
      ? new Date(Math.max(...completedPosts.map(p => p.completedAt.getTime())))
      : undefined
  };
}

// Obter progresso de todos os módulos
export async function getAllModulesProgress(
  userId: string
): Promise<Record<string, ModuleProgress>> {
  const modules = await getPosts();
  const progress: Record<string, ModuleProgress> = {};

  for (const module of modules) {
    progress[module.slug] = await getModuleProgress(userId, module.slug);
  }

  return progress;
}

// User
export interface User {
  // AKA username
  login: string;
  sessionId: string;
  isSubscribed: boolean;
  stripeCustomerId?: string;
}

export async function createUser(user: User) {
  const usersKey = ["users", user.login];
  const usersBySessionKey = ["users_by_session", user.sessionId];

  const atomicOp = kv.atomic()
    .check({ key: usersKey, versionstamp: null })
    .check({ key: usersBySessionKey, versionstamp: null })
    .set(usersKey, user)
    .set(usersBySessionKey, user);

  if (user.stripeCustomerId !== undefined) {
    const usersByStripeCustomerKey = [
      "users_by_stripe_customer",
      user.stripeCustomerId,
    ];
    atomicOp
      .check({ key: usersByStripeCustomerKey, versionstamp: null })
      .set(usersByStripeCustomerKey, user);
  }

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to create user");
}

export async function updateUser(user: User) {
  const usersKey = ["users", user.login];
  const usersBySessionKey = ["users_by_session", user.sessionId];

  const atomicOp = kv.atomic()
    .set(usersKey, user)
    .set(usersBySessionKey, user);

  if (user.stripeCustomerId !== undefined) {
    const usersByStripeCustomerKey = [
      "users_by_stripe_customer",
      user.stripeCustomerId,
    ];
    atomicOp
      .set(usersByStripeCustomerKey, user);
  }

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to update user");
}

export async function updateUserSession(user: User, sessionId: string) {
  const userKey = ["users", user.login];
  const oldUserBySessionKey = ["users_by_session", user.sessionId];
  const newUserBySessionKey = ["users_by_session", sessionId];
  const newUser: User = { ...user, sessionId };

  const atomicOp = kv.atomic()
    .set(userKey, newUser)
    .delete(oldUserBySessionKey)
    .check({ key: newUserBySessionKey, versionstamp: null })
    .set(newUserBySessionKey, newUser);

  if (user.stripeCustomerId !== undefined) {
    const usersByStripeCustomerKey = [
      "users_by_stripe_customer",
      user.stripeCustomerId,
    ];
    atomicOp
      .set(usersByStripeCustomerKey, user);
  }

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to update user session");
}

export async function getUser(login: string) {
  const res = await kv.get<User>(["users", login]);
  return res.value;
}

export async function getUserBySession(sessionId: string) {
  const key = ["users_by_session", sessionId];
  const eventualRes = await kv.get<User>(key, {
    consistency: "eventual",
  });
  if (eventualRes.value !== null) return eventualRes.value;
  const res = await kv.get<User>(key);
  return res.value;
}

export function listUsers(options?: Deno.KvListOptions) {
  return kv.list<User>({ prefix: ["users"] }, options);
}