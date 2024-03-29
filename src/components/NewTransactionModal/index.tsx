import { Dispatch, SetStateAction } from 'react';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as Dialog from '@radix-ui/react-dialog';
import { zodResolver } from '@hookform/resolvers/zod';

import { TransactionsContext } from '../../contexts/TransactionsContext';
import {
  NewTransactionFormValues,
  newTransactionFormSchema
} from '../../helpers/NewTransactionForm';

import {
  Content,
  Description,
  Overlay,
  TopCloseButton,
  TransactionType,
  TransactionTypeButton
} from './styles';

type NewTransactionModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function NewTransactionModal({ setOpen }: NewTransactionModalProps) {
  const createTransactions = useContextSelector(
    TransactionsContext,
    context => {
      return context.createTransactions;
    }
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<NewTransactionFormValues>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  });

  async function handleCreateNewTransaction(data: NewTransactionFormValues) {
    const { description, price, category, type } = data;

    await createTransactions({
      description,
      price,
      category,
      type
    });

    setOpen(false);
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <Description>Insira suas entradas ou saídas</Description>

        <TopCloseButton>
          <X size={24} />
        </TopCloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saídas
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
