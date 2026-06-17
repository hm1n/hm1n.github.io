import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { breakpoints } from '../../styles/theme';

const MOBILE_MAX_WIDTH_PX = breakpoints.mobile - 1;
const RIGHT_IMAGE_URL = 'https://avatars.githubusercontent.com/u/44727850?v=4';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 120px;
  background: var(--color-bg);
  overflow: hidden;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    height: 80px;
  }
`;

const FooterInner = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 clamp(20px, 10vw, 130px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    padding: 0 20px;
  }
`;

const CopyText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: normal;
  font-weight: 400;
  color: var(--color-gray-300);
`;

const CopyDesktop = styled.span`
  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    display: none;
  }
`;

const CopyMobile = styled.span`
  display: none;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    display: inline;
  }
`;

const RightImage = styled.img`
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 999px;
  background: var(--color-gray-100);
  cursor: pointer;
  display: block;
  object-fit: cover;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: var(--color-gray-200);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const Footer: FunctionComponent = function () {
  const handleScrollTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterWrapper>
      <FooterInner>
        <CopyText>
          <CopyDesktop>© 2026 hm1n, Powered By Gatsby.</CopyDesktop>
          <CopyMobile>
            © 2026 hm1n,
            <br />
            Powered By Gatsby.
          </CopyMobile>
        </CopyText>

        <RightImage
          src={RIGHT_IMAGE_URL}
          alt="맨 위로 이동"
          role="button"
          tabIndex={0}
          onClick={handleScrollTop}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') handleScrollTop();
          }}
        />
      </FooterInner>
    </FooterWrapper>
  );
};

export default Footer;
