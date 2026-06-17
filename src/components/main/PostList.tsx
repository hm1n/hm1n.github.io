import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import PostItem from './PostItem';
import { PostListItemType } from '../../types/PostItem.types';
import useInfiniteScroll, { useInfiniteScrollType } from 'hooks/useInfinityScroll';
import { breakpoints } from '../../styles/theme';

export type PostType = {
  node: {
    id: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      categories: string[];
      thumbnail: {
        publicURL: string;
      };
    };
  };
};

type PostListProps = {
  selectedCategory: string;
  posts: PostListItemType[];
};

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 876px;
  min-height: 100svh;
  gap: 64px;

  @media (min-width: 840px) {
    margin: 0 auto;
    padding: 24px 0;
  }

  @media (min-width: ${breakpoints.mobile}px) and (max-width: 1096px) {
    width: 100%;
    padding: 24px clamp(20px, 10vw, 130px) 0 clamp(20px, 10vw, 130px);
  }

  @media (max-width: ${breakpoints.mobile - 1}px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 24px;
  }
`;

const PostList: FunctionComponent<PostListProps> = function ({ selectedCategory, posts }) {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  );

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  );
};

export default PostList;
