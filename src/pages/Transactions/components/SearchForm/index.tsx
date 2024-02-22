import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import { zodResolver } from '@hookform/resolvers/zod';

import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import {
  SearchFormValues,
  searchFormSchema
} from '../../../../helpers/SearchForm';

import { SearchFormContainer } from './styles';

export function SearchForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, context => {
    return context.fetchTransactions;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema)
  });

  async function handleSearchTransactions(data: SearchFormValues) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
