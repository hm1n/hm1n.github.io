import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../../styles/theme';

export type CategoryListProps = {
  selectedCategory: string;
  categoryList: {
    [key: string]: number;
  };
};

type CategoryItemProps = {
  active: boolean;
};

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps;

const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? '800' : '500')};
  color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-gray-200)')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  :hover {
    color: var(--color-primary);
  }
`;

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 876px;

  @media (min-width: 840px) {
    margin: 0 auto;
    margin-top: 120px;
  }

  @media (min-width: ${breakpoints.mobile}px) and (max-width: 1096px) {
    width: 100%;
    margin-left: clamp(0px, 10vw, 130px);
    margin-top: 120px;
  }

  @media (max-width: ${breakpoints.mobile - 1}px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 32px 24px 0;
    margin-top: 96px;
  }
`;

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name]) => (
        <CategoryItem
          to={`/?category=${encodeURIComponent(name)}`}
          active={name === selectedCategory}
          key={name}
        >
          {name}
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
