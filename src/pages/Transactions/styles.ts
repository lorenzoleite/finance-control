import styled from 'styled-components';

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border-radius: 6px;
  padding: 0.2rem;
  line-height: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    transition: opacity 0.2s;
  }
`;

interface PriceHighLightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${props =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`;
