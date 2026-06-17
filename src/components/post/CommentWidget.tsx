import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react';

const src = 'https://utteranc.es/client.js';
const repo = 'hm1n/hm1n.github.io'; // 자신 계정의 레포지토리로 설정

type UtterancesAttributesType = {
  src: string;
  repo: string;
  'issue-term': string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
};

function resolveUtterancesTheme(): 'github-light' | 'github-dark' {
  if (typeof document !== 'undefined') {
    const explicit = document.documentElement.dataset.theme;
    if (explicit === 'dark') return 'github-dark';
    if (explicit === 'light') return 'github-light';
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'github-dark'
      : 'github-light';
  }

  return 'github-light';
}

function tryPostMessageSetTheme(
  container: HTMLElement,
  theme: 'github-light' | 'github-dark'
): boolean {
  const iframe = container.querySelector<HTMLIFrameElement>('iframe.utterances-frame');
  const targetWindow = iframe?.contentWindow;
  if (!targetWindow) return false;

  // Utterances는 iframe에 postMessage로 테마를 변경할 수 있습니다.
  // 실패/미지원 환경에서는 false를 반환해 상위에서 재시도할 수 있게 합니다.
  targetWindow.postMessage({ type: 'set-theme', theme }, 'https://utteranc.es');
  return true;
}

const CommentWidget: FunctionComponent = function () {
  const elementRef = useRef<HTMLDivElement>(null);
  const retryTimerRef = useRef<number | null>(null);

  const mountUtterances = useCallback((theme: UtterancesAttributesType['theme']) => {
    const container = elementRef.current;
    if (!container) return;

    // 이미 mount되어 있으면(iframe 존재) 테마만 빠르게 변경합니다.
    if (tryPostMessageSetTheme(container, theme as 'github-light' | 'github-dark')) return;

    // utterances는 iframe을 내부적으로 생성하므로, 테마 변경 시 기존 내용을 비우고 다시 삽입합니다.
    // (주의) 리로드는 느리므로, iframe이 없을 때(최초 mount 등)에만 수행합니다.
    container.innerHTML = '';

    const utterances: HTMLScriptElement = document.createElement('script');

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme,
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    container.appendChild(utterances);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!elementRef.current) return;

    const clearRetryTimer = () => {
      if (retryTimerRef.current == null) return;
      window.clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    };

    const scheduleRetry = (theme: 'github-light' | 'github-dark', attempt = 0) => {
      clearRetryTimer();
      if (attempt >= 5) return;

      // iframe이 아직 생성되지 않은 타이밍(최초 로딩 직후)에는 약간만 재시도합니다.
      retryTimerRef.current = window.setTimeout(() => {
        const container = elementRef.current;
        if (!container) return;
        const applied = tryPostMessageSetTheme(container, theme);
        if (!applied) scheduleRetry(theme, attempt + 1);
      }, 200 + attempt * 150);
    };

    let currentTheme = resolveUtterancesTheme();
    mountUtterances(currentTheme);

    const observer = new MutationObserver(() => {
      const nextTheme = resolveUtterancesTheme();
      if (nextTheme === currentTheme) return;
      currentTheme = nextTheme;

      const container = elementRef.current;
      if (!container) return;

      // 1) 가능한 경우 iframe에 postMessage로 즉시 변경(딜레이 최소화)
      const applied = tryPostMessageSetTheme(container, currentTheme);
      if (applied) return;

      // 2) iframe이 아직 없는 경우: 재시도(대부분 최초 로딩 시점)
      scheduleRetry(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      clearRetryTimer();
      observer.disconnect();
    };
  }, [mountUtterances]);

  return <div ref={elementRef} />;
};

export default CommentWidget;
