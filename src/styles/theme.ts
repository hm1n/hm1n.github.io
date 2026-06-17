export const palettes = {
  light: {
    primary: {
      default: '#5AB95D',
      light: '#B1E3B3',
    },
    gray: {
      500: '#1D1D1D',
      400: '#383838',
      300: '#686868',
      200: '#9A9A9A',
      100: '#C9C9C9',
    },
    background: {
      background: '#FAFAFA',
      elevated: '#f1f1f1',
    },
  },
  dark: {
    primary: {
      default: '#5AB95D',
      light: '#487248',
    },
    gray: {
      500: '#FAFAFA',
      400: '#C9C9C9',
      300: '#9A9A9A',
      200: '#686868',
      100: '#383838',
    },
    background: {
      background: '#1D1D1D',
      elevated: '#2D2D2D',
    },
  },
} as const;

export const typography = {
  fontFamily: {
    base: `'Pretendard', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`,
    code: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Monaco, monospace`,
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '28.8px',
    fontWeight: 400,
    letterSpacing: '0',
  },
  heading: {
    fontSize: '24px',
    lineHeight: '38.4px',
    fontWeight: 700,
    letterSpacing: '0',
  },
} as const;

export const breakpoints = {
  /**
   * 반응형은 2단계만 지원합니다.
   * - mobile: 720px 미만
   * - desktop: 720px 이상
   */
  mobile: 720,
} as const;

/**
 * Mode-agnostic theme mapping using CSS variables.
 * - GlobalStyle에서 라이트/다크에 따라 CSS 변수를 바꾸고,
 * - 컴포넌트는 theme.colors.* 를 통해 동일한 키를 사용합니다.
 */
export const theme = {
  colors: {
    primary: 'var(--color-primary)',
    primarySoft: 'var(--color-primary-soft)',
    background: 'var(--color-bg)',
    backgroundBlur: 'var(--color-bg-blur)',
    backgroundElevated: 'var(--color-background-elevated)',
    text: 'var(--color-text)',
    textSecondary: 'var(--color-text-secondary)',
    border: 'var(--color-border)',
    gray: {
      500: 'var(--color-gray-500)',
      400: 'var(--color-gray-400)',
      300: 'var(--color-gray-300)',
      200: 'var(--color-gray-200)',
      100: 'var(--color-gray-100)',
    },
  },
  typography,
} as const;
