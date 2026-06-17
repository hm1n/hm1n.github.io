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
    padding: 0;
    margin: 0;
  }

  h1 {
    margin-top: 64px;
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
  }

  h2 {
    margin-top: 48px;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
  }

  h3 {
    margin-top: 40px;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
  }

  h4,
  h5 {
    margin-top: 32px;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
  }

  blockquote {
    margin: 24px 0;
    padding: 8px 16px;
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

  pre[class*='language-'] {
    margin: 30px 0;
    padding: 15px;
    font-size: 15px;
    overflow-x: auto;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
  }
`;

const PostContent: FunctionComponent<PostContentProps> = function ({ html, contentRef }) {
  return <MarkdownRenderer ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PostContent;
