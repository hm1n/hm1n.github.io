import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import type { PostNavigationItem } from 'components/post/PostNavigation';

type UsePostNavigationParams = {
  html: string;
  contentRef: RefObject<HTMLElement | null>;
  postNavigationAreaRef?: RefObject<HTMLElement | null>;
  stickyTopCssVarName?: string;
  defaultStickyTopPx?: number;
};

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const usePostNavigation = ({
  html,
  contentRef,
  postNavigationAreaRef,
  stickyTopCssVarName = '--post-nav-sticky-top',
  defaultStickyTopPx = 154,
}: UsePostNavigationParams) => {
  const [postNavigationItems, setPostNavigationItems] = useState<PostNavigationItem[]>([]);
  const [activePostNavigationId, setActivePostNavigationId] = useState<string | null>(null);
  const programmaticTargetIdRef = useRef<string | null>(null);
  const releaseTimeoutIdRef = useRef<number | null>(null);
  const updateActiveFromScrollRef = useRef<(() => void) | null>(null);

  const clearReleaseTimeout = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (releaseTimeoutIdRef.current === null) return;
    window.clearTimeout(releaseTimeoutIdRef.current);
    releaseTimeoutIdRef.current = null;
  }, []);

  const scheduleProgrammaticRelease = useCallback(
    (delayMs = 200) => {
      if (typeof window === 'undefined') return;
      clearReleaseTimeout();
      releaseTimeoutIdRef.current = window.setTimeout(() => {
        releaseTimeoutIdRef.current = null;
        programmaticTargetIdRef.current = null;
        updateActiveFromScrollRef.current?.();
      }, delayMs);
    },
    [clearReleaseTimeout],
  );

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const headingElements = Array.from(
      root.querySelectorAll('h1, h2, h3, h4, h5'),
    ) as HTMLElement[];

    const seen = new Map<string, number>();

    const items: PostNavigationItem[] = headingElements
      .map(el => {
        const rawText = (el.textContent || '').trim();
        if (!rawText) return null;

        const depth = Number(el.tagName.replace('H', '')) || 1;
        const baseId = el.id?.trim() ? el.id.trim() : slugify(rawText) || 'section';
        const count = (seen.get(baseId) || 0) + 1;
        seen.set(baseId, count);
        const uniqueId = count > 1 ? `${baseId}-${count}` : baseId;

        if (!el.id) el.id = uniqueId;

        return { id: uniqueId, text: rawText, depth };
      })
      .filter((x): x is PostNavigationItem => x !== null);

    setPostNavigationItems(items);
    setActivePostNavigationId(items[0]?.id ?? null);
  }, [contentRef, html]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (postNavigationItems.length === 0) return;

    const sortedHeadings = postNavigationItems
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
      .sort((a, b) => a.offsetTop - b.offsetTop);

    if (sortedHeadings.length === 0) return;

    const stickyTopPx = (() => {
      try {
        const target = postNavigationAreaRef?.current;
        const raw = target
          ? getComputedStyle(target).getPropertyValue(stickyTopCssVarName).trim()
          : '';
        const parsed = Number.parseInt(raw || String(defaultStickyTopPx), 10);
        return Number.isFinite(parsed) ? parsed : defaultStickyTopPx;
      } catch {
        return defaultStickyTopPx;
      }
    })();

    const getCurrentActiveId = () => {
      const y = window.scrollY + stickyTopPx + 1;
      let current = sortedHeadings[0].id;
      for (const heading of sortedHeadings) {
        if (heading.offsetTop <= y) current = heading.id;
        else break;
      }
      return current;
    };

    const update = () => {
      const nextId = getCurrentActiveId();
      setActivePostNavigationId(prev => (prev === nextId ? prev : nextId));
    };

    updateActiveFromScrollRef.current = update;

    update();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;

        const lockedId = programmaticTargetIdRef.current;
        if (lockedId) {
          setActivePostNavigationId(prev => (prev === lockedId ? prev : lockedId));
          scheduleProgrammaticRelease(200);
          return;
        }

        update();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      updateActiveFromScrollRef.current = null;
      clearReleaseTimeout();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [
    clearReleaseTimeout,
    defaultStickyTopPx,
    postNavigationAreaRef,
    postNavigationItems,
    scheduleProgrammaticRelease,
    stickyTopCssVarName,
  ]);

  const handlePostNavigationSelect = useCallback(
    (id: string) => {
      programmaticTargetIdRef.current = id;
      setActivePostNavigationId(id);

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      scheduleProgrammaticRelease(250);
    },
    [scheduleProgrammaticRelease],
  );

  return {
    postNavigationItems,
    activePostNavigationId,
    setActivePostNavigationId,
    handlePostNavigationSelect,
  };
};

export default usePostNavigation;
