import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

import { NewTransactionModal } from '../NewTransactionModal';

import logoImg from '../../assets/logo.svg';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal setOpen={setOpen} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
