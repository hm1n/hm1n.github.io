import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { PostFrontmatterType } from 'types/PostItem.types';
import { breakpoints } from '../../styles/theme';

type PostItemProps = PostFrontmatterType & { link: string };

const PostItemContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
`;

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }

  @media (max-width: ${breakpoints.mobile - 1}px) {
    flex-direction: column;
    gap: 32px;
    height: auto;
  }
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 240px;
  border-radius: 8px;
  background: var(--color-gray-100);
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile - 1}px) {
    width: 100%;
  }
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 24px;
  font-weight: 700;
  line-height: 38.4px;
  color: var(--color-gray-500);
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: var(--color-gray-200);
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  color: var(--color-primary);

  flex-wrap: nowrap;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile - 1}px) {
    flex-wrap: wrap;
    overflow: visible;
  }
`;

const CategoryItem = styled.div`
  white-space: nowrap;
`;

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 18px;
  word-break: keep-all;
  font-weight: 500;
  line-height: 28.8px;
  color: var(--color-gray-300);

  @media (max-width: ${breakpoints.mobile - 1}px) {
    -webkit-line-clamp: 2;
  }
`;

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <ThumbnailImage image={gatsbyImageData} alt={title} />

      <PostItemContent>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
        <Category>
          {categories.map(item => (
            <CategoryItem key={item}>{item}</CategoryItem>
          ))}
        </Category>
      </PostItemContent>
    </PostItemWrapper>
  );
};

export default PostItem;
