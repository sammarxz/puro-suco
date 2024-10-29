import type { State } from "@/plugins/session.ts";
import type { User } from "@/utils/db.ts";

export function isSignedInUser(user: State["sessionUser"]): user is User {
  return user !== undefined && 'login' in user;
}