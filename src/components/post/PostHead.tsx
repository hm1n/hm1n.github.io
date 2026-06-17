import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import PostHeadInfo from 'components/post/PostHeadInfo';

type PostHeadProps = {
  title: string;
  date: string;
  categories: string[];
  summary?: string;
  thumbnail: IGatsbyImageData;
};

const PostHeadWrapper = styled.header`
  width: 100%;
  padding-top: 0;
`;

const PostHead: FunctionComponent<PostHeadProps> = function ({ title, date, categories, summary }) {
  return (
    <PostHeadWrapper>
      <PostHeadInfo title={title} date={date} categories={categories} summary={summary} />
    </PostHeadWrapper>
  );
};

export default PostHead;
