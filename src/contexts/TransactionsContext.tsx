import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { Transaction } from '../interfaces/Transaction';
import { api } from '../lib/axios';

type CreateTransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransactions: (data: CreateTransactionInput) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc'
      }
    });

    setTransactions(response.data);
  }, []);

  const createTransactions = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;

      const response = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date()
      });

      setTransactions(state => [...state, response.data]);
    },
    []
  );

  const deleteTransaction = useCallback(
    async (id: number) => {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    },
    [fetchTransactions]
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransactions,
        deleteTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
