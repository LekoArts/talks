import styled from 'styled-components'

const Tagline = styled.p`
  color: var(--text-light);
  font-weight: 600;
  font-size: 4rem;
  text-align: center;
  a {
    color: var(--text-light);
    text-decoration: none;
    &:hover {
      color: var(--gatsby);
    }
  }
`

export default Tagline
