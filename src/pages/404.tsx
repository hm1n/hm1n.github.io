import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Template from 'components/common/Template';
import { breakpoints } from '../styles/theme';

const MOBILE_MAX_WIDTH_PX = breakpoints.mobile - 1;

const PAGE_TITLE = '404 | hm1nlog';
const PAGE_DESCRIPTION = '페이지를 찾을 수 없습니다';

const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg);
  padding: 240px 0 0;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    padding: 240px 0 0;
  }
`;

const Container = styled.section`
  width: 100%;
  max-width: 788px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

const Code = styled.h1`
  margin: 0;
  font-size: 100px;
  line-height: 100px;
  font-weight: 700;
  color: var(--color-primary);
`;

const Title = styled.h2`
  margin: 24px 0 0;
  font-size: 32px;
  line-height: 38.4px;
  font-weight: 700;
  color: var(--color-text);

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 28.8px;
  font-weight: 400;
  color: var(--color-gray-300);
`;

const DescriptionLine = styled.span`
  display: block;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    font-size: 14px;
  }
`;

const BackHomeButton = styled(Link)`
  margin-top: 32px;
  height: 41px;
  padding: 12px 32px;
  border-radius: 8px;
  background: var(--color-primary);
  color: #1d1d1d;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.97);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
  }
`;

const ErrorCode = styled.p`
  margin: 48px 0 0;
  font-size: 12px;
  line-height: normal;
  font-weight: 500;
  color: var(--color-gray-200);
`;

const NotFoundPage: FunctionComponent = function () {
  return (
    <Template title={PAGE_TITLE} description={PAGE_DESCRIPTION} url="/404" image="">
      <Page>
        <Container>
          <Code>404</Code>
          <Title>페이지를 찾을 수 없습니다</Title>
          <Description>
            <DescriptionLine>
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </DescriptionLine>
            <DescriptionLine>URL을 다시 확인하거나 홈으로 돌아가주세요.</DescriptionLine>
          </Description>
          <BackHomeButton to="/">홈으로 돌아가기</BackHomeButton>
          <ErrorCode>Error Code: 404 - Page Not Found</ErrorCode>
        </Container>
      </Page>
    </Template>
  );
};

export default NotFoundPage;
