import { useContextSelector } from 'use-context-selector';
import { Trash } from 'phosphor-react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { SearchForm } from './components/SearchForm';

import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
  DeleteButton
} from './styles';

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, context => {
    return context.transactions;
  });

  const deleteTransaction = useContextSelector(TransactionsContext, context => {
    return context.deleteTransaction;
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="45%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '-'}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    <DeleteButton
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash size={16} color="#7C7C8A" />
                    </DeleteButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
