'use client';

import { styled } from '@/styled-system/jsx';

export const ContentStyles = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  &.wiiiiiiiiiide,
  &:has(> .wiiiiiiiiiide) {
    max-width: 1000px;
  }
  &.ultra-wide,
  &:has(> .ultra-wide) {
    max-width: 1400px;
  }
`;
