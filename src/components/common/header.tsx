import React from 'react'
import styled from '@emotion/styled';

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 120px;
`;

const HeaderLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
`
const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: '#'
`

const header = () => {
  return (
    <HeaderStyled>
      <HeaderLeftWrapper>
        <div>hm1nlog</div>
        <div>tabs</div>
      </HeaderLeftWrapper>
      <div>right-buttons</div>
    </HeaderStyled>
  )
}

export default header