import { useEffect, useRef, useState } from "preact/hooks";
import { MentorshipCard } from "@/components/MentorshipCard.tsx";

export interface MarkdownHeading {
  level: number;
  text: string;
}

export interface TableOfContentsProps {
  headings: MarkdownHeading[];
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function setActiveLink(
  container: HTMLElement,
  marker: HTMLElement,
  id: string,
) {
  container.querySelectorAll("a").forEach((link) =>
    link.classList.remove("active")
  );
  const tocLink = container.querySelector(
    `a[href="#${id}"]`,
  ) as HTMLElement;

  if (tocLink === null) return;

  tocLink.classList.add("active");

  const rect = tocLink.getBoundingClientRect();
  const markerRect = marker.getBoundingClientRect();

  const top = tocLink.offsetTop + (rect.height / 2) -
    (markerRect.height / 2);
  marker.style.cssText = `transform: translate3d(0, ${top}px, 0); opacity: 1`;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const refMarker = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const processedHeadings = headings.map((heading) => ({
    ...heading,
    id: generateId(heading.text),
    html: heading.text,
  }));

  useEffect(() => {
    if (!ref.current || headings.length === 0) return;
    const container = ref.current;

    const headingElements = processedHeadings.map((h) => ({
      id: h.id,
      element: document.getElementById(h.id),
    })).filter((h) => h.element !== null);

    const activeList = new Array(headingElements.length).fill(false);
    const visibleList = new Array(headingElements.length).fill(false);

    const marker = refMarker.current!;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = headingElements.findIndex((h) =>
          h.id === entry.target.id
        );
        if (index !== -1) {
          const active = entry.isIntersecting ||
            entry.boundingClientRect.top < 0;
          activeList[index] = active;
          visibleList[index] = entry.isIntersecting;
        }
      });

      container.querySelectorAll("a").forEach((link) =>
        link.classList.remove("active")
      );

      let activeIdx = visibleList.indexOf(true);
      if (activeIdx < 0) {
        activeIdx = activeList.lastIndexOf(true);
      }

      if (activeIdx > -1) {
        const id = headingElements[activeIdx].id;
        setActiveLink(container, marker, id);
      } else {
        marker.style.cssText = `transform: translate3d(0, 0, 0); opacity: 0`;
      }
    }, {
      rootMargin: "-80px 0px -80% 0px",
    });

    headingElements.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div
      ref={ref}
      class="hidden lg:block relative xl:order-2 w-56 xl:max-w-xs xl:top-14 shrink-0"
    >
      {processedHeadings.length > 0 && (
        <>
          <div class="xl:hidden mx-4 md:mx-0 mt-4 md:mt-0">
            <button
              id="toc-outline-btn"
              onClick={() => setIsOpen((v) => !v)}
              class="bg-gray-100 py-2 px-4 rounded border border-gray-300 flex items-center hover:border-lime-600 transition-colors text-sm"
            >
              Conteúdos
              <svg
                class={`w-4 h-4 inline-block ml-2 -rotate-90 [&.active]:rotate-0 ${
                  isOpen ? "active" : ""
                }`}
              >
                <use href="/icons.svg#arrow-down" />
              </svg>
            </button>
            {isOpen && (
              <div class="mt-2 pl-4 border-l border-gray-250 text-[13px] leading-7">
                <nav aria-labelledby="toc-outline-btn">
                  <ul>
                    {processedHeadings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          class="block truncate text-gray-600"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
          <div class="hidden xl:block xl:sticky xl:top-40">
            <div class="relative">
              <div
                ref={refMarker}
                class="marker w-[2px] bg-lime-400 h-5 absolute top-0 opacity-0 transition-all"
              />
              <div class="pl-4 border-l border-gray-250 text-[13px] leading-7">
                <div role="heading" aria-level={2} class="font-semibold">
                  Conteúdos
                </div>
                <nav aria-labelledby="doc-outline-aria-label">
                  <span id="doc-outline-aria-label" class="sr-only">
                    Índice da página atual
                  </span>
                  <ul>
                    {processedHeadings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          class="block truncate transition-colors text-gray-600 [&.active]:text-lime-600"
                          onClick={() => {
                            if (ref.current && refMarker.current) {
                              setActiveLink(
                                ref.current,
                                refMarker.current,
                                heading.id,
                              );
                            }
                          }}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
