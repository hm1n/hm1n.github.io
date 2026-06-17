import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { breakpoints } from '../../styles/theme';

const MOBILE_MAX_WIDTH_PX = breakpoints.mobile - 1;

export type PostNavigationItem = {
  id: string;
  text: string;
  depth: number;
};

type PostNavigationProps = {
  items: PostNavigationItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

const Wrapper = styled.aside`
  height: fit-content;

  @media (min-width: ${breakpoints.mobile}px) {
    width: 203px;
    position: sticky;
    top: 100px;
    margin-top: 80px;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    width: 100%;
    margin-top: 40px;
  }
`;

const ScrollArea = styled.div`
  @media (min-width: ${breakpoints.mobile}px) {
    max-height: calc(100vh - var(--post-nav-sticky-top, 154px) - 20px);
    overflow: auto;
  }
`;

const List = styled.ul`
  list-style: none;
  border-left: 2px solid var(--color-primary);
  padding: 4px 0 4px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemRow = styled.li<{ active?: boolean; depth?: number }>`
  font-size: 16px;
  line-height: 25.6px;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-gray-200)')};
  cursor: pointer;
  white-space: pre-wrap;
  padding-left: ${({ depth }) => (depth ? Math.max(0, (depth - 1) * 8) : 0)}px;

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const PostNavigation: FunctionComponent<PostNavigationProps> = function ({
  items,
  activeId,
  onSelect,
}) {
  if (items.length === 0) return null;

  return (
    <Wrapper aria-label="목차">
      <ScrollArea>
        <List>
          {items.map(item => (
            <ItemRow
              key={item.id}
              active={activeId === item.id}
              depth={item.depth}
              role="link"
              tabIndex={0}
              onClick={() => onSelect(item.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(item.id);
              }}
            >
              {item.text}
            </ItemRow>
          ))}
        </List>
      </ScrollArea>
    </Wrapper>
  );
};

export default PostNavigation;
