import { ListFilter } from 'lucide-react';
import { Art } from './components';
import { formatMoney } from './money.mjs';

export const transactions = [
  { id:'starbucks', name:'Starbucks', logo:'starbucks', date:'26 Sep', purchaseCents:2750, cashbackCents:550, category:'Food', points:55 },
  { id:'nike', name:'Nike', logo:'nike', date:'25 Sep', purchaseCents:3200, cashbackCents:480, category:'Shopping', points:48 },
  { id:'gap', name:'GAP', logo:'gap', date:'24 Sep', purchaseCents:3000, cashbackCents:300, category:'Shopping', points:30 },
  { id:'hm', name:'H&M', logo:'hm', date:'23 Sep', purchaseCents:10000, cashbackCents:800, category:'Shopping', points:80 },
  { id:'ikea', name:'IKEA', logo:'ikea', date:'22 Sep', purchaseCents:7000, cashbackCents:350, category:'Home', points:35 },
];
export function getTransaction(id: string) { return transactions.find(item => item.id === id) || transactions[0]; }
export function TransactionsSection({ onOpen }: { onOpen: (id: string) => void }) {
  return <section className="transactions"><div className="section-heading"><h2>Recent transactions</h2><button aria-label="Transaction filters, coming later" disabled><ListFilter size={21} /></button></div><div className="transaction-list">{transactions.map(item => <button className="transaction-row" key={item.id} onClick={() => onOpen(item.id)} aria-label={`View ${item.name} transaction`}><span className="merchant-placeholder"><Art name={`brand-${item.logo}`} alt={`${item.name} logo`} /></span><span className="transaction-copy"><strong>{item.name}</strong><span>{item.date} • Purchase {formatMoney(item.purchaseCents)}</span></span><strong>+{formatMoney(item.cashbackCents)}</strong></button>)}</div></section>;
}
