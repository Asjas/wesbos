import { styled } from '@/styled-system/jsx';

const LayoutStyles = styled.div`
  min-height: calc(100vh - 40px);
  &:has(.welcome) {
    background: url('../../public/images/handsome.jpg') no-repeat top center;
    @media (max-width: 650px) {
      background-position: top left -400px;
      h2 {
        font-size: 3rem;
      }
    }
    a {
      text-decoration-color: var(--yellow);
    }
  }
  p {
    word-wrap: anywhere;
  }
`;

export default LayoutStyles;
