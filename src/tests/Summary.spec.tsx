//vitest por si só não é possível testar na DOM
//testes unitários no react por meio da DOM é com testing-library-react
//elementos HTML -> jest-dom
//pra simular o HTML sem um browser, precisa simular. jsdom ou happy-dom
import { render } from '@testing-library/react';
import { Summary } from '../components/Summary';
import { TransactionsProvider } from '../contexts/TransactionsContext';

describe('Summary', () => {
  it('should display the sum between inputs and outputs', () => {
    const wrapper = render(<Summary />, {
      wrapper: ({ children }) => {
        return <TransactionsProvider>{children}</TransactionsProvider>;
      }
    });

    const entradasText = wrapper.getByText('Entradas');

    expect(entradasText).toBeInTheDocument();
  });
});
