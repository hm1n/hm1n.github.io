import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

export type PostHeadInfoProps = {
  title: string;
  date: string;
  categories: string[];
  summary?: string;
};

const Wrapper = styled.div`
  width: 100%;
`;

const DateText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: var(--color-gray-200);
  text-align: left;
`;

const Title = styled.h1`
  margin-top: 4px;
  font-size: 24px;
  font-weight: 700;
  line-height: 38.4px;
  color: var(--color-text);
`;

const Summary = styled.p`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  color: var(--color-gray-300);
  white-space: pre-wrap;
`;

const CategoryRow = styled.ul`
  margin-top: 10px;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
`;

const CategoryItem = styled.li`
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  color: var(--color-primary);
`;

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
  summary,
}) {
  return (
    <Wrapper>
      <DateText>{date}</DateText>
      <Title>{title}</Title>
      {summary ? <Summary>{summary}</Summary> : null}
      <CategoryRow aria-label="카테고리">
        {categories.map(category => (
          <CategoryItem key={category}>{category}</CategoryItem>
        ))}
      </CategoryRow>
    </Wrapper>
  );
};

export default PostHeadInfo;
