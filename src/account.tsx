import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import { accountReducer, initialAccount, validateAccount } from './money.mjs';

export type Receipt = { id: string; amountCents: number; recipientId: string; billId: string; createdAt: string };
export type Account = { balanceCents: number; redeemedCents: number; receipts: Receipt[] };
export type TransferAction = Receipt & { type: 'transfer' };
const AccountContext = createContext<{ account: Account; dispatch: Dispatch<TransferAction> }>({ account: initialAccount, dispatch: () => {} });
function loadAccount(): Account {
  try { const saved = sessionStorage.getItem('treatz-cashback-v2'); return saved ? validateAccount(JSON.parse(saved)) : initialAccount; }
  catch { return initialAccount; }
}
export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, dispatch] = useReducer((state: Account, action: TransferAction) => accountReducer(state, action) as Account, undefined, loadAccount);
  useEffect(() => { try { sessionStorage.setItem('treatz-cashback-v2', JSON.stringify(account)); } catch { /* The prototype still works when storage is unavailable. */ } }, [account]);
  return <AccountContext value={{ account, dispatch }}>{children}</AccountContext>;
}
export function useAccount() { return useContext(AccountContext); }
