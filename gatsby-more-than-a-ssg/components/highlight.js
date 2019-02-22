import React from 'react'
import styled from 'styled-components'

const Wrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gatsby);
  color: var(--white);
  h1, h2, h3, h4, h5, h6 {
    color: var(--white);
    padding-left: 128px;
    padding-right: 128px;
    @media screen and (max-width: 40em) {
      padding-left: 64px;
      padding-right: 64px;
    }
  }
`

const Highlight = ({ children }) => (
  <Wrapper>{children}</Wrapper>
)

export default Highlight
