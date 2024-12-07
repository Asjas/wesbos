import { styled } from '@/styled-system/jsx';

export const TOC = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 2rem;
  background: green;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    a {
      &:before {
        display: none;
      }
    }
  }
`;
