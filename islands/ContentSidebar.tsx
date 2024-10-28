import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { Module } from "@/utils/content/posts.ts";

import {
  PROGRESS_UPDATE_EVENT,
  type ProgressUpdateDetail,
} from "@/utils/content/events.ts";

import { LessonItem } from "@/components/LessonItem.tsx";

interface ContentSidebarProps {
  currentModule?: string;
  currentSlug?: string;
  modules: Module[];
  completedLessons?: Record<string, boolean>;
}

export function ContentSidebar(
  { currentModule, currentSlug, modules, completedLessons = {} }:
    ContentSidebarProps,
) {
  const completionState = useSignal(completedLessons);
  const isUpdating = useSignal(false);

  useEffect(() => {
    if (!IS_BROWSER) return;

    function handleCompletedUpdate(event: CustomEvent<ProgressUpdateDetail>) {
      try {
        isUpdating.value = true;

        const { moduleSlug, postSlug, isComplete } = event.detail;
        completionState.value = {
          ...completionState.value,
          [`${moduleSlug}/${postSlug}`]: isComplete,
        };
      } finally {
        isUpdating.value = false;
      }
    }

    addEventListener(
      PROGRESS_UPDATE_EVENT,
      handleCompletedUpdate as EventListener,
    );

    return () => {
      removeEventListener(
        PROGRESS_UPDATE_EVENT,
        handleCompletedUpdate as EventListener,
      );
    };
  }, []);

  return (
    <>
      {modules.map((module) => (
        <div key={module.slug} class="space-y-2 mt-6">
          <span class="text-gray-900 font-semibold">
            {module.name}
          </span>

          <ul class="list-inside font-semibold nested">
            {module.posts.map((post) => (
              <LessonItem
                key={post.slug}
                post={post}
                moduleSlug={module.slug}
                isActive={currentModule === module.slug &&
                  currentSlug === post.slug}
                isCompleted={completionState
                  .value[`${module.slug}/${post.slug}`]}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
