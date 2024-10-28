import { ModuleInfo, MODULES, type ModuleStatus } from "@/utils/constants.ts";

function ModuleStatusIcon({ status }: { status: ModuleStatus }) {
  if (status === "completo") {
    return (
      <svg
        class="text-fresh"
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 8.40909L5.75 12.5L14 3.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    );
  }

  if (status === "em_andamento") {
    return (
      <svg
        class="text-amber-500"
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          stroke-width="2"
        />
        <path
          d="M8 4v4"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      class="text-gray-400"
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        stroke-width="2"
        stroke-dasharray="4 4"
      />
    </svg>
  );
}

function getStatusClasses(status: ModuleStatus) {
  switch (status) {
    case "completo":
      return "bg-fresh/15 text-fresh";
    case "em_andamento":
      return "bg-amber-100/50 text-amber-600";
    default:
      return "bg-gray-100/50 text-gray-400";
  }
}

function ModuleItem({ module }: { module: ModuleInfo }) {
  const content = (
    <div class="flex gap-3 items-center">
      <span
        class={`w-6 h-6 inline-flex items-center justify-center rounded-full flex-shrink-0 ${
          getStatusClasses(module.status)
        }`}
      >
        <ModuleStatusIcon status={module.status} />
      </span>
      <span class={module.status === "em_breve" ? "text-gray-400" : ""}>
        {module.name}
        <span class="text-sm ml-2 text-gray-300">
          {module.statusText}
        </span>
      </span>
    </div>
  );

  return (
    <li class="mb-3.5 text-lg text-default">
      {module.status === "completo"
        ? (
          <a
            href={`/${module.slug}`}
            class="hover:text-gray-600 transition-colors"
          >
            {content}
          </a>
        )
        : content}
    </li>
  );
}

export function ModuleList() {
  return (
    <ul class="w-full border-t border-gray-200/60 mt-8 pt-8">
      {MODULES.map((module) => (
        <ModuleItem
          key={module.slug}
          module={module}
        />
      ))}
    </ul>
  );
}
