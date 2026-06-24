import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../../styles/theme';
import { Icon } from './icons';

const MOBILE_MAX_WIDTH_PX = breakpoints.mobile - 1;
const BRAND_MARK_IMAGE_URL = 'https://avatars.githubusercontent.com/u/44727850?v=4';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  background: var(--color-bg-blur);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 100;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    height: 100px;
  }
`;

const HeaderInner = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 clamp(20px, 10vw, 130px) 0 clamp(20px, 10vw, 130px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    max-width: 100%;
    padding: 12px 24px;

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'brand actions'
      'menu menu';
    row-gap: 4px;
    align-items: center;
    justify-content: stretch;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 96px;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    display: contents;
  }
`;

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text);

  font-size: 24px;
  font-weight: 700;
  line-height: normal;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    grid-area: brand;
  }
`;

const BrandMark = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex: none;
  display: block;
  object-fit: cover;
  background: var(--color-gray-100);
`;

const MenuNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  font-size: 20px;
  line-height: normal;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    font-size: 18px;
    line-height: 20px;
  }
`;

const MenuAnchor = styled.a<{ active?: boolean }>`
  font-weight: ${({ active }) => (active ? 700 : 500)};
  color: ${({ active }) => (active ? 'var(--color-gray-400)' : 'var(--color-gray-200)')};
`;

const MenuLink = styled(Link)<{ active?: boolean }>`
  font-weight: ${({ active }) => (active ? 700 : 500)};
  color: ${({ active }) => (active ? 'var(--color-gray-400)' : 'var(--color-gray-200)')};
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    gap: 0;
    grid-area: actions;
    justify-self: end;
  }
`;

const IconButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-gray-400);
  display: grid;
  place-items: center;
  cursor: pointer;
`;

// const SearchButton = styled(IconButton)`
//   @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
//     display: none;
//   }
// `;

function getCurrentThemeMode(): 'light' | 'dark' {
  if (typeof document !== 'undefined') {
    const explicit = document.documentElement.dataset.theme;
    if (explicit === 'dark' || explicit === 'light') return explicit;
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

const Header: FunctionComponent = function () {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMode(getCurrentThemeMode());
  }, []);

  const nextMode = useMemo(() => (mode === 'dark' ? 'light' : 'dark'), [mode]);

  const handleToggleTheme = () => {
    const next = nextMode;
    document.documentElement.dataset.theme = next;
    setMode(next);
  };

  return (
    <HeaderWrapper>
      <HeaderInner>
        <LeftGroup>
          <BrandLink to="/" aria-label="hm1nlog 홈으로 이동">
            hm1nlog
            <BrandMark src={BRAND_MARK_IMAGE_URL} alt="" aria-hidden="true" />
          </BrandLink>

          <MenuNav aria-label="헤더 메뉴">
            <MenuLink to="/" active>
              tech
            </MenuLink>
            <MenuAnchor
              href="https://shinhm1.notion.site/FrontEnd-Developer-387e7e8fdd12803bb64ef0f3f26efacf?pvs=74"
              target="_blank"
              rel="noreferrer"
              active={false}
            >
              resume
            </MenuAnchor>
            <MenuAnchor href="https://github.com/" target="_blank" rel="noreferrer" active={false}>
              github
            </MenuAnchor>
          </MenuNav>
        </LeftGroup>

        <RightGroup>
          <IconButton
            type="button"
            onClick={handleToggleTheme}
            aria-label={nextMode === 'dark' ? '다크 모드로 전환' : '라이트 모드로 전환'}
            aria-pressed={mode === 'dark'}
          >
            <Icon type={nextMode === 'dark' ? 'moon' : 'sun'} />
          </IconButton>

          {/* <SearchButton type="button" aria-label="검색">
            <Icon type="search" />
          </SearchButton> */}
        </RightGroup>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;
