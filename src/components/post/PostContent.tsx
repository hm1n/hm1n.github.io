import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

interface PostContentProps {
  html: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

const MarkdownRenderer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0 0;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 400;
  line-height: 28.8px;
  word-break: keep-all;
  overflow-wrap: break-word;

  h1,
  h2,
  h3,
  h4,
  h5 {
    scroll-margin-top: 140px;
  }

  p {
    font-size: 16px;
    padding: 0;
    margin: 0 0 1.2em;
    line-height: 1.6;
    font-weight: 400;
  }

  p:last-child {
    margin-bottom: 0;
  }

  h1 {
    margin-top: 64px;
    margin-bottom: 16px;
    font-size: 28px;
    font-weight: 700;
    line-height: normal;
  }

  h2 {
    margin-top: 48px;
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
  }

  h3 {
    margin-top: 40px;
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
  }

  h4,
  h5 {
    margin-top: 32px;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    line-height: normal;
  }

  blockquote {
    margin: 24px 0;
    padding: 8px;
    border-left: 2px solid var(--color-primary);
    color: var(--color-text);
  }

  ol,
  ul {
    margin-left: 20px;
    padding: 16px 0;
  }

  hr {
    border: 0;
    border-top: 1px solid var(--color-border);
    margin: 40px 0;
  }

  a {
    color: var(--color-primary);
    text-decoration: underline;
  }

  img,
  .gatsby-resp-image-wrapper {
    max-width: 100%;
    border-radius: 8px;
    margin: 24px 0;
  }

  .gatsby-resp-image-wrapper {
    margin-left: 0 !important;
    margin-right: 0 !important;
    overflow: hidden;
  }

  .gatsby-resp-image-link {
    display: block;
  }

  .gatsby-resp-image-image {
    border-radius: 8px;
  }

  pre.code-block {
    margin: 0 0 1.2em 0;
    padding: 16px;
    font-size: 13px;
    overflow-x: auto;
    border-radius: 8px;
  }

  pre.code-block > code.hljs {
    padding: 15px;
    overflow-x: visible;
    font-size: inherit;
    line-height: 1.6;
  }

  code.hljs,
  code[class*='language-'],
  pre.code-block {
    background: var(--color-background-elevated);
    font-family: var(--font-family-code);
    tab-size: 2;
  }
  code {
    background: var(--color-background-elevated);
    padding: 4px 4px;
    border-radius: 4px;
    font-size: 13px;
    font-family: var(--font-family-code);
  }
`;

const PostContent: FunctionComponent<PostContentProps> = function ({ html, contentRef }) {
  return <MarkdownRenderer ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PostContent;
