import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';
import { palettes, typography } from '../../styles/theme';

const defaultStyle = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

  :root {
    /* Typography */
    --font-family-base: ${typography.fontFamily.base};
    --font-size-paragraph: ${typography.paragraph.fontSize};
    --line-height-paragraph: ${typography.paragraph.lineHeight};

    /* Light mode (default) */
    --color-primary: ${palettes.light.primary.default};
    --color-primary-soft: ${palettes.light.primary.light};

    --color-bg: ${palettes.light.background.background};
    --color-bg-blur: rgba(250, 250, 250, 0.4);
    --color-text: ${palettes.light.gray[500]};
    --color-text-secondary: ${palettes.light.gray[300]};
    --color-border: ${palettes.light.gray[100]};

    --color-gray-500: ${palettes.light.gray[500]};
    --color-gray-400: ${palettes.light.gray[400]};
    --color-gray-300: ${palettes.light.gray[300]};
    --color-gray-200: ${palettes.light.gray[200]};
    --color-gray-100: ${palettes.light.gray[100]};

    color-scheme: light;
  }

  /* System dark mode (if user didn't explicitly force light) */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
      --color-primary: ${palettes.dark.primary.default};
      --color-primary-soft: ${palettes.dark.primary.light};

      --color-bg: ${palettes.dark.background.background};
      --color-bg-blur: rgba(29, 29, 29, 0.4);
      --color-text: ${palettes.dark.gray[500]};
      --color-text-secondary: ${palettes.dark.gray[300]};
      --color-border: ${palettes.dark.gray[100]};

      --color-gray-500: ${palettes.dark.gray[500]};
      --color-gray-400: ${palettes.dark.gray[400]};
      --color-gray-300: ${palettes.dark.gray[300]};
      --color-gray-200: ${palettes.dark.gray[200]};
      --color-gray-100: ${palettes.dark.gray[100]};

      color-scheme: dark;
    }
  }

  /* Explicit dark mode */
  :root[data-theme='dark'] {
    --color-primary: ${palettes.dark.primary.default};
    --color-primary-soft: ${palettes.dark.primary.light};

    --color-bg: ${palettes.dark.background.background};
    --color-bg-blur: rgba(29, 29, 29, 0.4);
    --color-text: ${palettes.dark.gray[500]};
    --color-text-secondary: ${palettes.dark.gray[300]};
    --color-border: ${palettes.dark.gray[100]};

    --color-gray-500: ${palettes.dark.gray[500]};
    --color-gray-400: ${palettes.dark.gray[400]};
    --color-gray-300: ${palettes.dark.gray[300]};
    --color-gray-200: ${palettes.dark.gray[200]};
    --color-gray-100: ${palettes.dark.gray[100]};

    color-scheme: dark;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  html {
    background: var(--color-bg);
    color: var(--color-text);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-family-base);
    font-size: var(--font-size-paragraph);
    line-height: var(--line-height-paragraph);
  }

  ::selection {
    background: var(--color-primary-soft);
    color: var(--color-text);
  }

  hr {
    border: 0;
    border-top: 1px solid var(--color-border);
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
