import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';
import { palettes, typography } from '../../styles/theme';

const defaultStyle = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

  :root {
    /* Typography */
    --font-family-base: ${typography.fontFamily.base};
    --font-family-code: ${typography.fontFamily.code};
    --font-size-paragraph: ${typography.paragraph.fontSize};
    --line-height-paragraph: ${typography.paragraph.lineHeight};

    /* Light mode (default) */
    --color-primary: ${palettes.light.primary.default};
    --color-primary-soft: ${palettes.light.primary.light};

    --color-bg: ${palettes.light.background.background};
    --color-background-elevated: ${palettes.light.background.elevated};
    --color-bg-blur: rgba(250, 250, 250, 0.4);
    --color-text: ${palettes.light.gray[500]};
    --color-text-secondary: ${palettes.light.gray[300]};
    --color-border: ${palettes.light.gray[100]};

    --color-gray-500: ${palettes.light.gray[500]};
    --color-gray-400: ${palettes.light.gray[400]};
    --color-gray-300: ${palettes.light.gray[300]};
    --color-gray-200: ${palettes.light.gray[200]};
    --color-gray-100: ${palettes.light.gray[100]};

    --hljs-bg: var(--color-background-elevated);
    --hljs-text: #24292f;
    --hljs-keyword: #cf222e;
    --hljs-title: #8250df;
    --hljs-attr: #0550ae;
    --hljs-string: #0a3069;
    --hljs-built-in: #953800;
    --hljs-comment: #6e7781;
    --hljs-name: #116329;
    --hljs-section: #0550ae;
    --hljs-bullet: #3b2300;
    --hljs-addition-bg: #dafbe1;
    --hljs-addition-text: #116329;
    --hljs-deletion-bg: #ffebe9;
    --hljs-deletion-text: #82071e;

    color-scheme: light;
  }

  /* System dark mode (if user didn't explicitly force light) */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
      --color-primary: ${palettes.dark.primary.default};
      --color-primary-soft: ${palettes.dark.primary.light};

      --color-bg: ${palettes.dark.background.background};
      --color-background-elevated: ${palettes.dark.background.elevated};
      --color-bg-blur: rgba(29, 29, 29, 0.4);
      --color-text: ${palettes.dark.gray[500]};
      --color-text-secondary: ${palettes.dark.gray[300]};
      --color-border: ${palettes.dark.gray[100]};

      --color-gray-500: ${palettes.dark.gray[500]};
      --color-gray-400: ${palettes.dark.gray[400]};
      --color-gray-300: ${palettes.dark.gray[300]};
      --color-gray-200: ${palettes.dark.gray[200]};
      --color-gray-100: ${palettes.dark.gray[100]};

      --hljs-bg: var(--color-background-elevated);
      --hljs-text: #c9d1d9;
      --hljs-keyword: #ff7b72;
      --hljs-title: #d2a8ff;
      --hljs-attr: #79c0ff;
      --hljs-string: #a5d6ff;
      --hljs-built-in: #ffa657;
      --hljs-comment: #8b949e;
      --hljs-name: #7ee787;
      --hljs-section: #1f6feb;
      --hljs-bullet: #f2cc60;
      --hljs-addition-bg: #033a16;
      --hljs-addition-text: #aff5b4;
      --hljs-deletion-bg: #67060c;
      --hljs-deletion-text: #ffdcd7;

      color-scheme: dark;
    }
  }

  /* Explicit dark mode */
  :root[data-theme='dark'] {
    --color-primary: ${palettes.dark.primary.default};
    --color-primary-soft: ${palettes.dark.primary.light};

    --color-bg: ${palettes.dark.background.background};
    --color-background-elevated: ${palettes.dark.background.elevated};
    --color-bg-blur: rgba(29, 29, 29, 0.4);
    --color-text: ${palettes.dark.gray[500]};
    --color-text-secondary: ${palettes.dark.gray[300]};
    --color-border: ${palettes.dark.gray[100]};

    --color-gray-500: ${palettes.dark.gray[500]};
    --color-gray-400: ${palettes.dark.gray[400]};
    --color-gray-300: ${palettes.dark.gray[300]};
    --color-gray-200: ${palettes.dark.gray[200]};
    --color-gray-100: ${palettes.dark.gray[100]};

    --hljs-bg: var(--color-background-elevated);
    --hljs-text: #c9d1d9;
    --hljs-keyword: #ff7b72;
    --hljs-title: #d2a8ff;
    --hljs-attr: #79c0ff;
    --hljs-string: #a5d6ff;
    --hljs-built-in: #ffa657;
    --hljs-comment: #8b949e;
    --hljs-name: #7ee787;
    --hljs-section: #1f6feb;
    --hljs-bullet: #f2cc60;
    --hljs-addition-bg: #033a16;
    --hljs-addition-text: #aff5b4;
    --hljs-deletion-bg: #67060c;
    --hljs-deletion-text: #ffdcd7;

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

  .hljs {
    display: block;
    overflow-x: auto;
    background: var(--hljs-bg);
    color: var(--hljs-text);
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable.language_ {
    color: var(--hljs-keyword);
  }

  .hljs-title,
  .hljs-title.class_,
  .hljs-title.class_.inherited__,
  .hljs-title.function_ {
    color: var(--hljs-title);
  }

  .hljs-attr,
  .hljs-attribute,
  .hljs-literal,
  .hljs-meta,
  .hljs-number,
  .hljs-operator,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-variable {
    color: var(--hljs-attr);
  }

  .hljs-meta .hljs-string,
  .hljs-regexp,
  .hljs-string {
    color: var(--hljs-string);
  }

  .hljs-built_in,
  .hljs-symbol {
    color: var(--hljs-built-in);
  }

  .hljs-code,
  .hljs-comment,
  .hljs-formula {
    color: var(--hljs-comment);
  }

  .hljs-name,
  .hljs-quote,
  .hljs-selector-pseudo,
  .hljs-selector-tag {
    color: var(--hljs-name);
  }

  .hljs-subst {
    color: var(--hljs-text);
  }

  .hljs-section {
    color: var(--hljs-section);
    font-weight: 700;
  }

  .hljs-bullet {
    color: var(--hljs-bullet);
  }

  .hljs-emphasis {
    color: var(--hljs-text);
    font-style: italic;
  }

  .hljs-strong {
    color: var(--hljs-text);
    font-weight: 700;
  }

  .hljs-addition {
    background-color: var(--hljs-addition-bg);
    color: var(--hljs-addition-text);
  }

  .hljs-deletion {
    background-color: var(--hljs-deletion-bg);
    color: var(--hljs-deletion-text);
  }
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
